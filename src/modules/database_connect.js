"use strict";
const   encryption = require('./encryption.js'), 
        path = require('path'), 
        fs = require('fs'),
        NEDB = require('NEDB'), 
        _ = require('lodash'), 
        q = require('q'), 
        databaseExport = function () {
            let  
                nextID = 1;
            const   dbpath_mods = './data/splitterfinder_alpha.db', 
                    dbpath_chars = './data/splitterfinder_omega.db',
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
                    getAllCharakter = function (secure) {
                        secure = secure || true;
                        let def = q.defer();
                        dbCharaktere.find({}, function (err, document) {
                            console.log(document);
                            if (secure) {
                                def.resolve(document);
                            } else {
                                let charaktere = _.map(document,function(doc,i){
                                    doc.charakterObject = encryption.decrypt(doc.charakterString);   
                                });
                                def.resolve(charaktere);
                            }
                        });
                        return def.promise;
                    },
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
                getAllCharakter : getAllCharakter,
                getCharakter: getCharakter,
                saveCharakter: saveCharakter,
                getNextID : getNextID,
                getDBDUMP : getDBDUMP
            };
        };
module.exports = databaseExport();