var INSTRUMENT_CONFIGURATIONS = {
    'kcwi': {
        name: "KCWI"
        info: {},
        showAdd: true,
        showOption: false,
        filters: ['KBlue', 'None'],
        gratings: ['BL','BM','BH1','BH2','BH3','None'],
        slicers: ['Small','Medium','Large','FPCam'],
        maskpositions: ['Open','Mask'],
        progname: "",
        configurationTable: `
            <th>#</th>
            <th>Name</th>
            <th>Slicer</th>
            <th>Blue Filter</th>
            <th>Blue Grating</th>
            <th>CWaveB</th>
            <th>PWaveB</th>
            <th>Binning</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>`,
        configurationRow: `
            <th scope="row">{{'{{$index+1}}'}}</th>
            <td ng-repeat="(key,value) in configuration">{{'{{value}}'}}</td>
            <td><span style="cursor:pointer;" ng-click="editDetector(configuration.id)" class="glyphicon glyphicon-camera" aria-hidden="true"></span></td>
            <td><span style="cursor:pointer;" ng-click="editCalunit(configuration.id)" class="glyphicon glyphicon-flash" aria-hidden="true"></span></td>
            <td><span style="cursor:pointer;" ng-click="editConfiguration(configuration.id)" class="glyphicon glyphicon-pencil" aria-hidden="true"></span></td>
            <td><span style="cursor:pointer;" ng-click="duplicateConfiguration(configuration.id)" class="glyphicon glyphicon-duplicate" aria-hidden="true"></span></td>
            <td><span style="cursor:pointer;color:#e43309;" ng-click="confirmDelete(configuration.id)" class="glyphicon glyphicon-remove" aria-hidden="true"></span></td>
            <td><span style="cursor:pointer;color:#3c763d;" ng-click="saveConfiguration(configuration.id)" class="glyphicon glyphicon-save" aria-hidden="true"></span></td>
            <td><span style="cursor:pointer;color:#3c763d;" ng-click="confirmExecute(configuration.id,configuration.statenam)" class="glyphicon glyphicon-play" aria-hidden="true"></span></td>`,
        dataEntryForm: `
            <div class="form-group">
                <label for="txtName" class="control-label">Configuration Name:</label>
                <input type="text" class="form-control" ng-model="current.info.statenam" id="txtName">
            </div>
            <div class="form-group">
                <label for="txtSlicer" class="control-label">Slicer:</label>
                <select type="text" class="form-control" ng-model="current.info.image_slicer" ng-options="x for x in current.slicers" id="txtSlicer"></select>
            </div>
            <div class="form-group">
                <label for="txtBlueFilter" class="control-label"> Blue Filter:</label>
                <select type="text" class="form-control" ng-model="current.info.filterb" ng-options="x for x in current.filters" id="txtBluefilter"></select>
            </div>
            <div class="form-group">
                <label for="txtBlueGrating" class="control-label"> Blue Grating:</label>
                <select type="text" class="form-control" ng-model="current.info.gratingb" ng-options="x for x in current.gratings" id="txtBlueGrating"></select>
            </div>
            <div class="form-group">
                <label for="txtCwaveB" class="control-label">Cwave:</label>
                <input type="text" class="form-control" ng-model="current.info.cwaveb" id="txtCwave">
            </div>
            <div class="form-group">
                <label for="txtPwaveB" class="control-label">Pwave:</label>
                <input type="text" class="form-control" ng-model="current.info.pwaveb" id="txtPwave">
            </div>
            <div class="form-group">
                <label for="txtcamangleB" class="control-label">Camera Angle:</label>
                <input type="text" class="form-control" ng-model="current.info.camangleb" id="txtcamangleb">
            </div>
            <div class="form-group">
                <label for="txtNsmaskb" class="control-label">N&S mask B:</label>
                <select type="text" class="form-control" ng-model="current.info.nsmaskb" ng-options="x for x in current.maskpositions" id="txtNsmaskb"></select>
            </div>
            <div class="form-group">
                <label for="txtfocusB" class="control-label">Focus:</label>
                <input type="text" class="form-control" ng-model="current.info.focusb" id="txtfocusb">
            </div>`
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
        detector: ['Blue', 'Red'],

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
