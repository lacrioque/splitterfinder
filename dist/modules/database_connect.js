"use strict";
const   encryption = require('./encryption.js'), 
        path = require('path'), 
        fs = require('fs'),
        NEDB = require('NEDB'), 
        _ = require('lodash'), 
        q = require('q'), 
        databaseExport = function () {
            let nextID = 1;
            const   dbpath_mods = 'splitterfinder_alpha.NEDB', 
                    dbModule = new NEDB({
                        filename: dbpath_mods,
                        autoload: true
                    }),
                    getDBDUMP = function(){
                        let def = q.defer();
                        fs.readFile(dbpath_mods, function(err, data) { if(err){throw err;} def.resolve(data); });
                        return def.promise;
                    },
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
                    };
            
            dbModule.ensureIndex({fieldName: 'id', unique: true}, throwOnlyError);  
            getNextID();
                
            return {
                getModul: getModul,
                saveModul: saveModul,
                deleteModul : deleteModul,
                getModuleIndex: getModuleIndex,
                getNextID : getNextID,
                getDBDUMP : getDBDUMP
            };
        };
module.exports = databaseExport();
                        