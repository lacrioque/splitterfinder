/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller', [
  'splitterfinder.controller.mainController',
  'splitterfinder.controller.mainViewController',
  'splitterfinder.controller.sidenavController',
  'splitterfinder.controller.newCharController',
  'splitterfinder.controller.adminController'
]);
/*globals angular, console, window, q, _ */
angular.module('splitterfinder.controller.adminController', []).controller('adminCtrl', [
  '$scope',
  '$rootScope',
  '$moduleServ',
  '$validateJSON',
  function ($scope, $rootScope, $moduleServ, $validateJSON) {
    var module = {}, checkValid = $validateJSON.getProcess({
        validClasses: 'mdi-green mdi-verified',
        invalidClasses: 'mdi-red mdi-shield'
      }), moduleListe = {};
    //$moduleServ.getModuleList();
    console.log($moduleServ);
    _.each(module, function (item, i) {
      $moduleServ.getModule(item.bezeichnung).then(function (modul) {
        module[modul.name] = modul;
      });
    });
    $scope.newModule = {
      stringContent: '{name: usw...}',
      toJSON: function () {
        return JSON.parse(stringContent);
      }
    };
    $rootScope.$emit('changeDestination', { name: 'Administration' });
    $scope.checkValid = checkValid;
    $scope.validateInput = function () {
      checkValid.validate($scope.newModule.stringContent);
    };
    $scope.addFeld = function () {
    };
    $scope.addMetafeld = function () {
    };
    $scope.saveModul = function () {
    };
  }
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
      {
        href: '#new',
        bezeichnung: 'Neu'
      },
      {
        href: '#laden',
        bezeichnung: 'Laden'
      },
      {
        href: '#edit',
        bezeichnung: 'Charakter ändern'
      },
      {
        href: '#admin',
        bezeichnung: 'Administration'
      },
      {
        href: '#experience',
        bezeichnung: 'Erfahrung einsetzen'
      },
      {
        href: '#import',
        bezeichnung: 'Import'
      },
      {
        href: '#export',
        bezeichnung: 'exports'
      },
      {
        href: '#einstellungen',
        bezeichnung: 'Einstellungen'
      }
    ];
    $scope.buttons = buttons;
  }
]);