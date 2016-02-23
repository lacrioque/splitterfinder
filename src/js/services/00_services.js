/*globals angular, console, window, q, _ */
"use strict";
angular.module('splitterfinder.services', [
	'splitterfinder.services.stubService',
	'splitterfinder.services.moduleService',
    'splitterfinder.services.fertigkeitenKontrollService',
    'splitterfinder.services.ressourcenKontrollService',
    'splitterfinder.services.zauberKontrollService',
    'splitterfinder.services.staerkenKontrollService',
	'splitterfinder.services.charakterPlanService',
	'splitterfinder.services.charakterViewService',
	'splitterfinder.services.charakterGenerationService',
	'splitterfinder.services.validateJSONInputService'
	]);