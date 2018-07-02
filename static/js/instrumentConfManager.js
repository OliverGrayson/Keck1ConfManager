angular.module('myApp', [])
.controller('HomeCtrl', function($scope, $http) {

    // initial settings
    $scope = {
        current = {},
        instruments: {
            'kcwi': {
                name: "KCWI"
                info: {},
                showAdd: true,
                showOption: false,
                filters: ['KBlue', 'None'],
                gratings: ['BL','BM','BH1','BH2','BH3','None'],
                slicers: ['Small','Medium','Large','FPCam'],
                maskpositions: ['Open','Mask'],
                progname: ""
            },
            'hires': {
                name: "HIRES"
                info: {},
                showAdd: true,
                showOption: false,
                crossdisperser: ['Red', 'Blue'],
                slits: ['B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5',
                        'D1', 'D2', 'D3', 'D4', 'D5', 'E1', 'E2', 'E3', 'E4', 'E5'
                       ]
                filters: ['RG610', 'OG530', 'GG475', 'KV418', 'KV408',
                          'KV380', 'KV370', 'WG335'
                         ]
                rotatormode: ['Vertical', 'Position Angle', 'Physical', 'None'],
                rotatorvalue: "",
                iodinecell: ['On', 'Off'],
                progname: ""
            },
            'lris': {
                name: 'LRIS'
                info: {},
                showAdd: true,
                showOption: false,
                detector: ['Blue', 'Red']

                filters: ['KBlue', 'None'],
                slits: ['12', '24', '48']
                gratings: ['BL','BM','BH1','BH2','BH3','None'],
                slicers: ['Small','Medium','Large','FPCam'],
                maskpositions: ['Open','Mask'],
                progname: ""
            },
            'mosfire': {
                name: 'MOSFIRE'
                info: {},
                showAdd: true,
                showOption: false,
                filters: ['KBlue', 'None'],
                gratings: ['BL','BM','BH1','BH2','BH3','None'],
                slicers: ['Small','Medium','Large','FPCam'],
                maskpositions: ['Open','Mask'],
                progname: ""
            }
        }
    }

    $scope.current.info = {};
    // $scope.showAdd = true;
    // $scope.showOption = false;
    // $scope.filters=['KBlue','None'];
    // $scope.gratings=['BL','BM','BH1','BH2','BH3','None'];
    // $scope.slicers=['Small','Medium','Large','FPCam'];
    // $scope.maskpositions=['Open','Mask'];
    // $scope.progname = "";

    // FUNCTIONS FOR STATE FILES

    // display content
    $scope.showContent = function($fileContent){
        $scope.current.content = $fileContent;
        console.log("File content updated");
    }

    $scope.swapInstrument = function(inst){
        $scope.current = $scope.instruments[inst];
        console.log("Active instrument:", inst);
    }

    // send the file to the backend to be uploaded to the database
    $scope.loadConfiguration = function(){
        $scope.current.info.progname = $scope.progname;
        $scope.current.fileName = document.getElementById("statefile").files[0].name;
        $http({
            method: 'POST',
            url:'/sendFile',
            data: {
                file:$scope.current.content,
                progname:$scope.current.info.progname,
                filename:$scope.current.fileName
            }
        }).then(function(response) {
            $scope.current.message="";
            $scope.current.content="";
            $scope.showlist();
            //$('#addPopUp').modal('hide')
            $scope.current.info = {}
            $scope.current.message=response.data.message
        }, function(error) {
            console.log(error);
        });
    }


    // triggers an action when the Enter key is pressed
    $scope.keyEnter = function(keyEvent) {
        if (keyEvent.which === 13) {
            $('#progPopUp').modal('hide')
            $scope.showlist();
        }
    }

    // save all the state files
    $scope.saveAll = function(){
        $http({
            method: 'POST',
            url: '/saveAllConfigurations',
            data: {progname: $scope.current.info.progname}
        });
    }

    // GET initial configuration list
    $scope.showlist = function(){
        $http({
            method: 'POST',
            url: '/getConfigurationList',
            data: {progname:$scope.current.progname}
        }).then(function(response) {
            $scope.current.configurations = response.data;
            console.log('mm',$scope.current.configurations);
        }, function(error) {
            console.log(error);
        });
    }

    // add a new configuration
    $scope.addConfiguration = function(){
        $scope.current.info.progname = $scope.current.progname;
        $http({
            method: 'POST',
            url:'/addConfiguration',
            data: {
                info:$scope.current.info,
                instrument:$scope.current.name
            }
        }).then(function(response) {
            $scope.current.message="";
            $scope.showlist();
            $('#addPopUp').modal('hide')
            $scope.current.info = {}
        }, function(error) {
            console.log(error);
        });
    }
    // controls the "Add configuration" popup
    $scope.showAddPopUp = function(){
        $scope.current.showAdd = true;
        $scope.current.info = {};
        $('#addPopUp').modal('show')
    }

    // edit an existing configuration
    $scope.editConfiguration = function(id){
        $scope.current.info.id = id;
        $scope.current.showAdd = false;
        $http({
            method: 'POST',
            url: '/getConfiguration',
            data: {id:$scope.current.info.id}
        }).then(function(response) {
            $scope.current.message = "";
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
        $scope.current.showAdd = false;
        $http({
            method: 'POST',
            url: '/getConfiguration',
            data: {id:$scope.current.info.id}
        }).then(function(response) {
            $scope.current.message = "";
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
    }
    // controls the "additional options" values
    $scope.showOption = function(){
        $scope.current.showOptions=true
    }
    // controls the "execute" popup
    $scope.showRunPopUp = function(id){

        $scope.current.info.id = id;
        $scope.current.run = {};
        $http({
            method: 'POST',
            url: '/getConfiguration',
            data: {id:$scope.current.info.id}
        }).then(function(response) {
            $scope.current.message="";
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
            data: {id:$scope.current.deleteConfigurationId}
        }).then(function(response) {
            $scope.current.message="";
            console.log(response.data);
            $scope.current.deleteConfigurationId = '';
            $scope.showlist();
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

    // save configuration
    $scope.saveConfiguration = function(id){
        $scope.current.info.id = id
        $http({
            method: 'POST',
            url: '/saveConfiguration',
            data: {id:$scope.current.info.id}
        }).then(function(response) {
            $scope.current.message="";
            console.log(response.data);
            $scope.current.saveConfigurationId = '';
            $scope.current.message = response.data.message
        }, function(error) {
            console.log(error);
        });
    }
    // execute configuration
    $scope.executeConfiguration = function(){
        $http({
            method: 'POST',
            url: '/executeConfiguration',
            data: {id:$scope.current.executeConfigurationId}
        }).then(function(response) {
            $scope.current.message="";
            console.log(response.data);
            $scope.current.executeConfigurationId = '';
            $('#executeConfirm').modal('hide')
            $scope.current.message=response.data.message
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


    // set default detector values
    $scope.DefaultDetector = function(){
        $scope.info.binningb="2,2";
        $scope.info.ccdmodeb=0;
        $scope.info.gainmulb=10;
        $scope.info.ampmodeb=9;
    }

    // set default cal unit values
    $scope.DefaultCalUnit = function(){
        $scope.info.cal_mirror="Sky";
        $scope.info.polarizer="Sky";
    }

    // edit an existing configuration (DETECTOR only)
    $scope.editDetector = function(id){
        $scope.info.id = id;
        $http({
            method: 'POST',
            url: '/getConfiguration',
            data: {id:$scope.info.id}
        }).then(function(response) {
            $scope.message="";
            console.log(response);
            $scope.info = response.data;
            $('#detectorPopUp').modal('show')
        }, function(error) {
            console.log(error);
        });
    }
    // edit an existing configuration (CAL UNIT only)
    $scope.editCalunit = function(id){
        $scope.info.id = id;
        $http({
            method: 'POST',
            url: '/getConfiguration',
            data: {id:$scope.info.id}
        }).then(function(response) {
            $scope.message="";
            console.log(response);
            $scope.info = response.data;
            $('#calunitPopUp').modal('show')
        }, function(error) {
            console.log(error);
        });
    }
    // post the updated configuration
    $scope.updateConfiguration = function(id){
        $http({
            method: 'POST',
            url: '/updateConfiguration',
            data: {info:$scope.info}
        }).then(function(response) {
            $scope.message="";
            console.log(response.data);
            $scope.showlist();
            $('#addPopUp').modal('hide')
            $('#detectorPopUp').modal('hide')
            $('#calunitPopUp').modal('hide')
        }, function(error) {
            console.log(error);
        });
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
    $scope.showlist();

})
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
                        fn(scope, {$fileContent:onLoadEvent.target.result});

                    });
                };
                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});
