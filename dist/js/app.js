/*globals angular, console, window, q, _ */
"use strict";
angular.module('splitterfinder', [
  'ngMaterial',
  'ngRoute',
  'ngMessages',
  'ngDraggable',
  'splitterfinder.controller',
  'splitterfinder.services'
]).config(function ($routeProvider, $locationProvider) {
  $routeProvider.when('/new', {
    templateUrl: 'templates/character_generation.tpl.html',
    controller: 'newCharCtrl'
  }).when('/admin', {
    templateUrl: 'templates/admin_view.tpl.html',
    controller: 'adminCtrl'
  }).otherwise({
    templateUrl: 'templates/main_view.tpl.html',
    controller: 'mainViewCtrl'
  });
}).config(function ($mdThemingProvider) {
  $mdThemingProvider.theme('default').primaryPalette('amber').accentPalette('deep-orange').warnPalette('red').backgroundPalette('amber');
}).run(function(){
    let nw = require('nw.gui');
    nw.Window.get().showDevTools();
});