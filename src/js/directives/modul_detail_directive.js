/*globals angular, console, window, q, _ */
angular.module('splitterfinder.directives.modulDetailDirective', []).controller('modulDetail', [
  function () {
      return {
          restrict: 'E',
          templateUrl: 'templates/modulDetail.tpl.html',
          require: '^ngModel',
          scope: {
              ngModel : '='
          },
          saveModule: function(){},
          deleteModule: function(){}
      }
  }
]);