/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.moduleService', []).factory('$moduleServ', function () {
  return function () {
    var modulesLoaded = false,
        modules = {},
        getModule = function(moduleID){
          
        },
        decryptModule = function(moduleCrypt){
          
        },
        saveModule = function(module, id){
            id = id || false;
        },
        getModuleIndex = function(){
          database.getModuleIndex().then(function(indexM){
            modules = indexM;
            modulesLoaded = true;
          });
        };
        return {
          getModule: getModule,
          decryptModule: decryptModule,
          saveModule: saveModule,
          getModuleIndex: getModuleIndex
        }
        
  };
});