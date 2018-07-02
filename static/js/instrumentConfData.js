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
        `
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
