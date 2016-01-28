/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.charakterPlanService', [])
.factory('$charPlanServ', [
    '$fertigkeitCtrlServ',
    '$ressourcenCtrlServ',
    function (
        $fertigkeitCtrlServ,
        $ressourcenCtrlServ
    ) {
    var fieldList = {
            fertigkeiten: [],
            ressourcen: [],
            kampffertigkeiten: [],
        },
        metaFieldList = [
            'fertigkeiten',
            'ressourcen',
            'kampffertigkeiten',
            'staerken',
            'zauberschulen',
            'zauber'
        ],
        getFields = function(){return fieldList;},
        getMetaFields = function(){ return metaFieldList;},
        /* @todo Feldvalidaton programmieren */
        checkFieldValid = function(field){return true;},
        checkMetaFieldValid = function(metaField){},
        translateMetaToSelect = function(metaFromModule){},
        getFieldsFromType = function(type){};
        
        return {
            getFields : getFields,
            getMetaFields : getMetaFields,
            checkFieldValid : checkFieldValid,
            checkMetaFieldValid : checkMetaFieldValid,
            translateMetaToSelect : translateMetaToSelect,
            getFieldsFromType : getFieldsFromType
        };
}]);