/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller.mainViewController', [])
.controller('mainViewCtrl', ['$scope', '$rootScope', 
function($scope, $rootScope){
    $scope.willkommen = "Keine Charaktere geladen";
    $rootScope.$emit('changeDestination', {name: "Charakteransicht"});
}]);
