/*
 * Berechnet verschiedene Dinge, z.B. abgeleitete Werte, Kampfwerte o.ä. 
 */
var math = require('mathjs'), 
	_ = require('lodash'),
	calculate = function(){
		var __replaceAttributes = function(attribute, attributArray){
			var newArray = [];
				_.each(attributArray, function(item,i){
					newArray.push(attributArray[item]);
				});
				return newArray;
			},
			abgeleiteteWerte = function(__charakter){
			var abgeleitet = {
				GK: 0,
				GSW: 0,
				INI: 0,
				LP: 0,
				FO: 0,
				VTD: 0,
				GW: 0,
				KW: 0
			};
			switch(__charakter.rasse.toLowerCase()){
				case 'varg': abgeleitet.GK = 6; break;
				case 'mensch':
				/* falls through */
				case 'alb': abgeleitet.GK = 5; break;
				case 'zwerg': abgeleitet.GK = 4; break;
				case 'gnom': abgeleitet.GK = 3; break;
				default: return false; 
			}
			abgeleitet.GSW = ( abgeleitet.GK + __charakter.attribute.BEW);
			abgeleitet.INI = ( 10 - __charakter.attribute.INT);
			abgeleitet.LP = ( abgeleitet.GK + __charakter.attribute.KON);
			abgeleitet.FO = ( 2 * ( __charakter.attribute.MYS + __charakter.attribute.WIL ) );
			abgeleitet.VTD = ( 12 + __charakter.attribute.BEW + __charakter.attribute.STA );
			abgeleitet.GW = ( 12 + __charakter.attribute.VER + __charakter.attribute.WIL );
			abgeleitet.KW = ( 12 + __charakter.attribute.KON + __charakter.attribute.WIL );
			
		},
			fertigkeitenBerechnen = function(__charakter){
				_.each(__charakter.fertigkeiten, function(item, i){
					var attribute = __replaceAttributes(__charakter.attribute, item.attr);
					__charakter.fertigkeiten[i].attr = attribute;
				});
		},
			waffenWerte = function(__charakter){
				_.each(__charakter.waffen, function(item, i){
					var attribute = __replaceAttributes(__charakter.attribute, item.attr);
					__charakter.waffen[i].attr = attribute;
				});
		};
		
		return {
			abgeleiteteWerte : abgeleiteteWerte,
			waffenWerte : waffenWerte,
			fertigkeitenBerechnen : fertigkeitenBerechnen
		};
	};
	
	module.exports = calculate();