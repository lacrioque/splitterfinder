var encryption = require('./encryption.js'), path = require('path'), neDB = require('nedb'), _ = require('lodash'), q = require('q'), databaseExport = function () {
    var dbpath_mods = path.join(require('nw.gui').App.dataPath, 'splitterfinder_alpha.nedb'), dbpath_chars = path.join(require('nw.gui').App.dataPath, 'splitterfinder_omega.nedb'), dbCharaktere = new neDB({
        filename: dbpath_chars,
        autoload: true
      }), dbModule = new neDB({
        filename: dbpath_mods,
        autoload: true
      }), getModul = function (modulBezeichnung) {
        var def = q.defer();
        dbModule.find({ bezeichnung: modulBezeichnung }, function (err, document) {
          def.resolve(encryption.decrypt(document.modul));
        });
        return def.promise;
      }, getModuleIndex = function () {
        dbModule.find({},{ bezeichnung: 1, kategorie: 1 }, function (err, document) {
          def.resolve(encryption.decrypt(document));
        });
      }, getCharakter = function (charakterID, secure) {
        secure = secure || true;
        var def = q.defer();
        dbCharaktere.find({ id: charakterID }, function (err, document) {
          if (secure) {
            def.resolve(document);
          } else {
            document.charakterObject = encryption.decrypt(document.charakterString);
            def.resolve(document);
          }
        });
        return def.promise;
      }, saveCharakter = function (rawCharacterString, id) {
        id = id || false;
        var saveObject = {
          charakterString: rawCharacterString,
          time: Date().getTime()
        };
        if (id) {
          dbCharaktere.update({ _id: id }, saveObject, {}, function (err) {
          });
        } else {
          dbCharaktere.insert(saveObject, function (err) {
          });
        }
      }, saveModul = function (modulObj, modulBezeichnung, id) {
        id = id || false;
        var saveObject = {
          modulBezeichnung: modulBezeichnung,
          modul: encryption.encrypt(modulObj)
        };
        if (id) {
          dbModule.update({ _id: id }, saveObject, {}, function (err) {
          });
        } else {
          dbModule.insert(saveObject, function (err) {
          });
        }
      };
    return {
      getModul: getModul,
      getCharakter: getCharakter,
      saveCharakter: saveCharakter,
      saveModul: saveModul
    };
  };
module.exports = databaseExport();