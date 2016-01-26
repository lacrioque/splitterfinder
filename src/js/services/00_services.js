/*globals angular, console, window, q, _ */
angular.module('splitterfinder.services', [
	'splitterfinder.services.stubService',
	'splitterfinder.services.moduleService',
    'splitterfinder.services.fertigkeitenKontrollService',
    'splitterfinder.services.ressourcenKontrollService',
    'splitterfinder.services.zauberKontrollService',
    'splitterfinder.services.staerkenKontrollService',
	'splitterfinder.services.charakterPlanService',
	'splitterfinder.services.validateJSONInputService'
	]);