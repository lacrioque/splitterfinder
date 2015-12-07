/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller.mainController', []).controller('mainCtrl', [
  '$scope',
  '$rootScope',
  '$templateCache',
  '$mdSidenav',
  function ($scope, $rootScope, $templateCache, $mdSidenav) {
    $scope.routed_destination = 'Hauptmenu';
    $scope.is_admin_active = function () {
      return true;
    };
    $scope.main_menu = $templateCache.get('templates/main_menu.tpl.html');
    $rootScope.$on('changeDestination', function (destination, args) {
      console.log(args);
      $scope.routed_destination = args.name;
    });
    $scope.toggleLeft = function () {
      $mdSidenav('left').toggle();
    };
  }
]);