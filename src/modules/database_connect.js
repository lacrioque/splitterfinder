"use strict";
const   encryption = require('./encryption.js'), 
        path = require('path'), 
        fs = require('fs'),
        NEDB = require('NEDB'), 
        _ = require('lodash'), 
        q = require('q'), 
        databaseExport = function (nwgui) {
            let  
                nextID = 1;
            const   dbpath_mods = path.join(nwgui.App.dataPath, 'splitterfinder_alpha.db'), 
                    dbpath_chars = path.join(nwgui.App.dataPath, 'splitterfinder_omega.db'),
                    dbModule = new NEDB({
                        filename: dbpath_mods,
                        autoload: true
                    }),
                    dbCharaktere = new NEDB({
                        filename: dbpath_chars,
                        autoload: true
                    }),
                    getDBDUMP = function(dbname){
                        if(dbname === undefined || dbname==="mod"){
                            let def = q.defer();
                            fs.readFile(dbpath_mods, function(err, data) { 
                                    if(err){throw err;} 
                                    def.resolve(data); 
                                });
                            return def.promise;
                        } else if(dbname==="chars"){
                            let def = q.defer();
                            fs.readFile(dbpath_mods, function(err, data) { 
                                    if(err){throw err;} 
                                    def.resolve(data); 
                                });
                            return def.promise;
                        }
                    },
                    /////MODULE
                    getModul = function (modulId, bezeichnung) {
                        modulId = modulId || null;
                        bezeichnung = bezeichnung || null;
                        let def = q.defer();
                        dbModule.find({ id: modulId}, 
                            function(err, document) {
                                if(err){
                                    def.reject(err);
                                }
                                if(document.length >= 1){
                                    let doc = document[0],
                                        dec = encryption.decrypt(doc.modul);
                                    console.log(dec);
                                    def.resolve(dec);
                                } else {
                                    def.reject('no mod found');
                                }  
                            }
                        );
                        return def.promise;
                    }, 
                    getModuleIndex = function () {
                        let def = q.defer();
                        dbModule.find({},{ id:1, bezeichnung: 1, fertig: 1 }, 
                            function(err, document)  {
                                if(err){
                                    console.log(err);
                                    throw err;
                                }
                                def.resolve(document);
                            }
                        );
                        return def.promise;
                    }, 
                    saveModul = function (modulObj, bezeichnung, id, option) {
                        id = id || false;
                        option = option || {};
                        let saveObject = {
                            id : id,
                            bezeichnung: bezeichnung,
                            modul: encryption.encrypt(modulObj)
                        };
                        dbModule.update({ id: id }, saveObject, option, function(err){});
                    }, 
                    deleteModul = function(modul){
                        let def = q.defer();
                        dbModule.remove(modul, {}, 
                            function (err, removed) {
                                if(err){
                                    def.reject(err);
                                } else {
                                    if(removed>0){
                                    def.resolve(removed);
                                    } else {
                                    def.reject("Nichts zu löschen");
                                    }
                                }
                            }
                        );
                        return def.promise;
                    }, 
                    getNextID = function(){
                        dbModule.count({}, 
                            function (err,count){
                                nextID = (count+1);
                            }
                        );
                        return nextID;
                    },
                    throwOnlyError = function(err, res){
                        if(err) {console.log(err); throw err;}
                    },
            ////CAHARAKTERE
                    getCharakter = function (charakterID, secure) {
                        secure = secure || true;
                        let def = q.defer();
                        dbCharaktere.find({ id: charakterID }, function (err, document) {
                        if (secure) {
                            def.resolve(document);
                        } else {
                            document.charakterObject = encryption.decrypt(document.charakterString);
                            def.resolve(document);
                        }
                        });
                        return def.promise;
                    },
                    saveCharakter = function (rawCharacterString, id) {
                        id = id || false;
                        
                        let saveObject = {
                            charakterString: rawCharacterString,
                            time: Date().getTime()
                        };
                        
                        if (id) {
                            dbCharaktere.update({ _id: id }, saveObject, {}, function (err) {});
                        } else {
                            dbCharaktere.insert(saveObject, function (err) {});
                        }
                    }
                    
                    
                    
            //////////Steuermethoden        
            dbModule.ensureIndex({fieldName: 'id', unique: true}, throwOnlyError);  
            dbCharaktere.ensureIndex({fieldName: 'id', unique: true}, throwOnlyError);  
            
            getNextID();
                
            return {
                getModul: getModul,
                saveModul: saveModul,
                deleteModul : deleteModul,
                getModuleIndex: getModuleIndex,
                getCharakter: getCharakter,
                saveCharakter: saveCharakter,
                getNextID : getNextID,
                getDBDUMP : getDBDUMP
            };
        };
module.exports = databaseExport();
/*
databaseExport = function (nwgui) {
    var dbpath_mods = path.join(nwgui.App.dataPath, 'splitterfinder_alpha.db'), 
        dbpath_chars = path.join(nwgui.App.dataPath, 'splitterfinder_omega.db'), 
    dbCharaktere = new neDB({
        filename: dbpath_chars,
        autoload: true
      }), dbModule = new neDB({
        filename: dbpath_mods,
        autoload: true
      }), getModul = function (modulId, modulBezeichnung) {
        modulId = modulId || null;
        var def = q.defer();
        mudulBezeichnung = modulBezeichnung || null;
        dbModule.find({ bezeichnung: modulBezeichnung, _id: modulId }, function (err, document) {
          def.resolve(encryption.decrypt(document.modul));
        });
        return def.promise;
      }, getModuleIndex = function () {
        var def = q.defer();
        dbModule.find({},{ bezeichnung: 1, kategorie: 1 }, function (err, document) {
          def.resolve(encryption.decrypt(document));
        });
        return def.promise;
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
      }, deleteModul = function(modul){
        var def = q.defer();
        dbModule.remove(modul, {}, function(err, removed){
          if(err){
            def.reject(err);
          } else {
            if(removed<0){
              def.resolve(removed);
            } else {
              def.reject("Nichts zu löschen");
            }
          }
        });
      }, throwOnlyError = function(err, res){
        if(err) {console.log(err); throw err;}
      }
      
      dbModule.ensureIndex({fieldName: 'bezeichnung', unique: true}, throwOnlyError);  
        
    return {
      getModul: getModul,
      getCharakter: getCharakter,
      saveCharakter: saveCharakter,
      saveModul: saveModul,
      deleteModul : deleteModul,
      getModuleIndex: getModuleIndex
    };
  };
module.exports.init = databaseExport;