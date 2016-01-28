/*globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.zauberKontrollService', [])
.factory('$zauberCtrlServ', function () {
    var zauberschulenListe = [
        'Bann',
        'Beherrschung',
        'Bewegung',
        'Erkenntnis',
        'Fels',
        'Feuer',
        'Heilung',
        'Illusion',
        'Kampf',
        'Licht',
        'Natur',
        'Schatten',
        'Schicksal',
        'Schutz',
        'Stärkung',
        'Tod',
        'Verwandlung',
        'Wasser',
        'Wind'
    ],
        zauberschulenObjListe = {
            'Bann' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'WIL']
            }
            'Beherrschung' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'WIL']
            }
            'Bewegung' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'BEW']
            }
            'Erkenntnis' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'VER']
            }
            'Fels' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'KON']
            }
            'Feuer' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'AUS']
            }
            'Heilung' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'AUS']
            }
            'Illusion' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'AUS']
            }
            'Kampf' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'STA']
            }
            'Licht' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'AUS']
            }
            'Natur' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'AUS']
            }
            'Schatten' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'INT']
            }
            'Schicksal' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'AUS']
            }
            'Schutz' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'AUS']
            }
            'Stärkung' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'STA']
            }
            'Tod' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'VER']
            }
            'Verwandlung' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'KON']
            }
            'Wasser' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'INT']
            }
            'Wind' : {
                wert: '',
                punkte: '',
                attr: ['MYS', 'VER']
            }
        },
        zauberListe = [],
        zauberObjListe = {},
        
        getZauberListe = function(){return zauberListe;},
        getZauberObjListe = function(){return zauberObjListe;},
        getZauber = function(bezeichnung){return zauberObjListe[bezeichnung]},
        getZauberschuleListe = function(){return zauberschulenListe;},
        getZauberschuleObjListe = function(){return zauberschulenObjListe;},
        getZauberschule = function(bezeichnung){return zauberschulenObjListe[bezeichnung]};
        
        
        return {
            getZauberListe : getZauberListe,
            getZauberObjListe : getZauberObjListe,
            getZauber : getZauber,
            getZauberschuleListe : getZauberschuleListe,
            getZauberschuleObjListe : getZauberschuleObjListe,
            getZauberschule : getZauberschule
        };
        
});

/*
Bann (MYS + WIL) das Bekämpfen anderer Zauber und magischer Wirkungen
Beherrschung (MYS + WIL) Kontrolle über den Geist eines anderen Wesens
Bewegung (MYS + BEW) magische Bewegung des eigenen oder eines anderen Körpers oder Objekts
Erkenntnis (MYS + VER) Hellseherei, Gedankenlesen und Verständigung
Fels (MYS + KON) Kontrolle über Felsen, Steine und Erde
Feuer (MYS + AUS) Kontrolle über Feuer und Hitze
Heilung (MYS + AUS) magische Heilung, Erholung und Wachstum
Illusion (MYS + AUS) Beugen der Realität und Verwirren der Sinne
Kampf (MYS + STÄ) zerstörerische Magie zum Bekämpfen eines Gegners
Licht (MYS + AUS) Licht und Helligkeit, aber auch Segen und die Macht des Guten
Natur (MYS + AUS) Beeinflussen von Pflanzen, Tieren und Wildnis
Schatten (MYS + INT) Schatten und Dunkelheit, die Macht der Finsternis
Schicksal (MYS + AUS) Wahrsagerei, Segnungen, Flüche und das Erkennen von Bestimmungen
Schutz (MYS + AUS) Schutz vor Gefahren, Schaden und Zaubern
Stärkung (MYS + STÄ) die Stärkung und Verbesserung von Lebewesen
Tod (MYS + VER) Verfall, Vergänglichkeit, Geister und Untote
Verwandlung (MYS + KON) die Verwandlung des eigenen oder eines anderen Körpers
Wasser (MYS + INT) Kontrolle über Wasser, Kälte und Nebel
Wind (MYS + VER)
*/