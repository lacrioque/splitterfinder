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