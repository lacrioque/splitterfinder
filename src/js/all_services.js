/*globals angular, console, window, q, _ */
angular.module('splitterfinder.services', [
	'splitterfinder.services.stubService',
	'splitterfinder.services.moduleService'
	]);
/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.moduleService', []).factory('$moduleServ', function () {
  return function () {
    var modulesLoaded = false,
        modules = {},
        getModule = function(moduleID){
          
        },
        decryptModule = function(moduleCrypt){
          
        },
        saveModule = function(module){
          
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
/*globals angular, console, window, q, _ */
angular.module('splitterfinder.services.stubService', []).factory('stubService', function () {
  return function () {
    console.log('stub');
  };
});