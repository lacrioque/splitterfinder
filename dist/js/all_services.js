/*globals angular, console, window, q, _ */
angular.module('splitterfinder.services', [
  'splitterfinder.services.stubService',
  'splitterfinder.services.moduleService',
  'splitterfinder.services.fertigkeitenKontrollService',
  'splitterfinder.services.ressourcenKontrollService',
  'splitterfinder.services.zauberKontrollService',
  'splitterfinder.services.staerkenKontrollService',
  'splitterfinder.services.charakterPlanService',
  'splitterfinder.services.validateJSONInputService'
]);
/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.charakterPlanService', []).factory('$charPlanServ', function () {
  var fieldList = {
      fertigkeiten: [
        'akrobatik',
        'alchemie',
        'anfuehren',
        'arkaneKunde',
        'athletik',
        'darbietung',
        'diplomatie',
        'edelhandwerk',
        'empathie',
        'entschlossenheit',
        'fingerfertigkeit',
        'geschichteUndMythen',
        'handwerk',
        'heilkunde',
        'heimlichkeit',
        'jagdkunst',
        'laenderkunde',
        'naturkunde',
        'redegewandtheit',
        'schloesserUndFallen',
        'schwimmen',
        'seefahrt',
        'strassenkunde',
        'tierfuehrung',
        'ueberleben',
        'wahrnehmung',
        'zaehigkeit'
      ],
      ressourcen: [
        'ansehen',
        'gefolge',
        'kontakte',
        'kreatur',
        'mentor',
        'rang',
        'relikt',
        'stand',
        'vermoegen',
        'zuflucht'
      ],
      kampffertigkeiten: [
        'handgemenge',
        'hiebwaffen',
        'kettenwaffen',
        'klingenwaffen',
        'stangenwaffen',
        'schusswaffen',
        'wurfwaffen'
      ]
    }, metaFieldList = [
      'fertigkeiten',
      'ressourcen',
      'kampffertigkeiten',
      'staerken',
      'zauberschulen',
      'zauber'
    ], getFields = function () {
    }, getMetaFields = function () {
    }, checkFieldValid = function (field) {
    }, checkMetaFieldValid = function (metaField) {
    }, translateMetaToSelect = function (metaFromModule) {
    }, getFieldsFromType = function (type) {
    };
  return {
    getFields: getFields,
    getMetaFields: getMetaFields,
    checkFieldValid: checkFieldValid,
    checkMetaFieldValid: checkMetaFieldValid,
    translateMetaToSelect: translateMetaToSelect,
    getFieldsFromType: getFieldsFromType
  };
});
/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.fertigkeitenKontrollService', []).factory('$fertigkeitCtrlServ', function () {
  var fertigkeiten_array = [
    'akrobatik',
    'alchemie',
    'anfuehren',
    'arkaneKunde',
    'athletik',
    'darbietung',
    'diplomatie',
    'edelhandwerk',
    'empathie',
    'entschlossenheit',
    'fingerfertigkeit',
    'geschichteUndMythen',
    'handwerk',
    'heilkunde',
    'heimlichkeit',
    'jagdkunst',
    'laenderkunde',
    'naturkunde',
    'redegewandtheit',
    'schloesserUndFallen',
    'schwimmen',
    'seefahrt',
    'strassenkunde',
    'tierfuehrung',
    'ueberleben',
    'wahrnehmung',
    'zaehigkeit'
  ];
  var fertigkeiten_obj = {
      akrobatik: {
        wert: '',
        punkte: '',
        attr: [
          'BEW',
          'STA'
        ]
      },
      alchemie: {
        wert: '',
        punkte: '',
        attr: [
          'MYS',
          'VER'
        ]
      },
      anfuehren: {
        wert: '',
        punkte: '',
        attr: [
          'AUS',
          'WIL'
        ]
      },
      arkaneKunde: {
        wert: '',
        punkte: '',
        attr: [
          'MYS',
          'VER'
        ]
      },
      athletik: {
        wert: '',
        punkte: '',
        attr: [
          'BEW',
          'STA'
        ]
      },
      darbietung: {
        wert: '',
        punkte: '',
        attr: [
          'AUS',
          'WIL'
        ]
      },
      diplomatie: {
        wert: '',
        punkte: '',
        attr: [
          'AUS',
          'VER'
        ]
      },
      edelhandwerk: {
        wert: '',
        punkte: '',
        attr: [
          'INT',
          'VER'
        ]
      },
      empathie: {
        wert: '',
        punkte: '',
        attr: [
          'INT',
          'VER'
        ]
      },
      entschlossenheit: {
        wert: '',
        punkte: '',
        attr: [
          'AUS',
          'WIL'
        ]
      },
      fingerfertigkeit: {
        wert: '',
        punkte: '',
        attr: [
          'AUS',
          'BEW'
        ]
      },
      geschichteUndMythen: {
        wert: '',
        punkte: '',
        attr: [
          'MYS',
          'VER'
        ]
      },
      handwerk: {
        wert: '',
        punkte: '',
        attr: [
          'KON',
          'VER'
        ]
      },
      heilkunde: {
        wert: '',
        punkte: '',
        attr: [
          'INT',
          'VER'
        ]
      },
      heimlichkeit: {
        wert: '',
        punkte: '',
        attr: [
          'BEW',
          'INT'
        ]
      },
      jagdkunst: {
        wert: '',
        punkte: '',
        attr: [
          'KON',
          'VER'
        ]
      },
      laenderkunde: {
        wert: '',
        punkte: '',
        attr: [
          'INT',
          'VER'
        ]
      },
      naturkunde: {
        wert: '',
        punkte: '',
        attr: [
          'INT',
          'VER'
        ]
      },
      redegewandtheit: {
        wert: '',
        punkte: '',
        attr: [
          'AUS',
          'WIL'
        ]
      },
      schloesserUndFallen: {
        wert: '',
        punkte: '',
        attr: [
          'INT',
          'BEW'
        ]
      },
      schwimmen: {
        wert: '',
        punkte: '',
        attr: [
          'STA',
          'KON'
        ]
      },
      seefahrt: {
        wert: '',
        punkte: '',
        attr: [
          'BEW',
          'KON'
        ]
      },
      strassenkunde: {
        wert: '',
        punkte: '',
        attr: [
          'AUS',
          'INT'
        ]
      },
      tierfuehrung: {
        wert: '',
        punkte: '',
        attr: [
          'AUS',
          'BEW'
        ]
      },
      ueberleben: {
        wert: '',
        punkte: '',
        attr: [
          'INT',
          'KON'
        ]
      },
      wahrnehmung: {
        wert: '',
        punkte: '',
        attr: [
          'INT',
          'WIL'
        ]
      },
      zaehigkeit: {
        wert: '',
        punkte: '',
        attr: [
          'KON',
          'WIL'
        ]
      }
    }, getFertigkeitenList = function () {
      return fertigkeiten_array;
    }, getFertigkeitenObjekteList = function () {
      return fertigkeiten_obj;
    }, getFertigkeit = function (bezeichnung) {
      return fertigkeiten_obj[bezeichnung];
    };
  return {
    getFertigkeitenList: getFertigkeitenList,
    getFertigkeitenObjekteList: getFertigkeitenObjekteList,
    getFertigkeit: getFertigkeitenList
  };
});
/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.moduleService', []).factory('$moduleServ', function () {
  console.log(database);
  var modulesLoaded = false, modules = {}, getModule = function (moduleID) {
      database.getModul(null, moduleID);
    }, decryptModule = function (moduleCrypt) {
      getModuleIndex();
    }, saveModule = function (module, id) {
      id = id || null;
      getModuleIndex();
    }, getModuleIndex = function () {
      database.getModuleIndex().then(function (indexM) {
        modules = indexM;
        modulesLoaded = true;
      });
    }, deleteModule = function (module) {
      var ret = database.deleteModul(module);
      getModuleIndex();
      return ret;
    };
  getModuleIndex();
  return {
    getModule: getModule,
    decryptModule: decryptModule,
    saveModule: saveModule,
    getModuleIndex: getModuleIndex,
    deleteModule: deleteModule,
    getModuleList: function () {
      return modules;
    }
  };
});
/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.ressourcenKontrollService', []).factory('$ressourcenCtrlServ', function () {
});
/*globals angular, console, window, q, _ */
angular.module('splitterfinder.services.stubService', []).factory('stubService', function () {
  return function () {
    console.log('stub');
  };
});
/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.staerkenKontrollService', []).factory('$staerkenCtrlServ', function () {
});
/*globals angular, console, window, q, _ */
angular.module('splitterfinder.services.validateJSONInputService', []).factory('$validateJSON', function () {
  var testParsing = function (text) {
    }, getProcess = function (options) {
      var option = {
          test: options.test || 'lean',
          validClasses: options.validClasses || 'valid',
          invalidClasses: options.invalidClasses || 'invalid',
          returnErrors: options.returnErrors || true
        }, returner = {
          classes: '',
          invalid: true,
          validate: function (text) {
            var valid = checkErrors(text, option);
            if (valid === true) {
              this.invalid = false;
              this.classes = option.validClasses;
            } else {
              this.invalid = true;
              this.classes = option.invalidClasses;
            }
          }
        };
      console.log(returner);
      return returner;
    }, checkErrors = function (text, options) {
      switch (options.test) {
      default:
      case 'lean':
        try {
          var obj = JSON.parse(text);
          if (obj && typeof obj === 'object' && obj !== null) {
            return true;
          } else {
            throw new Error();
          }
        } catch (e) {
          return false;
        }
        break;
      case 'strict':
        try {
          var obj = JSON.parse(text);
          if (obj && typeof obj === 'object' && obj !== null) {
            return true;
          } else {
            throw new Error('null or !object');
          }
        } catch (e) {
          return e;
        }
        break;
      case 'strict_check':
        //kommt noch
        break;
      }
      return true;
    }, findErrors = function (text, options) {
    };
  return {
    getProcess: getProcess,
    testParsing: testParsing,
    checkErrors: checkErrors,
    findErrors: findErrors
  };
});  //

/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.zauberKontrollService', []).factory('$zauberCtrlServ', function () {
});