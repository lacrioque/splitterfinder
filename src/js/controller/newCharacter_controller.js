/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller.newCharController', []).controller('newCharCtrl', [
  '$scope',
  '$rootScope',
  function ($scope, $rootScope) {
	  $rootScope.$emit('changeDestination', { name: 'Neuer Charakter' });
  }
]);