var encrytion = require('forge'), environment = require('./envVARS.js'), neDB = require('nedb'), _ = require('lodash'), q = require('q'), databaseExport = function () {
    var charaktere = {}, module = {}, password = 'SplittermondIstM3ga!Awes0M3!', getModul = function (modulBezeichnung) {
        return _.find(charaktere, { bezeichnung: modulBezeichnung });
      }, getCharakter = function (charakterID) {
        return _.find(charaktere, { id: charakterID });
      }, saveCharakter = function () {
      }, saveModul = function () {
        if ($__adminModus) {
        }
      };
  };