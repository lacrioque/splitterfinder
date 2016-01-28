/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller.adminController', []).controller('adminCtrl', [
  '$scope',
  '$rootScope',
  '$moduleServ',
  '$validateJSON',
  function ($scope, $rootScope, $moduleServ, $validateJSON) {
    var module = {},
        checkValid = $validateJSON.getProcess({validClasses: "mdi-green mdi-verified", invalidClasses : "mdi-red mdi-shield"}),
        moduleListe = {}; //$moduleServ.getModuleList();
      _.each(module, function(item, i){
        $moduleServ.getModule(item.bezeichnung).then(
          function(modul){
            module[modul.name] = modul;
          }
        );
      });
      
      $scope.newModule = {
          stringContent : "{name: usw...}",
          toJSON : function(){return JSON.parse( this.stringContent );}
          }
      
      $rootScope.$emit('changeDestination', { name: 'Administration' });
      $scope.checkValid = checkValid;
      $scope.validateInput= function(){
          checkValid.validate($scope.newModule.stringContent);
      };
      $scope.addFeld = function(){
          
      };
      $scope.addMetafeld = function(){};
      $scope.saveModul = function(){};
      
  }
  ]);