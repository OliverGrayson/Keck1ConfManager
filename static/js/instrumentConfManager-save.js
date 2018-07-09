var myApp = angular.module('myApp', []);

myApp.controller('HomeCtrl', [$scope, function($scope, $http) {

    // initial settings
    $scope = {
        current: {},
        // from instrumentConfData.js for legibility and neatness
        instruments: INSTRUMENT_CONFIGURATIONS
    }

    // default to populate the fields with
    $scope.current = $scope.instruments['KCWI'];
    $scope.current.progname = "U263";
    console.log($scope.current)
    // $scope.info = {};
    // $scope.showAdd = true;
    // $scope.showOption = false;
    // $scope.filters=['KBlue','None'];
    // $scope.gratings=['BL','BM','BH1','BH2','BH3','None'];
    // $scope.slicers=['Small','Medium','Large','FPCam'];
    // $scope.maskpositions=['Open','Mask'];



    /*
    FUNCTIONS FOR STATE FILES
    general $scope methods will modify attributes of $scope.current
    */


    // GET initial configuration list
    $scope.showList = function(){
        console.log($scope.current.progname,$scope.current.name)
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

            console.log('mm',$scope.current.configurations);
            console.log('0', $scope.current.configurations[0])
        }, function(error) {
            console.log(error);
        });
    }

    // display content
    $scope.showContent = function($fileContent){
        $scope.current.content = $fileContent;
        console.log("File content updated");
    }

    $scope.swapInstrument = function(inst){
        // TODO need to test if this carries over functions of scope.instrument
        $scope.current = $scope.instruments[inst];

        console.log($scope.current)

        // use JQuery to fill in instrument specific Angular html blocks
        for (var elem in $scope.current.htmldata) {
            var Jdat = $(dat);
            $(elem).html(Jdat);

            var Jelem = $(elem);

            angular.element().injector().invoke(function($compile) {
              var scope = angular.element(Jelem).scope();
              $compile(Jelem)(scope);
            });

        }

        // show/hide popups
        $('.popup').modal('hide');

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
                instrument:$scope.current.name,
                file:$scope.current.content,
                progname:$scope.current.info.progname,
                filename:$scope.current.fileName
            }
        }).then(function(response) {
            $scope.current.message="";
            $scope.current.content="";
            $scope.showlist();
            //$('#addPopUp').modal('hide')
            $scope.current.info = {};
            $scope.current.message=response.data.message;
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
            data: {
                instrument:$scope.current.name,
                progname: $scope.current.info.progname
            }
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
            data: {
                instrument:$scope.current.name,
                id:$scope.current.info.id
            }
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
            data: {
                instrument:$scope.current.name,
                id:$scope.current.info.id
            }
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
            data: {
                instrument:$scope.current.name,
                id:$scope.current.info.id
            }
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
            data: {
                instrument:$scope.current.name,
                id:$scope.current.deleteConfigurationId
            }
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
            data: {
                instrument:$scope.current.name,
                id:$scope.current.info.id
            }
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
            data: {
                instrument:$scope.current.name,
                id:$scope.current.executeConfigurationId
            }
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

    // post the updated configuration
    $scope.updateConfiguration = function(id){
        $http({
            method: 'POST',
            url: '/updateConfiguration',
            data: {
                instrument:$scope.current.name,
                info:$scope.current.info
            }
        }).then(function(response) {
            $scope.current.message="";
            console.log(response.data);
            $scope.showlist();
            $('.popup').modal('hide');
        }, function(error) {
            console.log(error);
        });
    }


    /*
    instrument specific functions
    */

    // set default detector values
    $scope.instruments['KCWI'].DefaultDetector = function(){
        $scope.info.binningb="2,2";
        $scope.info.ccdmodeb=0;
        $scope.info.gainmulb=10;
        $scope.info.ampmodeb=9;
    }

    // set default cal unit values
    $scope.instruments['KCWI'].DefaultCalUnit = function(){
        $scope.info.cal_mirror="Sky";
        $scope.info.polarizer="Sky";
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
            $scope.current.message="";
            console.log(response);
            $scope.current.info = response.data;
            $("."+$scope.current.name+" .detectorPopUp").modal('show');
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
            $scope.current.message="";
            console.log(response);
            $scope.current.info = response.data;
            $("."+$scope.current.name+" .calUnitPopUp").modal('show');
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
    $scope.showList();

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
                        fn(scope, {$fileContent:onLoadEvent.target.result});

                    });
                };
                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});
