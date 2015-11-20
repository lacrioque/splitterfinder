/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller.mainController', [])
.controller('mainCtrl', ['$scope', '$rootScope',function($scope, $rootScope){
    $scope.routed_destination ="Hauptmenu";
    $scope.is_admin_active = function(){return true;};
}]);
