/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.charakterPlanService', []).factory('$charPlanServ', function () {
    var fieldList = {
            fertigkeiten: [
                "akrobatik",
                "alchemie",
                "anfuehren",
                "arkaneKunde",
                "athletik",
                "darbietung",
                "diplomatie",
                "edelhandwerk",
                "empathie",
                "entschlossenheit",
                "fingerfertigkeit",
                "geschichteUndMythen",
                "handwerk",
                "heilkunde",
                "heimlichkeit",
                "jagdkunst",
                "laenderkunde",
                "naturkunde",
                "redegewandtheit",
                "schloesserUndFallen",
                "schwimmen",
                "seefahrt",
                "strassenkunde",
                "tierfuehrung",
                "ueberleben",
                "wahrnehmung",
                "zaehigkeit"
            ],
            ressourcen: [
                'ansehen',
                'gefolge',
                'kontakte',
                'kreatur',
                'mentor',
                'rang',
                'relikt',
                'stand',
                'vermoegen',
                'zuflucht'
            ],
            kampffertigkeiten: [
                "handgemenge", 
                "hiebwaffen", 
                "kettenwaffen", 
                "klingenwaffen", 
                "stangenwaffen", 
                "schusswaffen", 
                "wurfwaffen" 
            ],
        },
        metaFieldList = [
            'fertigkeiten',
            'ressourcen',
            'kampffertigkeiten',
            'staerken',
            'zauberschulen',
            'zauber'
        ],
        getFields = function(){},
        getMetaFields = function(){},
        checkFieldValid = function(field){},
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
});