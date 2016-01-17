/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.moduleService', []).factory('$moduleServ', function () {
    console.log(database);
    var modulesLoaded = false,
        modules = {},
        getModule = function(moduleID){
          database.getModul(null, moduleID);
        },
        decryptModule = function(moduleCrypt){
          getModuleIndex();
        },
        saveModule = function(module, id){
            id = id || null;
            getModuleIndex();
        },
        getModuleIndex = function(){
          database.getModuleIndex().then(function(indexM){
            modules = indexM;
            modulesLoaded = true;
          });
        },
        deleteModule = function(module){
          var ret =  database.deleteModul(module);
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
          getModuleList : function(){return modules;}
        }
});