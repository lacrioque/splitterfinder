/*globals angular, console, window, q, _ */
angular.module('splitterfinder.services', ['splitterfinder.services.stubService']);
/*globals angular, console, window, q, _ */
angular.module('splitterfinder.services.stubService', []).factory('stubService', function () {
  return function () {
    console.log('stub');
  };
});