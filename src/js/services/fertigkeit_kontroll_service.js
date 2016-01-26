/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.fertigkeitenKontrollService', [])
    .factory('$fertigkeitCtrlServ', function () {
            var fertigkeiten_array = [
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
                    ];
            var fertigkeiten_obj = {
               akrobatik: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'BEW',
                    'STA'
                    ]
                },
                alchemie: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'MYS',
                    'VER'
                    ]
                },
                anfuehren: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'AUS',
                    'WIL'
                    ]
                },
                arkaneKunde: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'MYS',
                    'VER'
                    ]
                },
                athletik: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'BEW',
                    'STA'
                    ]
                },
                darbietung: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'AUS',
                    'WIL'
                    ]
                },
                diplomatie: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'AUS',
                    'VER'
                    ]
                },
                edelhandwerk: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'INT',
                    'VER'
                    ]
                },
                empathie: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'INT',
                    'VER'
                    ]
                },
                entschlossenheit: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'AUS',
                    'WIL'
                    ]
                },
                fingerfertigkeit: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'AUS',
                    'BEW'
                    ]
                },
                geschichteUndMythen: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'MYS',
                    'VER'
                    ]
                },
                handwerk: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'KON',
                    'VER'
                    ]
                },
                heilkunde: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'INT',
                    'VER'
                    ]
                },
                heimlichkeit: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'BEW',
                    'INT'
                    ]
                },
                jagdkunst: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'KON',
                    'VER'
                    ]
                },
                laenderkunde: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'INT',
                    'VER'
                    ]
                },
                naturkunde: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'INT',
                    'VER'
                    ]
                },
                redegewandtheit: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'AUS',
                    'WIL'
                    ]
                },
                schloesserUndFallen: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'INT',
                    'BEW'
                    ]
                },
                schwimmen: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'STA',
                    'KON'
                    ]
                },
                seefahrt: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'BEW',
                    'KON'
                    ]
                },
                strassenkunde: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'AUS',
                    'INT'
                    ]
                },
                tierfuehrung: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'AUS',
                    'BEW'
                    ]
                },
                ueberleben: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'INT',
                    'KON'
                    ]
                },
                wahrnehmung: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'INT',
                    'WIL'
                    ]
                },
                zaehigkeit: {
                    wert: '',
                    punkte: '',
                    attr: [
                    'KON',
                    'WIL'
                    ]
                }
            },
            getFertigkeitenList = function(){ return fertigkeiten_array;},
            getFertigkeitenObjekteList = function(){ return fertigkeiten_obj;},
            getFertigkeit = function(bezeichnung){ return fertigkeiten_obj[bezeichnung];};
    
        return {
            getFertigkeitenList : getFertigkeitenList,
            getFertigkeitenObjekteList : getFertigkeitenObjekteList,
            getFertigkeit : getFertigkeitenList
        };          
                    
    }
);