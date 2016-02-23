/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.charakterGenerationService', [])
.factory('$charGenServ', [
    '$charPlanServ',
    '$moduleServ',
    function($charPlanServ,$moduleServ){
        let modules;
        const
            _getAllModule = function(){
                $moduleServ.
            },
            _filterByType = function(module,type){
                
            },
            setModulOnChar = function(modul,char){},
            getRasseModule = function(){},
            getAbstammungModule = function(){},
            getMondzeichen = function(){},
            getAusbildungModule = function(){},
            getKulturModul = function(){};
        
           _getAllModule();
        
        return {
            setModulOnChar : setModulOnChar,
            getRasseModule : getRasseModule,
            getAbstammungModule : getAbstammungModule,
            getMondzeichen : getMondzeichen,
            getAusbildungModule : getAusbildungModule,
            getKulturModul : getKulturModul
        }
    }
]);