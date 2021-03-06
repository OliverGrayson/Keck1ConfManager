var debug = true;

var keck1Config = angular.module('keck1Config', ['ngCookies'])
.controller('HomeCtrl', ['$scope', '$http', '$cookies', function($scope, $http, $cookies) {

    // initial settings
    $scope.instruments = INSTRUMENT_CONFIGURATIONS;
    $scope.current = {"name":"Instrument","progname":"Program"};

    if (debug) {
        console.log('debug mode')
    }

    /*
    FUNCTIONS FOR STATE FILES
    general $scope methods will modify attributes of $scope.current
    */

    // GET initial configuration list
    $scope.showList = function(){
        // console.log($scope.current.progname, $scope.current.name);

        // only do stuff if instrument is set otherwise it just gets
        // really odd and nonsensical data
        if ($scope.current.name !== 'Instrument') {

            $http({
                method: 'POST',
                url: '/getConfigurationList',
                data: {
                    progname:$scope.current.progname,
                    instrument:$scope.current.name
                }
            }).then(function(response) {
                $scope.current.configurations = response.data;
                // console.log("res", response.data);
                // for (index in response.data) {
                //     $scope.current.configurations.push(response.data[index]);
                // }
                $scope.setInstVars();
                // console.log('mm',$scope.current.configurations);
                // console.log('0', $scope.current.configurations[0])
            }, function(error) {
                console.log(error);
            });
        }
    }

    // display content
    $scope.showContent = function($fileContent){
        $scope.current.content = $fileContent;
        // console.log($scope.current.content);
        // console.log("File content updated");
        $scope.fileAdded = false;
        $('#statefile').val(null); // clear file input so same file
                                   // can be reuploaded if something goes wrong
        $scope.showFilePopUp();
    }

    $scope.swapInstrument = function(name) {

        $scope.instruments = $scope.instruments || INSTRUMENT_CONFIGURATIONS;
        $scope.current = $scope.current || {"name":"Instrument","progname":"Program"};

        // console.log('swap')
        var prog = $scope.current.progname;
        $scope.current = $scope.instruments[name];

        console.log($scope.instruments, name)

        // this bit makes it so you can select either the program
        // or the instrument first and it doesn't make a difference
        $scope.current.progname = prog;

        if (prog !== 'Program'){
            $scope.showList();
        }
        // console.log("active instrument ", $scope.name, $scope.current);

        $scope.table_headings = [];

        // hide popups
        $('.popup').modal('hide');
    }

    // send the file to the backend to be uploaded to the database
    $scope.loadConfiguration = function(){
        $scope.current.info.progname = $scope.progname;
        $scope.current.fileName = document.getElementById("statefile").files[0].name;
        $http({
            method: 'POST',
            url:'/sendFile',
            data: {
                instrument:$scope.current.name,
                file:$scope.current.content,
                progname:$scope.current.info.progname,
                filename:$scope.current.fileName
            }
        }).then(function(response) {
            $scope.message="";
            $scope.current.content="";
            $scope.showList();
            //$('#addPopUp').modal('hide')
            $scope.current.info = {};
            $scope.message=response.data.message;
        }, function(error) {
            console.log(error);
        });
    }

    // triggers an action when the Enter key is pressed
    $scope.keyEnter = function(keyEvent) {
        if (keyEvent.which === 13) {
            $('#progPopUp').modal('hide')
            $scope.showList();
        }
    }

    // save all the state files
    $scope.saveAll = function(){
        $http({
            method: 'POST',
            url: '/saveAllConfigurations',
            data: {
                instrument:$scope.current.name,
                progname: $scope.current.info.progname
            }
        });
    }

    // add a new configuration
    $scope.addConfiguration = function(){

        $scope.current.info.progname = $scope.current.progname;

        if (!$scope.fileAdded) {$scope.fileAdded=true;}

        $http({
            method: 'POST',
            url:'/addConfiguration',
            data: {
                info:$scope.current.info,
                instrument:$scope.current.name
            }
        }).then(function(response) {
            $scope.message="";
            $scope.showList();
            $('#addPopUp').modal('hide')
            $scope.current.info = {}
        }, function(error) {
            console.log(error);
        });
    }
    // controls the "Add configuration" popup
    $scope.showAddPopUp = function(){
        $scope.showAdd = true;
        $scope.current.info = {};

        for (var entry in $scope.current.data.textEntryData) {
            $scope.current.info[entry]=$scope.current.data.textEntryData[entry].default;
        }

        $('#addPopUp').modal('show')
    }

    $scope.showFilePopUp = function(){
        $scope.showAdd = true;
        $scope.current.info = {};

        $scope.current.content.split('\n').forEach(function(entry) {
            mat = entry.match(/([\w_]+)\s*\=\s*([\w_,.]+)/);
            // console.log(mat);
            $scope.current.info[mat[1]]=mat[2];
        });

        if ($scope.current.progname !== $scope.current.info.progname){
            alert("Warning: state file uploaded for inactive program '" + $scope.current.info.progname + "'");
            // if ($scope.current.info.progname.toString() in $scope.allowedPrograms) {
            //     $scope.current.progname = $scope.current.info.progname;
            // }
            // else {
            //     // alert('nope')
            //     console.log($scope.current.info.progname, $scope.allowedPrograms)
            // }
        }
        else {
            $('#addPopUp').modal('show')
        }
    }

    // edit an existing configuration
    $scope.editConfiguration = function(id){
        $scope.current.info.id = id;
        $scope.showAdd = false;
        $http({
            method: 'POST',
            url: '/getConfiguration',
            data: {
                instrument:$scope.current.name,
                id:$scope.current.info.id
            }
        }).then(function(response) {
            $scope.message = "";
            console.log(response);
            $scope.current.info = response.data;
            $('#addPopUp').modal('show')
        }, function(error) {
            console.log(error);
        });
    }

    // duplicate an existing configuration
    $scope.duplicateConfiguration = function(id){
        $scope.current.info.id = id;
        $scope.showAdd = false;
        $http({
            method: 'POST',
            url: '/getConfiguration',
            data: {
                instrument:$scope.current.name,
                id:$scope.current.info.id
            }
        }).then(function(response) {
            $scope.message = "";
            console.log(response);
            $scope.current.info = response.data;
            $scope.addConfiguration()
        }, function(error) {
            console.log(error);
        });
    }

    // controls the "Select program" popup
    $scope.showProgPopUp = function(){
        $('#progPopUp').modal('show')
        $('#txtProgramCode').focus();
    }
    // controls the "additional options" values
    $scope.showOption = function(){
        $scope.showOptions=true
    }
    // controls the "execute" popup
    $scope.showRunPopUp = function(id){

        $scope.current.info.id = id;
        $scope.current.run = {};
        $http({
            method: 'POST',
            url: '/getConfiguration',
            data: {
                instrument:$scope.current.name,
                id:$scope.current.info.id
            }
        }).then(function(response) {
            $scope.message="";
            console.log(response);
            $scope.current.run = response.data;
            $scope.current.run.isRoot = false;
            $('#runPopUp').modal('show');
        }, function(error) {
            console.log(error);
        });
    }

    // delete an existing configuration
    $scope.deleteConfiguration = function(){
        $http({
            method: 'POST',
            url: '/deleteConfiguration',
            data: {
                instrument:$scope.current.name,
                id:$scope.current.deleteConfigurationId
            }
        }).then(function(response) {
            $scope.message="";
            console.log(response.data);
            $scope.current.deleteConfigurationId = '';
            $scope.showList();
            $('#deleteConfirm').modal('hide')
        }, function(error) {
            console.log(error);
        });
    }
    // controls the "confirm delete" popup
    $scope.confirmDelete = function(id){
        $scope.current.deleteConfigurationId = id;
        $('#deleteConfirm').modal('show');
    }

    $scope.doFileInput = function() {
        try {
            $('#statefile').click();
        }
        catch(e) {
            console.log(e);
        }
    }

    // save configuration
    $scope.saveConfiguration = function(id){
        $scope.current.info.id = id
        $http({
            method: 'POST',
            url: '/saveConfiguration',
            data: {
                instrument:$scope.current.name,
                id:$scope.current.info.id
            }
        }).then(function(response) {
            $scope.message="";
            console.log(response.data);
            $scope.current.saveConfigurationId = '';
            alert(response.data.message);
        }, function(error) {
            console.log(error);
        });
    }
    // execute configuration
    $scope.executeConfiguration = function(){
        $http({
            method: 'POST',
            url: '/executeConfiguration',
            data: {
                instrument:$scope.current.name,
                id:$scope.current.executeConfigurationId
            }
        }).then(function(response) {
            $scope.message="";
            console.log(response.data);
            $scope.current.executeConfigurationId = '';
            $('#executeConfirm').modal('hide')
            $scope.message=response.data.message
        }, function(error) {
            console.log(error);
        });
    }
    // controls the "confirm execution" popup
    $scope.confirmExecute = function(id,statenam){
        $scope.current.executeConfigurationId = id;
        $scope.current.executeConfigurationName = statenam;
        $('#executeConfirm').modal('show');
    }

    // post the updated configuration
    $scope.updateConfiguration = function(){
        // $scope.current.id = ins_id;
        // $scope.current.info.progname = $scope.current.progname;
        $('.popup').modal('hide');

        // console.log("updateConfiguration:", ins_id, $scope.current)
        console.log("updateConfiguration:", $scope.current.info.id, $scope.current)

        $http({
            method: 'POST',
            url: '/updateConfiguration',
            data: {
                instrument:$scope.current.name,
                info:$scope.current.info,
                id:$scope.current.info.id
            }
        }).then(function(response) {
            $scope.message="";
            console.log(response.data);
            $scope.showList();
        }, function(error) {
            console.log(error);
            alert("error adding configuration");
        });

    }


    /*
    instrument specific functions
    */

    // set default detector values
    $scope.instruments['KCWI'].DefaultDetector = function(){
        $scope.current.info.binningb="2,2";
        $scope.current.info.ccdmodeb=0;
        $scope.current.info.gainmulb=10;
        $scope.current.info.ampmodeb=9;
    }

    // set default cal unit values
    $scope.instruments['KCWI'].DefaultCalUnit = function(){
        $scope.current.info.cal_mirror="Sky";
        $scope.current.info.polarizer="Sky";
    }

    // edit an existing configuration (DETECTOR only)
    $scope.instruments['KCWI'].editDetector = function(id){
        $scope.current.info.id = id;
        $http({
            method: 'POST',
            url: '/getConfiguration',
            data: {
                instrument:$scope.current.name,
                id:$scope.current.info.id
            }
        }).then(function(response) {
            $scope.message="";
            console.log(response);
            $scope.current.info = response.data;
            $(".KCWI .detectorPopUp").modal('show');
        }, function(error) {
            console.log(error);
        });
    }
    // edit an existing configuration (CAL UNIT only)
    $scope.instruments['KCWI'].editCalunit = function(id){
        $scope.current.info.id = id;
        $http({
            method: 'POST',
            url: '/getConfiguration',
            data: {
                instrument:$scope.current.name,
                id:$scope.current.info.id
            }
        }).then(function(response) {
            $scope.message="";
            console.log(response);
            $scope.current.info = response.data;
            $(".KCWI .calUnitPopUp").modal('show');
        }, function(error) {
            console.log(error);
        });
    }

    $scope.setInstVars = function() {
        $scope.table_headings = [];
        for (var v in $scope.current.configurations[0]) {
            if ($scope.current.data.selectableData.hasOwnProperty(v)) {
                // console.log('selectable: ',$scope.current.data.selectableData[v])
                $scope.table_headings.push($scope.current.data.selectableData[v].title);
            }
            else if ($scope.current.data.textEntryData.hasOwnProperty(v)) {
                // console.log('text entry: ', $scope.current.data.textEntryData[v])
                $scope.table_headings.push($scope.current.data.textEntryData[v].title);
            }
            else {
                $scope.table_headings.push(v);
            }
        }
    }

    $scope.generateAllowedProgramList = function(keckID) {
        $scope.allowedPrograms = [];
        $scope.allowedInstruments = [];

        if (!debug){
            $http({
                method: 'POST',
                url: '/getAllowedPrograms',
                data: {
                    keck_id: keckID
                }
            })
            .then(function(response) {
                if ($.isEmptyObject(response.data)) {
                    alert("no allowed programs for this user")
                    return;
                }
                else {
                    response.data.forEach(function(program) {
                        $scope.allowedPrograms.push(program[0]);
                        $scope.allowedInstruments.push(program[1]);
                    })
                    console.log(response.data)
                }
            }, function(error) {
                console.log(error);
            });
        }
        else {
            $scope.allowedPrograms = ['U263', 'U202', 'E001', 'U199', '_test'];
            $scope.allowedInstruments = ['KCWI', 'HIRES', 'LRIS', 'MOSFIRE'];
        }
    }

    $scope.checkLogin = function() {
        // console.log(id_cookie)
        var id_cookie = $cookies.get('keckID');

        if (id_cookie == undefined && !debug) {
            $("#badLoginPopUp").modal('show');
        }
        else {
            $scope.generateAllowedProgramList(id_cookie);
        }
        // $http({
        //     method: 'POST',
        //     url: '/checkLogin',
        //     data: {
        //         keck_id: id_cookie
        //     }
        // }).then(function(response) {
        //     $scope.message="";
        //     var validity = response.data;
        //     console.log(validity)
        //     if (validity === "") {
        //         $("#badLoginPopUp").modal('show');
        //     }
        //     else {
        //         $scope.generateAllowedProgramList(id_cookie);
        //     }
        // }, function(error) {
        //     console.log(error);
        // });
    }

    $scope.init = function() {
        // validate cookie
        $scope.checkLogin();

        // $scope.showList();
    }

    // Calibrations
    // controls the "select calibrations" popup
    //$scope.runCalsPopup = function(){
    //    $('#runCalsPopup').modal('show')
    //}
    // calibrate
    //$scope.calibrate = function(){
    ///   $http({
    //  	method: 'POST',
    //  	url: '/calibrate',
    //  	data: {state_names:$scope.selected_configurations}
    //    }).then(function(response) {
    //  	$scope.selected_configurations = '';
    //  	$('#runCalsPopup').modal('hide')
    //    }, function(error) {
    //  	console.log(error);
    //    });
    //}

    // show the initial list
    $scope.init();

}])
.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function(onChangeEvent) {
                var reader = new FileReader();
                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        fn(scope, {
                            $fileContent:onLoadEvent.target.result
                        });
                    });
                };
                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});
