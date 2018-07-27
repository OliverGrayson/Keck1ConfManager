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
        'data': {
            'selectableData': {
                'filterb': {
                    'title':'Filter',
                    'options': ['KBlue', 'None']
                },
                'gratingb': {
                    'title':'Grating',
                    'options':['BL','BM','BH1','BH2','BH3','None']
                },
                'image_slicer': {
                    'title':'Slicer',
                    'options':['Small','Medium','Large','FPCam']
                },
                'nsmaskb': {
                    'title':'Mask Position',
                    'options':['Open','Mask']
                }
            },
            'textEntryData': {
                'statenam':{
                    'title':'Configuration Name',
                    'default': ''
                },
                'cwaveb':{
                    'title':'CWave',
                    'default': ''
                },
                'pwaveb':{
                    'title':'PWave',
                    'default': ''
                },
                'camangleb':{
                    'title':'Camera Angle',
                    'default': ''
                },
                'focusb':{
                    'title':'Focus',
                    'default': ''
                },
                'ccdmodeb':{
                    'title':'CCD Mode',
                    'default': '0'
                },
                'ampmodeb':{
                    'title':'Amplifier Mode',
                    'default': '0'
                },
                'gainmulb':{
                    'title':'Gain Multiplier',
                    'default': '0'
                },
                'binningb':{
                    'title':'Binning',
                    'default': '2,2'
                },
                'polarizer': {
                    'title':'Polarizer',
                    'default': "Sky"
                },
                'cal_mirror': {
                    'title':'Calibration Mirror',
                    'default': "Sky"
                }
            }
        }
    },


    /*
    HIRES
    */
    'HIRES': {
        'name': 'HIRES',
        'info': {},
        'showAdd': true,
        'showOption': false,
        'progname': "",
        'data': {
            'selectableData': {
                'hatch': {
                    'title': 'Hatch',
                    'options': ['open', 'closed']
                },
                'fil1name': {
                    'title': 'Filter 1',
                    'options': ['clear', 'rg610', 'og530', 'gg475', 'kv418',
                                'kv408', 'kv380', 'kv370', 'wg335']
                },
                'fil2name': {
                    'title': 'Filter 2',
                    'options': ['clear', 'OCLI d.t.', 'CuSO4', '5893/30',
                                '6199/30', '6300/30', '6563/30']
                },
                'deckname': {
                    'title': 'Slit',
                    'options': ['B1', 'B2', 'B3', 'B4', 'B5', 'C1', 'C2', 'C3',
                                'C4', 'C5', 'D1', 'D2', 'D3', 'D4', 'D5', 'E1',
                                'E2', 'E3', 'E4', 'E5']
                },
                'coll': {
                    'title': 'Cross Disperser',
                    'options': ['red', 'blue']
                },
                'lampname': {
                    'title': 'Lamp',
                    'options': ['none', 'quartz1', 'quartz2',
                                'ThAr1', 'ThAr2']
                },
                'lfilname': {
                    'title': 'Lamp Filter',
                    'options': ['bg12', 'bg13', 'bg14', 'bg38', 'dt',
                                'gg495', 'ng3', 'ug1', 'ug5']
                },
                'cofname': {
                    'title':'Collimator Focus',
                    'options': ['home', 'blue', 'red', 'forward', 'reverse',
                                'DR00MM', 'DR03MM', 'DR05MM', 'DR06MM',
                                'DR08MM', 'DB00mm', 'DB03mm', 'DB05mm',
                                'DB06mm', 'DB08mm', 'SR00mm', 'SR03mm',
                                'SR05mm', 'SR06mm', 'SR08mm', 'SB00mm',
                                'SB03mm', 'SB05mm', 'SB06mm', 'SB08mm']
                },
            },
            'textEntryData': {
                'statenam':{
                    'title':'Configuration Name',
                    'default': ''
                },
                'echangl': {
                    'title':'Echelle Angle'
                },
                'xdangl': {
                    'title':'Cross Disperser Angle'
                },
                'slitwid': {
                    'title':'Slit Width'
                }
        }

    },

    /*
    LRIS
    */
    'LRIS': {
        'name': 'LRIS',
        'info': {},
        'showAdd': true,
        'showOption': false,
        'progname': "",
        'data': {
            'selectableData': {
                'detector': {
                    'title': 'Detector',
                    'options': ['Blue', 'Red']
                },
                'dichroic': {
                    'title': 'Dichroic',
                    'options': ['D460', 'D500', 'D560', 'D680']
                },
                'filter': {
                    'title': 'Filter',
                    'options': [
                        "u'_Blue",
                        "B_Blue",
                        "g_Blue",
                        "V_Blue",
                        "B5_Red",
                        "V_Red",
                        "R_Red",
                        "Rs_Red",
                        "I_Red",
                        "GG495_Red",
                        "OG570_Red",
                        "RG850_Red",
                        "NB4000_Red",
                        "NB6741_Red",
                        "NB8185_Red",
                        "NB8560_Red",
                        "NB9135_Red",
                        "NB9148_Red",
                        "NB4325_Red"
                    ]
                },
                'bluegrism': {
                    'title': 'Blue Grism',
                    'options': ['300/5000', '400/3400', '600/4000', '1200/3400']
                },
                'redgrism': {
                    'title': 'Red Grism',
                    'options':
                    ['150/7500', '300/5000', '400/8500', '600/5000', '600/7500',
                    '600/10000_gold_coated', '831/8200_gold_coated', '900/5500',
                    '1200/7500', '1200/9000_gold_coated', 'Mirror']
                },
                'slitmask': {
                    'title': 'Slit Mask',
                    'options': ['long_0.7', 'long_1.0', 'long_1.5', 'long_8.7',
                            'pol_1.0', 'pol_1.5', 'focus_holes']
                },
                'polarimeter': {
                    'title': 'Polarimeter',
                    'options': ['On', 'Off']
                }
            },
            'textEntryData': {
                'statenam':{
                    'title':'Configuration Name',
                    'default': ''
                },
            }
        }
    },

    /*
    MOSFIRE
    */
    'MOSFIRE': {
        'name': 'MOSFIRE',
        'info': {},
        'showAdd': true,
        'showOption': false,
        'progname': "",
        'data': {
            'selectableData': {
                'filter': {
                    'title': 'Filter',
                    'options': ['Y', 'J', 'H', 'K', 'Ks', 'J2', 'J3', 'H1', 'H2']
                }
            },
            'textEntryData': {
                'statenam':{
                    'title':'Configuration\nName',
                    'default': ''
                },
            }
        }
    }
};
