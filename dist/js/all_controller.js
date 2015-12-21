/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller', [
  'splitterfinder.controller.mainController',
  'splitterfinder.controller.mainViewController',
  'splitterfinder.controller.sidenavController',
  'splitterfinder.controller.newCharController'
]);
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
/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller.mainViewController', []).controller('mainViewCtrl', [
  '$scope',
  '$rootScope',
  function ($scope, $rootScope) {
    $scope.willkommen = 'Keine Charaktere geladen';
    $rootScope.$emit('changeDestination', { name: 'Charakteransicht' });
  }
]);
/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller.newCharController', []).controller('newCharCtrl', [
  '$scope',
  '$rootScope',
  function ($scope, $rootScope) {
	  $rootScope.$emit('changeDestination', { name: 'Neuer Charakter' });
  }
]);
/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller.sidenavController', []).controller('sidenavCtrl', [
  '$scope',
  '$rootScope',
  function ($scope, $rootScope) {
    var buttons = [
      {href: '#new', bezeichnung: 'Neu'},
      {href: '#laden', bezeichnung: 'Laden'},
      {href: '#edit', bezeichnung: 'Charakter ändern'},
      {href: '#experience', bezeichnung: 'Erfahrung einsetzen'},
      {href: '#import', bezeichnung: 'Import'},
      {href: '#export', bezeichnung: 'exports'},
      {href: '#einstellungen', bezeichnung: 'Einstellungen'}
    ];
    $scope.buttons = buttons;
  }
]);