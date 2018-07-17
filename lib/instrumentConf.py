import sys, os, subprocess
from pymongo import MongoClient
from bson.objectid import ObjectId

'''
I actually don't think it's useful to subclass here when all it's doing
is calling the super with a specific set of configurations. Easier
to scale later/ port to Keck 2 if we just have configuration objects
'''


# configuration class
class instrumentDB(object):

    # elements: keypairs, database: Mongo object
    def __init__(self, elements, database, outdir):
        # format is : instrument script/keyword, database keyword, True if mandatory, False if optional
        self.elements = elements
        self.db = database
        self.outdir = os.getcwd() + '/' + outdir


    def get(self, configurationId):
        self.configuration = self.db.Configurations.find_one({'_id':ObjectId(configurationId)})

        configurationDetail={}
        for key in self.elements.keys():
            kcwi_keyword = self.elements[key][0]
            mongo_keyword = self.elements[key][1]
            required = self.elements[key][2]
            if required:
                try:
                    configurationDetail[mongo_keyword] = self.configuration[mongo_keyword]
                except Exception as e:
                    raise KeyError("Missing keyword %s" % (e))

            else:
                try:
                    configurationDetail[mongo_keyword] = self.configuration[mongo_keyword]
                except:
                    configurationDetail[mongo_keyword]=""
        configurationDetail['id']=str(self.configuration['_id'])
        return configurationDetail


    def put(self, data):
        new_config = {}
        for key in self.elements.keys():
            kcwi_keyword = self.elements[key][0]
            mongo_keyword = self.elements[key][1]
            required = self.elements[key][2]
            if required:
                try:
                    new_config[mongo_keyword] = data[mongo_keyword]
                except Exception as e:
                    raise KeyError("Missing keyword %s" % (e))
            else:
                try:
                    new_config[mongo_keyword] = data[mongo_keyword]
                except:
                    pass

        if self.is_name_unique(new_config['statenam'], new_config['progname']) is False:
            new_config['statenam']=new_config['statenam']+"_DUPLICATE"
        self.db.Configurations.insert_one(new_config)


    def is_name_unique(self,name,program):
        configurations = self.get_all_configs(program)
        names = [x['statenam'] for x in configurations]
        if name in names:
            sys.stdout.write("A configuration with this name already exists \n")
            return False
        else:
            return True


    def put_from_file(self, data, program,filename):
        print("Running put from file\n")
        new_config = {}
        #if not 'progname' in data:  ### commenting out this line means that the program loaded from a file goes into the current program id
        data['progname'] = program
        if not 'statenam' in data:
            data['statenam'] = filename
        for key in self.elements.keys():
            kcwi_keyword = self.elements[key][0]
            mongo_keyword = self.elements[key][1]
            required = self.elements[key][2]
            if required:
                try:
                    if 'wave' in mongo_keyword:
                        data[kcwi_keyword] = "%.1f" % float(data[kcwi_keyword])
                    new_config[mongo_keyword] = data[kcwi_keyword]
                except Exception as e:
                    print("Missing keyword %s\n" % (kcwi_keyword))
                    raise KeyError("Missing keyword %s" % (e))
            else:
                try:
                    new_config[mongo_keyword] = data[kcwi_keyword]
                except:
                    pass

        print(new_config)
        self.db.Configurations.insert_one(new_config)


    def update(self, configurationId, data):
        new_config = {}
        for key in self.elements.keys():
            kcwi_keyword = self.elements[key][0]
            mongo_keyword = self.elements[key][1]
            required = self.elements[key][2]
            if required:
                try:
                    new_config[mongo_keyword] = data[mongo_keyword]
                except Exception as e:
                    raise KeyError("Missing keyword %s" % (e))
            else:
                try:
                    new_config[mongo_keyword] = data[mongo_keyword]
                except:
                    pass

        self.db.Configurations.update_one({'_id':ObjectId(configurationId)},{'$set':new_config})

    # TODO maybe don't actually delete but only hide so as to be recoverable?
    def delete(self, configurationId):
        self.db.Configurations.remove({'_id':ObjectId(configurationId)})


    def get_all_configs(self, program=None):
        # return an empty array if there is no program selected
        if program is None or program=="":
            return []
        sys.stdout.write( "Looking for configurations for program %s\n" % (program))
        # query the database for configurations
        configurations = self.db.Configurations.find({'progname':program})
        # empty array. It's going to be the return of the function
        configurationList = []
        # iterate on the cursor retrieved as a result of the query
        for configuration in configurations:
            # a configuration container
            confItem={}
            # iterate on the keys
            for key in self.elements.keys():
                kcwi_keyword = self.elements[key][0]
                mongo_keyword = self.elements[key][1]
                required = self.elements[key][2]
                #if required:
                #    confItem[mongo_keyword] = configuration[mongo_keyword]
                #else:
                try:
                    confItem[mongo_keyword] = configuration[mongo_keyword]
                except:
                    confItem[mongo_keyword]=""
            # always add the database id
            confItem['id']=str(configuration['_id'])
            #sys.stdout.write( str(configuration) +"\n")
            # add the item to the list
            configurationList.append(confItem)

        return configurationList


    def save_state(self, configurationId):
        configurationDetails = self.get(configurationId)
        #sys.stdout.write( str(configurationDetails) + "\n")
        #id = str(self.configuration['_id'].generation_time).replace(" ","-")
        id = str(self.configuration['_id']).replace(" ","-")
        name = str(self.configuration['statenam']).replace(" ","-")
        program = str(self.configuration['progname']).replace(" ","-")
        sys.stdout.write( "Attemting to execute configuration %s\n" % (configurationId))
        sys.stdout.write( "Producing save_state file\n")
        outdir = self.get_outdir()
        self.outfile = outdir+"/"+program+"___"+name+".state"
        stateFile = open(self.outfile, 'w')

        for key in self.elements.keys():
            inst_keyword = self.elements[key][0]
            mongo_keyword = self.elements[key][1]
            try:
                value = configurationDetails[mongo_keyword]
                if value !="":
                    sys.stdout.write( "%s = %s\n" % (inst_keyword, value))
                    stateFile.write( "%s = %s\n" % (inst_keyword, value))
            except:
                pass
        stateFile.write( "%s = %s\n" % ("stateid",str(id)))
        stateFile.close()


    def execute(self, configurationId):
        self.save_state(configurationId)
        command = 'restore_state '+self.outfile
        stdoutdata = subprocess.getoutput(command)
        #print(stdoutdata)


    def get_outdir(self):
        # command = 'show -s kbds -terse outdir'
        # stdoutdata = subprocess.getoutput(command)
        # return stdoutdata.split()[0]
        return self.outdir
