/*globals angular, console, window, q, _ */
angular.module('splitterfinder.directives', ['splitterfinder.directives.modulDetailDirective']);
/*globals angular, console, window, q, _ */
angular.module('splitterfinder.directives.modulDetailDirective', []).controller('modulDetail', [
  '$moduleServ',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'templates/modulDetail.tpl.html',
      require: '^ngModel',
      scope: { ngModel: '=' },
      controller: [
        '$scope',
        '$moduleServ',
        '$mdToast',
        '$mdDialog',
        function ($scope, $moduleServ, $mdToast, $mdDialog) {
          $scope.saveModule = function () {
            var module = $scope.modul;
            $moduleServ.saveModule(module, module.id);
          };
          $scope.deleteModule = function () {
            var confirmDialog = $mdDialog.confirm().title('Wirklich löschen?').textContent('Wenn das Modul gelöscht wird kann es nicht mehr verwendet werden').ariaLabel('Löschen?').ok('Ja, löschen').cancel('Abbrechen');
            $mdDialog.show(confirmDialog).then(function () {
              $moduleServ.deleteModule(module, module.id, function (returner) {
                $mdToast.show($mdToast.simple().textContent('Gelöscht').position($scope.getToastPosition()).hideDelay(3000));
              }, function (error) {
                $mdToast.show($mdToast.simple().textContent('Es ist ein Fehler aufgetreten: ' + error).position($scope.getToastPosition()).hideDelay(3000));
              });
            }, function () {
              $mdToast.show($mdToast.simple().textContent('Abgebrochen').position($scope.getToastPosition()).hideDelay(3000));
            });
          };
        }
      ]
    };
  }
]);