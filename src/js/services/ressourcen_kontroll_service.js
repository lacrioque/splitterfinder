/* globals angular, console, window, q, _^, database */
angular.module('splitterfinder.services.ressourcenKontrollService', [])
    .factory('$ressourcenCtrlServ', function () {
    var ressourcenList = [
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
        ressourceObjList = {
         'ansehen': {
            wert: '',
            bedeutung: ''
          },
          'gefolge': {
            wert: '',
            bedeutung: ''
          },
          'kontakte': {
            wert: '',
            bedeutung: ''
          },
          'kreatur': {
            wert: '',
            bedeutung: ''
          },
          'mentor': {
            wert: '',
            bedeutung: ''
          },
          'rang': {
            wert: '',
            bedeutung: ''
          },
          'relikt': {
            wert: '',
            bedeutung: ''
          },
          'stand': {
            wert: '',
            bedeutung: ''
          },
          'vermoegen': {
            wert: '',
            bedeutung: ''
          },
          'zuflucht': {
            wert: '',
            bedeutung: ''
          }
        },
        getRessourcenList = function(){return ressourcenList;},
        getRessourceObjList = function(){return ressourceObjList;},
        getRessource = function(bezeichnung){ return ressourceObjList[bezeichnung];};
        
        return {
            getRessourcenList: getRessourcenList,
            getRessourceObjList : getRessourceObjList,
            getRessource: getRessource
        };
}]);