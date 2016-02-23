/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller.mainViewController', []).controller('mainViewCtrl', [
  '$scope',
  '$rootScope',
  '$charViewServ',
  function ($scope, $rootScope,$charViewServ) {
      $scope.keineCharaktere = true;
      $scope.charaktere = [];
    $charViewServ.getAllCharakter().then(
        function(result){
            $scope.charaktere = result;
            if(result.length >0){
                $scope.keineCharaktere = false;
            }
        },
        function(err){
            console.log(err);
        }
    )  
    $scope.willkommen = 'Keine Charaktere geladen';
    $rootScope.$emit('changeDestination', { name: 'Charakteransicht' });
  }
]);