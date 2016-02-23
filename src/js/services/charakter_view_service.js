/*globals angular, console, window, q, _ */
angular.module('splitterfinder.services.charakterViewService', [])
.factory('$charViewServ', [
    function(){
        const 
            nwgui = require('nw.gui'),
            database = require('./modules/database_connect.js'),
            getAllCharakter = function(){
                return q.fcall(function(){return [{name: "Ein Charakter", ausbildung: "Eine ausbildung", kultur: "eine Kultur"}];});
                //return database.getAllCharakter(false);
            },
            getCharakter = function(id){
                return database.getCharakter(id,false);
            };
            return {
                getAllCharakter : getAllCharakter,
                getCharakter : getCharakter
            }
    }
])