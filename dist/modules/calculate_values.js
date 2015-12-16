/*
 * Berechnet verschiedene Dinge, z.B. abgeleitete Werte, Kampfwerte o.ä. 
 */
var math = require('mathjs'), 
	calculate = function(){
		var abgeleiteteWerte = function(__charakter){
			var abgeleitet = {
				GK: '',
				GSW: '',
				INI: '',
				LP: '',
				FO: '',
				VTD: '',
				GW: '',
				KW: ''
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
			waffenWerte = function(__charakter){
		},
			temporary = null;
		return {
			abgeleiteteWerte : abgeleiteteWerte,
			waffenWerte : waffenWerte
		};
	};
	