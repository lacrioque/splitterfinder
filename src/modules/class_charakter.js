/**
 * Definiert ein CharakterObjekt
 * aus diesem kann man nachher den CharakterBogen befüllen
 * 
 */

var CHARAKTER = function(charakter_objekt){
	var __charakter = {
		id: '',
		'name': '',
		ausbildung: '',
		kultur: '',
		rasse: '',
		abstammung: '',
		geschlecht: '',
		haarfarbe: '',
		augenfarbe: '',
		hautfarbe: '',
		koerpergroesse: '',
		gewicht: '',
		geburtsort: '',
		schwaechen: [],
		sprachen: ['Basargnomisch'],
		kulturkunde: [],
		mondzeichen: '',
		splitterpunkte: '',
		heldengrad: '',
		erfahrungspunkte: {
			gesamt: '',
			eignesetzt: '',
			offen: ''
		},
		attribute: {
			AUS : '',
			BEW : '',
			INT : '',
			KON : '',
			MYS : '',
			STA : '',
			VER : '',
			WIL : ''
		},
		abgeleitet: {
			GK : '',
			GSW : '',
			INI : '',
			LP : '',
			FO : '',
			VTD : '',
			GW : '',
			KW : ''
		},
		fertigkeiten: {
			akrobatik : { wert: '', attr: ['BEW','STA'] },
			alchemie : { wert: '', attr: ['MYS','VER'] },
			anfuehren : { wert: '', attr: ['AUS','WIL'] },
			arkaneKunde : { wert: '', attr: ['MYS','VER'] },
			athletik : { wert: '', attr: ['BEW','STA'] },
			darbietung : { wert: '', attr: ['AUS','WIL'] },
			diplomatie: { wert: '', attr: ['AUS','VER'] },
			edelhandwerk : { wert: '', attr: ['INT','VER'] },
			empathie : { wert: '', attr: ['INT','VER'] },
			entschlossenheit : { wert: '', attr: ['AUS','WIL'] },
			fingerfertigkeit : { wert: '', attr: ['AUS','BEW'] },
			geschichteUndMythen : { wert: '', attr: ['MYS','VER'] },
			handwerk : { wert: '', attr: ['KON','VER'] },
			heilkunde : { wert: '', attr: ['INT','VER'] },
			heimlichkeit : { wert: '', attr: ['BEW','INT'] },
			jagdkunst : { wert: '', attr: ['KON','VER'] },
			laenderkunde : { wert: '', attr: ['INT','VER'] },
			naturkunde : { wert: '', attr: ['INT','VER'] },
			redegewandtheit : { wert: '', attr: ['AUS','WIL'] },
			schloesserUndFallen : { wert: '', attr: ['INT','BEW'] },
			schwimmen : { wert: '', attr: ['STA','KON'] },
			seefahrt : { wert: '', attr: ['BEW','KON'] },
			strassenkunde : { wert: '', attr: ['AUS','INT'] },
			tierfuehrung : { wert: '', attr: ['AUS','BEW'] },
			Ueberleben : { wert: '', attr: ['INT','KON'] },
			wahrnehmung : { wert: '', attr: ['INT','WIL'] },
			zaehigkeit : { wert: '', attr: ['KON','WIL'] } 
		},
		meisterschaften: {},
		ressourcen: {
			'ansehen' : {wert: '', bedeutung: ''},
			'gefolge' : {wert: '', bedeutung: ''},
			'kontakte' : {wert: '', bedeutung: ''},
			'kreatur' : {wert: '', bedeutung: ''},
			'mentor' : {wert: '', bedeutung: ''},
			'rang' : {wert: '', bedeutung: ''},
			'relikt' : {wert: '', bedeutung: ''},
			'stand' : {wert: '', bedeutung: ''},
			'vermoegen' : {wert: '', bedeutung: ''},
			'zuflucht' : {wert: '', bedeutung: ''}
		},
		staerken: {},
		kampffertigkeiten: {
			handgemenge : '',
			hiebwaffen : '',
			lettenwaffen : '',
			llingenwaffen : '',
			stangenwaffen : '',
			schusswaffen : '',
			wurfwaffen : ''
		},
		waffen: {
			waffenlos : {wert: '', fertigkeit: '', attr:['BEW','STA'], WGS: '', hit: '', merkmale: ''}
		},
		schild: {},
		ruestung: {},
		lp : {
			unverletzt: '',
			angeschlagen: '',
			verletzt: '',
			schwer_verletzt: '',
			todgeweiht: ''
		},
		vermoegen: '',
		magieschulen : {},
		zauber: {}
	},
	getCharakterObjekt = function(secure){
		secure = secure || true;
		if(secure){
			return encrypt_my(__charakter);
		} else {
			return __charakter;
		} 
	},
	wertModifizieren = function(selector, wert ){
		var alter_wert;
		if(selector.isArray()){
			if(selector.length = 2){
				__charakter[selector[0]][selector[1]] = wert;
			} else if(selector.length = 3){
				__charakter[selector[0]][selector[1]][selector[2]] = wert;
			}
		} else {
			__charakter[selector] = wert;
		}
		__abgeleiteteWerteAusrechnen();
	},
	__abgeleiteteWerteAusrechnen = function(){
		
	}
	
	_.merge(__charakter, charakter_objekt);
	
	
};