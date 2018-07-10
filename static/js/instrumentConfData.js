var INSTRUMENT_CONFIGURATIONS = {

    /*
    KCWI
    */
    'KCWI': {
        'name': 'KCWI',
        'info': {},
        'showAdd': true,
        'showOption': false,
        'progname': "",
        'selectableData': {
            'Filter': ['KBlue', 'None'],
            'Grating': ['BL','BM','BH1','BH2','BH3','None'],
            'Slicer': ['Small','Medium','Large','FPCam'],
            'Mask Position': ['Open','Mask']
        },
        'textEntryData': {
            'CWave':'cwaveb',
            'PWave':'pwaveb',
            'Camera Angle': 'camangleb',
            'Focus': 'focusb'
        },
        'htmldata': {

            '#defaultControls': `
                <button id="btnDefaultDetector" ng-click="current.DefaultDetector()" type="button" class="btn btn-primary dynamic">Default Det. Conf.</button>
                <button id="btnDefaultCalUnit" ng-click="current.DefaultCalUnit()" type="button" class="btn btn-primary dynamic">Default Cal. Unit</button>
                <button type="button"  class="btn btn-default" data-dismiss="modal">Close</button>
                <button ng-show="showAdd" id="btnAdd" ng-click="addConfiguration()" type="button" class="btn btn-primary">Add configuration</button>
                <button ng-show="!showAdd" id="btnAdd" ng-click="updateConfiguration()" type="button" class="btn btn-primary">Update</button>`,

            }
    },


    /*
    HIRES
    */
    'HIRES': {
        name: 'HIRES',
        info: {},
        showAdd: true,
        showOption: false,
        progname: "",
        crossdisperser: ['Red', 'Blue'],
        slits: ['B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3', 'C4', 'C5',
                'D1', 'D2', 'D3', 'D4', 'D5', 'E1', 'E2', 'E3', 'E4', 'E5'
            ],
        filters: ['RG610', 'OG530', 'GG475', 'KV418', 'KV408',
                  'KV380', 'KV370', 'WG335'
              ],
        rotatormode: ['Vertical', 'Position Angle', 'Physical', 'None'],
        rotatorvalue: "",
        iodinecell: ['On', 'Off'],
        htmldata: {

            '#configurationRow': `
                <th scope="row">{{'{{$index+1}}'}}</th>
                <td ng-repeat="(key,value) in configuration">{{'{{value}}'}}</td>
                <td><span style="cursor:pointer;" ng-click="editDetector(configuration.id)" class="glyphicon glyphicon-camera" aria-hidden="true"></span></td>
                <td><span style="cursor:pointer;" ng-click="editCalunit(configuration.id)" class="glyphicon glyphicon-flash" aria-hidden="true"></span></td>
                <td><span style="cursor:pointer;" ng-click="editConfiguration(configuration.id)" class="glyphicon glyphicon-pencil" aria-hidden="true"></span></td>
                <td><span style="cursor:pointer;" ng-click="duplicateConfiguration(configuration.id)" class="glyphicon glyphicon-duplicate" aria-hidden="true"></span></td>
                <td><span style="cursor:pointer;color:#e43309;" ng-click="confirmDelete(configuration.id)" class="glyphicon glyphicon-remove" aria-hidden="true"></span></td>
                <td><span style="cursor:pointer;color:#3c763d;" ng-click="saveConfiguration(configuration.id)" class="glyphicon glyphicon-save" aria-hidden="true"></span></td>
                <td><span style="cursor:pointer;color:#3c763d;" ng-click="confirmExecute(configuration.id,configuration.statenam)" class="glyphicon glyphicon-play" aria-hidden="true"></span></td>`,

            '#defaultControls': `
                <button id="btnDefaultDetector" ng-click="current.DefaultDetector()" type="button" class="btn btn-primary dynamic">Default Det. Conf.</button>
                <button id="btnDefaultCalUnit" ng-click="current.DefaultCalUnit()" type="button" class="btn btn-primary dynamic">Default Cal. Unit</button>
                <button type="button"  class="btn btn-default" data-dismiss="modal">Close</button>
                <button ng-show="showAdd" id="btnAdd" ng-click="addConfiguration()" type="button" class="btn btn-primary">Add configuration</button>
                <button ng-show="!showAdd" id="btnAdd" ng-click="updateConfiguration()" type="button" class="btn btn-primary">Update</button>`
        }

    },

    /*
    LRIS
    */
    'LRIS': {
        name: 'LRIS',
        info: {},
        showAdd: true,
        showOption: false,
        progname: "",
        detector: ['Blue', 'Red'],
        dichroic: ['D460', 'D500', 'D560', 'D680'],
        filters: [
            "u'-Blue",
            "B-Blue",
            "g-Blue",
            "V-Blue",
            "B5-Red",
            "V-Red",
            "R-Red",
            "Rs-Red",
            "I-Red",
            "GG495-Red",
            "OG570-Red",
            "RG850-Red",
            "NB4000-Red",
            "NB6741-Red",
            "NB8185-Red",
            "NB8560-Red",
            "NB9135-Red",
            "NB9148-Red",
            "NB4325-Red"
        ],
        bluegrisms: ['300/5000', '400/3400', '600/4000', '1200/3400'],
        redgrisms: [
            '150/7500', '300/5000', '400/8500', '600/5000', '600/7500',
            '600/10000 Gold coated', '831/8200 Gold coated', '900/5500',
            '1200/7500', '1200/9000 Gold coated', 'Mirror'
        ],
        slitmasks: ['long_0.7', 'long_1.0', 'long_1.5', 'long_8.7',
                    'pol_1.0', 'pol_1.5', 'focus_holes'
                ],
        polarimeter: ['On', 'Off'],
        htmldata: {

        }
    },

    /*
    MOSFIRE
    */
    'MOSFIRE': {
        name: 'MOSFIRE',
        info: {},
        showAdd: true,
        showOption: false,
        progname: "",
        filters: ['Y', 'J', 'H', 'K', 'Ks', 'J2', 'J3', 'H1', 'H2'],
        htmldata: {}
    }
}
