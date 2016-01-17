/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller.adminController', []).controller('adminCtrl', [
  '$scope',
  '$rootScope',
  '$moduleServ',
  function ($scope, $rootScope, $moduleServ) {
    var module = {},
        moduleListe = {}; //$moduleServ.getModuleList();
        console.log($moduleServ);
      _.each(module, function(item, i){
        $moduleServ.getModule(item.bezeichnung).then(
          function(modul){
            module[modul.name] = modul;
          }
        );
      });
  }
  ]);