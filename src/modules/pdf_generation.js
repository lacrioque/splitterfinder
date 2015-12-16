/*globals process, require*/
var pdfFiller   = require('pdffiller'),
	fs = require('fs-extra'),
	path = require('path'),
	q = require('q'),
	_ = require('lodash'),
	home = process.env.HOME || process.env.USERPROFILE,
	PDFCHARAKTERBOGEN = function(){
		var formFile = path.join(process.cwd(),'res', 'charakterbogen_raw.pdf'),
			destPDFPath = path.join(home,'splitterfinder'),
			fdfTemplate, temp, 
			checkDirectory = function(){
				try{
					var check = fs.statSync(destPDFPath);
				} catch (e){
					if(e.code === 'ENOENT'){
						fs.mkdirSync(destPDFPath);
					}
				}
				
			},
			getTemplate = function(){
				var def = q.defer();
				pdfFiller.generateFDFTemplate(formFile, null, function(err, formData){
					def.resolve(formData);
				});
				return def.promise;
			}, getFirstTwo = function(container){
				if(container.length > 2 || container.length == 2){
					return container.shift() + ", " + container.shift();
				} else if( container.length < 2 && container.length > 0) {
					return container.shift();
				} else {
					return "";
				}
			}, getMiddleTwo = function(container){
				if(container.length > 2){
					if(container.length >= 4){
						return container.splice(2,2);
					} else if(container.length == 3 ){
						return container.pop();
					} 
				}
				return "";
			}, getLastTwo = function(container){
				if(container.length > 4){
					if(container.length == 6){
						return container.pop() + ", " + container.pop();
					} else {
						return container.pop();
					}
				} else {
					return "";
				}
			},mapTemplate = function(data){
				var iterator = 1,
					map = {
					"Name": data.name,
					"Ausbildung": data.ausbildung,
					"Kultur": data.kultur,
					"Abstammung": data.abstammung,
					"Rasse": data.rasse,
					"Geschlecht": data.geschlecht,
					"Haarfarbe": data.haarfarbe,
					"Körpergröße": data.koerpergroesse,
					"Mondzeichen": data.mondzeichen,
					"Augenfarbe": data.augenfarbe,
					"Gewicht": data.gewicht,
					"Hautfarbe": data.hautfarbe,
					"Geburtsort": data.geburtsort,
					"Sprachen": data.sprachen.shift(),
					"Grad 1": "",
					"Grad 2": "",
					"Kulturkunde": data.kulturkunde.join(','),
					"Grad 4":"",
					"Splitterpunkte":"",
					"Sprachen_2":data.sprachen.splice(1,data.sprachen.length).join(','),
					"Schwächen_1":getFirstTwo(data.schwaechen),
					"Schwächen_2":getMiddleTwo(data.schwaechen),
					"Schwächen_3":getLastTwo(data.schwaechen),
					"EP_Gesamt":data.erfahrungspunkte.gesamt,
					"EP_eingesetzt":data.erfahrungspunkte.eingesetzt,
					
					"BEW_Start":"",
					"INT_Start":"",
					"KON_Start":"",
					"MYS_Start":"",
					"VER_Start":"",
					"STÄ_Start":"",
					"WIL_Start":"",
					"AUS_Start":"",
					"AUS_mod":"",
					"BEW_mod":"",
					"INT_mod":"",
					"KON_mod":"",
					"MYS_mod":"",
					"STÄ_mod":"",
					"VER_mod":"",
					"WIL_mod":"",
					
					"GK_Wert": data.abgeleitet.GK,
					"GK_mod":"",
					"GK_temp":"",
					"GSW_Wert": data.abgeleitet.GSW,
					"GSW_mod":"",
					"GSW_temp":"",
					"INI_Wert": data.abgeleitet.INI,
					"INI_mod":"",
					"INI_temp":"",
					"LP_Wert": data.abgeleitet.LP,
					"LP_mod":"",
					"LP_temp":"",
					"FO_Wert": data.abgeleitet.FO,
					"FO_mod":"",
					"FO_temp":"",
					"VTD_Wert": data.abgeleitet.VTD,
					"VTD_mod":"",
					"VTD_temp":"",
					"GW_Wert": data.abgeleitet.GW,
					"GW_mod":"",
					"KW_Wert": data.abgeleitet.KW,
					"KW_mod":"",
					"KW_temp":"",
					"BEW_Wert": data.attribute.BEW,
					"EP_offen": data.erfahrungspunkte.offen,
					
					"EP_für_nächsten_Heldengrad":"",
					"maximale Fertigkeitspunkte":"",
					"maximales Attribut":"",
					"Heldengrad":"",
					
					"STÄ_Wert": data.attribute.STA,
					"MYS_Wert": data.attribute.MYS,
					"VER_Wert": data.attribute.VER,
					"AUS_Wert": data.attribute.AUS,
					"WIL_Wert": data.attribute.WIL,
					"INT_Wert": data.attribute.INT,
					"KON_Wert": data.attribute.KON,
					
					"Akrobatik_Wert": data.fertigkeiten.akrobatik.wert,
					"Akrobatik_Punkte": data.fertigkeiten.akrobatik.punkte,
					"Akrobatik_mod":"",
					"Alchemie_Wert": data.fertigkeiten.alchemie.wert,
					"Alchemie_Punkte": data.fertigkeiten.alchemie.punkte,
					"Alchemie_mod":"",
					"Anführen_Wert": data.fertigkeiten.anfuehren.wert,
					"Anführen_Punkte": data.fertigkeiten.anfuehren.punkte,
					"Anführen_mod":"",
					"Arkane_Kunde_Wert": data.fertigkeiten.arkaneKunde.wert,
					"Arkane_Kunde_Punkte": data.fertigkeiten.arkaneKunde.punkte,
					"Arkane_Kunde_mod":"",
					"Athletik_Wert": data.fertigkeiten.athletik.wert,
					"Athletik_Punkte": data.fertigkeiten.athletik.punkte,
					"Athletik_mod": "",
					"Darbietung_Wert": data.fertigkeiten.darbietung.wert,
					"Darbietung_Punkte": data.fertigkeiten.darbietung.punkte,
					"Darbietung_mod":"",
					"Diplomatie_Wert": data.fertigkeiten.diplomatie.wert,
					"Diplomatie_Punkte": data.fertigkeiten.diplomatie.punkte,
					"Edelhandwerk_Wert":data.fertigkeiten.edelhandwerk.wert,
					"Edelhandwerk_Punkte": data.fertigkeiten.edelhandwerk.punkte,
					"Edelhandwerk_mod":"",
					"Diplomatie_mod":"",
					"Empathie_Wert": data.fertigkeiten.empathie.wert,
					"Empathie_Punkte": data.fertigkeiten.empathie.punkte,
					"Empathie_mod":"",
					"Entschlossenheit_Wert": data.fertigkeiten.entschlossenheit.wert,
					"Entschlossenheit_Punkte": data.fertigkeiten.entschlossenheit.punkte,
					"Entschlossenheit_mod":"",
					"Fingerfertigkeit_Wert": data.fertigkeiten.fingerfertigkeit.wert,
					"Fingerfertigkeit_Punkte": data.fertigkeiten.fingerfertigkeit.punkte,
					"Fingerfertigkeit_mod":"",
					"Geschichte&Mythen_Wert": data.fertigkeiten.geschichteUndMythen.wert,
					"Geschichte&Mythen_Punkte": data.fertigkeiten.geschichteUndMythen.punkte,
					"Geschichte&Mythen_mod":"",
					"Handwerk_Wert": data.fertigkeiten.handwerk.wert,
					"Handwerk_Punkte": data.fertigkeiten.handwerk.punkte,
					"Handwerk_mod":"",
					"Heilkunde_Wert": data.fertigkeiten.heilkunde.wert,
					"Heilkunde_Punkte": data.fertigkeiten.heilkunde.punkte,
					"Heilkunde_mod":"",
					"Heimlichkeit_Wert": data.fertigkeiten.heimlichkeit.wert,
					"Heimlichkeit_Punkte": data.fertigkeiten.heimlichkeit.punkte,
					"Heimlichkeit_mod":"",
					"Jagdkunst_Wert": data.fertigkeiten.jagdkunst.wert,
					"Jagdkunst_Punkte": data.fertigkeiten.jagdkunde.punkte,
					"Jagdkunst_mod":"",
					"Länderkunde_Wert": data.fertigkeiten.laenderkunde.wert,
					"Länderkunde_Punkte":  data.fertigkeiten.laenderkunde.punkte,
					"Länderkunde_mod":"",
					"Naturkunde_Wert": data.fertigkeiten.naturkunde.wert,
					"Naturkunde_Punkte": data.fertigkeiten.naturkunde.punkte,
					"Naturkunde_mod": "",
					"Redegewandtheit_Wert": data.fertigkeiten.redegewandtheid.wert,
					"Redegewandtheit_Punkte": data.fertigkeiten.redegewandtheit.punkte,
					"Redegewandtheit_mod":"",
					"Schlösser&Fallen_Wert":data.fertigkeiten.schloesserUndFallen.wert,
					"Schlösser&Fallen_Punkte":data.fertigkeiten.schloesserUndFallen.punkte,
					"Schlösser&Fallen_mod":"",
					"Schwimmen_Wert":data.fertigkeiten.schwimmen.wert,
					"Schwimmen_Punkte":data.fertigkeiten.schwimmen.punkte,
					"Schwimmen_mod":"",
					"Seefahrt_Wert":data.fertigkeiten.seefart.wert,
					"Seefahrt_Punkte":data.fertigkeiten.seefart.punkte,
					"Seefahrt_mod":"",
					"Straßenkunde_Wert":data.fertigkeiten.strassenkunde.wert,
					"Straßenkunde_Punkte":data.fertigkeiten.strassenkunde.punkte,
					"Straßenkunde_mod":"",
					"Tierführung_Wert":data.fertigkeiten.tierfuehrung.wert,
					"Tierführung_Punkte":data.fertigkeiten.tierfuehrung.punkte,
					"Tierführung_mod":"",
					"Überleben_Wert":data.fertigkeiten.ueberleben.wert,
					"Überleben_Punkte":data.fertigkeiten.ueberleben.punkte,
					"Überleben_mod":"",
					"Wahrnehmung_Wert":data.fertigkeiten.wahrnehmung.wert,
					"Wahrnehmung_Punkte":data.fertigkeiten.wahrnehmung.punkte,
					"Wahrnehmung_mod":"",
					"Zähigkeit_Wert":data.fertigkeiten.zaehigkeit.wert,
					"Zähigkeit_Punkte":data.fertigkeiten.zaehigkeit.punkte,
					"Zähigkeit_mod":"",
					
					"M.0.0":"",
					"M.0.1":"",
					"M.0.2":"",
					"M.1.0":"",
					"M.1.1":"",
					"M.1.2":"",
					"M.2.0":"",
					"M.2.1":"",
					"M.2.2":"",
					"M.3.0":"",
					"M.3.1":"",
					"M.3.2":"",
					"M.4.0":"",
					"M.4.1":"",
					"M.4.2":"",
					"M.5.0":"",
					"M.5.1":"",
					"M.5.2":"",
					"M.6.0":"",
					"M.6.1":"",
					"M.6.2":"",
					"M.7.0":"",
					"M.7.1":"",
					"M.7.2":"",
					"M.8.0":"",
					"M.8.1":"",
					"M.8.2":"",
					"M.9.0":"",
					"M.9.1":"",
					"M.9.2":"",
					"M.10.0":"",
					"M.10.1":"",
					"M.10.2":"",
					"M.11.0":"",
					"M.11.1":"",
					"M.11.2":"",
					"M.12.0":"",
					"M.12.1":"",
					"M.12.2":"",
					"M.13.0":"",
					"M.13.1":"",
					"M.13.2":"",
					"M.14.0":"",
					"M.14.1":"",
					"M.14.2":"",
					"M":"",
					"N.0":"",
					"N.1":"",
					"N.2":"",
					"N.3":"",
					"N.4":"",
					"N.5":"",
					"N.6":"",
					"N.7":"",
					"N.8":"",
					"N.9":"",
					"N.10":"",
					"N.11":"",
					"N.12":"",
					"N.13":"",
					"N.14":"",
					"R.0.0":"",
					"R.0.1":"",
					"R.1.0":"",
					"R.1.1":"",
					"R.2.0":"",
					"R.2.1":"",
					"R.3.0":"",
					"R.3.1":"",
					"R.4.0":"",
					"R.4.1":"",
					"R.5.0":"",
					"R.5.1":"",
					"R.6.0":"",
					"R.6.1":"",
					"R.7.0":"",
					"R.7.1":"",
					"R.8.0":"",
					"R.8.1":"",
					"R.9.0":"",
					"R.9.1":"",
					"R":"",
					
					"Handgemenge_Punkte": data.kampffertigkeiten.handgemenge,
					"Hiebwaffen_Punkte":data.kampffertigkeiten.hiebwaffen,
					"Kettenwaffen_Punkte":data.kampffertigkeiten.kettenwaffen,
					"Klingenwaffen_Punkte":data.kampffertigkeiten.klingenwaffen,
					"Stangenwaffen_Punkte":data.kampffertigkeiten.stangenwaffen,
					"Schusswaffen_Punkte":data.kampffertigkeiten.schusswaffen,
					"Wurfwaffen_Punkte":data.kampffertigkeiten.wurfwaffen,

					"Waffenlos_Fertigkeit":data.waffen.waffenlos.fertigkeit,
					"Waffenlos_mod": "",
					"Waffenlos_Wert":data.waffen.waffenlos.wert,
					"Waffenlos_WGS":data.waffen.waffenlos.wgs,
					"Waffenlos_Schaden":data.waffen.waffenlos.hit,
					
					"Kampfmeisterschaft.0":"",
					"Kampfmeisterschaft.1":"",
					"Kampfmeisterschaft.2":"",
					"Kampfmeisterschaft.3":"",
					"Wirkung_3.0":"",
					"Wirkung_3.1":"",
					"Wirkung_3.2":"",
					"Wirkung_3.3":"",
					"Schw_2.0":"",
					"Schw_2.1":"",
					"Schw_2.2":"",
					"Schw_2.3":"",
					"Fertigk_2.0":"",
					"Fertigk_2.1":"",
					"Fertigk_2.2":"",
					"Fertigk_2.3":"",
					"Wirkung_2.0":"",
					"Wirkung_2.1":"",
					"Wirkung_2.2":"",
					"Wirkung_2.3":"",
					"Kampfmeisterschaft_2.0":"",
					"Kampfmeisterschaft_2.1":"",
					"Kampfmeisterschaft_2.2":"",
					"Kampfmeisterschaft_2.3":"",
					"Schw_3.0":"",
					"Schw_3.1":"",
					"Schw_3.2":"",
					"Schw_3.3":"",
					"Fertigk_3.0":"",
					"Fertigk_3.1":"",
					"Fertigk_3.2":"",
					"Fertigk_3.3":"",
					
					"Atemholen_benutzt":"",
					
					"Lunare":"",
					"Kupfer":"",
					"Vermögen_4":"",
					"Vermögen_5":"",
					"Solare":"",
					
					"GW_temp":""
				},
				 maxWaffe = 4,
				 maxZauber = 8,
				 maxStaerken = 9,
				 maxAusruestung = 9,
				 maxRuestung = 4,
				 maxMagieschule = 6;
				  
				//Über Waffen iterieren 
			iterator = 1;
				_.each(data.waffen, function(item,i){
					if(i === "waffenlos"){return true;}
					if(iterator>maxWaffe){return true;}
					map["Waffe_"+iterator+"_Wert"] = (item.fertigkeit + item.attr[0] + item.attr[1]);
					map["Waffe_"+iterator+"_Fertigkeit"] = item.fertigkeit;
					map["Waffe_"+iterator+"_Att1"] = item.attr[0];
					map["Waffe_"+iterator+"_Att2"] = item.attr[1];
					map["Waffe_"+iterator+"_mod"] = "";
					map["Waffe_"+iterator+"_WGS"] = item.wgs;
					map["Waffe_"+iterator+"_Schaden"] = item.hit;
					map["Waffe_"+iterator+"_Merkmale"] = item.merkmale;
					iterator++
				});
				if(iterator<maxWaffe){
					for(;iterator<=maxWaffe;iterator++){
						map["Waffe_"+iterator+"_Wert"] = "";
						map["Waffe_"+iterator+"_Fertigkeit"] = "";
						map["Waffe_"+iterator+"_Att1"] = "";
						map["Waffe_"+iterator+"_Att2"] = "";
						map["Waffe_"+iterator+"_mod"] = "";
						map["Waffe_"+iterator+"_WGS"] = "";
						map["Waffe_"+iterator+"_Schaden"] = "";
						map["Waffe_"+iterator+"_Merkmale"] = "";
					}
				}
				// Schild einfügen
				if(_.size(data.schild) > 0 ){
					map["Schild"] =  data.schild.name;
					map["Schild_Wert"] = data.schild.name;
					map["Schild_Fertigkeit"] =  data.schild.fertigkeit;
					map["Schild_mod"] = "";
					map["Schild_VTD+"] = data.schild.vtd_plus;
					map["Schild_Merkmale"] = data.schild.merkmale;
				}
				//Magieschulen
				iterator = 1;
				_.each(data.magieschulen, function(item,i){
					map["Magieschule_"+iterator] = i;
					map["Magieschule_"+iterator+"_Wert"] = item.wert;
					map["Magieschule_"+iterator+"_Punkte"] = item.punkte;
					map["Magieschule_"+iterator+"_Att1"] = item.attr[0];
					map["Magieschule_"+iterator+"_Att2"] = item.attr[1];
					map["Magieschule_"+iterator+"_mod"] = "";
				});
				if(iterator<maxMagieschule){
					for(;iterator<=maxMagieschule;iterator++){
						map["Magieschule_"+iterator] = i;
						map["Magieschule_"+iterator+"_Wert"] = "";
						map["Magieschule_"+iterator+"_Punkte"] = "";
						map["Magieschule_"+iterator+"_Att1"] = "";
						map["Magieschule_"+iterator+"_Att2"] = "";
						map["Magieschule_"+iterator+"_mod"] = "";
				}
				
				//Staerken
				iterator=1;
				_.each(data.staerken, function(item,i){
					map["StärkenRow"+iterator] = i;
					map["WirkungRow"+iterator] = item.wirkung;
				});
				if(iterator<maxStaerken){
					for(;iterator<=maxStaerken;iterator++){
					map["StärkenRow"+iterator] = "";
					map["WirkungRow"+iterator] = "";
				}
			//Ausruestung
				var ausruestung_9 = _.clone(data.ausruestung, true);
				//Die ersten neun
				iterator=1;
				_.each(ausruestung_9, function(item,i){
					map["AusrüstungRow"+iterator] = i;
					map["LastRow"+iterator] = item.last;
					delete(ausruestung_9[i]);
				});
				if(iterator<maxAusruestung){
					for(;iterator<=maxAusruestung;iterator++){
					map["StärkenRow"+iterator] = "";
					map["WirkungRow"+iterator] = "";
				}
				//die anderen neun
				iterator=1;
				_.each(ausruestung_9, function(item,i){
					map["AusrüstungRow"+iterator+"_2"] = i;
					map["LastRow"+iterator+"_2"] = item.last;
				});
				if(iterator<maxAusruestung){
					for(;iterator<=maxAusruestung;iterator++){
					map["StärkenRow"+iterator+"_2"] = "";
					map["WirkungRow"+iterator+"_2"] = "";
				}
				//Rüstungen
				iterator = 1;
				var ruestung_gesamt_vtd = 0,
					ruestung_gesamt_sr = 0,
					ruestung_gesamt_ticks = 0,
					ruestung_gesamt_beh = 0;
				_.each(data.ruestung, function(item,i){
					map["RüstungenRow"+iterator] = i;
					map["VTDRow"+iterator] = item.vtd_plus;
					map["SRRow"+iterator] = item.sr;
					map["BehRow"+iterator] = item.beh;
					map["TickRow"+iterator] = item.tick_plus;
				});
				if(iterator<maxRuestung){
					for(;iterator<=maxRuestung;iterator++){
					map["RüstungenRow"+iterator] = "";
					map["VTDRow"+iterator] = "";
					map["SRRow"+iterator] = "";
					map["BehRow"+iterator] = "";
					map["TickRow"+iterator] = "";
				}
			}
			
/*							
					"MerkmaleSTÄ":"",
					
					"RüstungenRow1": __getColumnOfRow(0,0,data.ruestung),
					"VTDRow1": __getColumnOfRow(0,1,data.ruestung),
					"SRRow1": __getColumnOfRow(0,2,data.ruestung),
					"BehRow1": __getColumnOfRow(0,3,data.ruestung),
					"TickRow1": __getColumnOfRow(0,4,data.ruestung),
					"RüstungenRow2": __getColumnOfRow(1,0,data.ruestung),
					"VTDRow2": __getColumnOfRow(1,1,data.ruestung),
					"SRRow2": __getColumnOfRow(1,2,data.ruestung),
					"BehRow2": __getColumnOfRow(1,3,data.ruestung),
					"TickRow2": __getColumnOfRow(1,4,data.ruestung),
					"RüstungenRow3": __getColumnOfRow(2,0,data.ruestung),
					"VTDRow3": __getColumnOfRow(2,1,data.ruestung),
					"SRRow3": __getColumnOfRow(2,2,data.ruestung),
					"BehRow3": __getColumnOfRow(2,3,data.ruestung),
					"TickRow3": __getColumnOfRow(2,4,data.ruestung),
					"RüstungenRow4": __getColumnOfRow(3,0,data.ruestung),
					"VTDRow4": __getColumnOfRow(3,1,data.ruestung),
					"SRRow4": __getColumnOfRow(3,2,data.ruestung),
					"BehRow4": __getColumnOfRow(3,3,data.ruestung),
					"TickRow4": __getColumnOfRow(3,4,data.ruestung),
					
					"VTDSumme": __getSumOfColumn(1,data.ruestung),
					"SRSumme": __getSumOfColumn(2,data.ruestung),
					"BehSumme": __getSumOfColumn(3,data.ruestung),
					"TickSumme": __getSumOfColumn(4,data.ruestung),
					/*
					"ZauberRow1":"",
					"SchuleRow1":"",
					"GradRow1":"",
					"SchwRow1":"",
					"FokusRow1":"",
					"ZDRow1":"",
					"RWRow1":"",
					"WDRow1":"",
					"VerstärkungRow1":"",
					"SeiteRow1":"",
					"Kan PktRow1":"",
					"ZauberRow2":"",
					"SchuleRow2":"",
					"GradRow2":"",
					"SchwRow2":"",
					"FokusRow2":"",
					"ZDRow2":"",
					"RWRow2":"",
					"WDRow2":"",
					"VerstärkungRow2":"",
					"SeiteRow2":"",
					"Kan PktRow2":"",
					"ZauberRow3":"",
					"SchuleRow3":"",
					"GradRow3":"",
					"SchwRow3":"",
					"FokusRow3":"",
					"ZDRow3":"",
					"RWRow3":"",
					"WDRow3":"",
					"VerstärkungRow3":"",
					"SeiteRow3":"",
					"Kan PktRow3":"",
					"ZauberRow4":"",
					"SchuleRow4":"",
					"GradRow4":"",
					"SchwRow4":"",
					"FokusRow4":"",
					"ZDRow4":"",
					"RWRow4":"",
					"WDRow4":"",
					"VerstärkungRow4":"",
					"SeiteRow4":"",
					"Kan PktRow4":"",
					"ZauberRow5":"",
					"SchuleRow5":"",
					"GradRow5":"",
					"SchwRow5":"",
					"FokusRow5":"",
					"ZDRow5":"",
					"RWRow5":"",
					"WDRow5":"",
					"VerstärkungRow5":"",
					"SeiteRow5":"",
					"Kan PktRow5":"",
					"ZauberRow6":"",
					"SchuleRow6":"",
					"GradRow6":"",
					"SchwRow6":"",
					"FokusRow6":"",
					"ZDRow6":"",
					"RWRow6":"",
					"WDRow6":"",
					"VerstärkungRow6":"",
					"SeiteRow6":"",
					"Kan PktRow6":"",
					"ZauberRow7":"",
					"SchuleRow7":"",
					"GradRow7":"",
					"SchwRow7":"",
					"FokusRow7":"",
					"ZDRow7":"",
					"RWRow7":"",
					"WDRow7":"",
					"VerstärkungRow7":"",
					"SeiteRow7":"",
					"Kan PktRow7":"",
					"ZauberRow8":"",
					"SchuleRow8":"",
					"GradRow8":"",
					"SchwRow8":"",
					"FokusRow8":"",
					"ZDRow8":"",
					"RWRow8":"",
					"WDRow8":"",
					"VerstärkungRow8":"",
					"SeiteRow8":"",
					"Kan PktRow8":"",
					"ZauberRow9":"",
					"SchuleRow9":"",
					"GradRow9":"",
					"SchwRow9":"",
					"FokusRow9":"",
					"ZDRow9":"",
					"RWRow9":"",
					"WDRow9":"",
					"VerstärkungRow9":"",
					"SeiteRow9":"",
					"Kan PktRow9":"",
					"ZauberRow10":"",
					"SchuleRow10":"",
					"GradRow10":"",
					"SchwRow10":"",
					"FokusRow10":"",
					"ZDRow10":"",
					"RWRow10":"",
					"WDRow10":"",
					"VerstärkungRow10":"",
					"SeiteRow10":"",
					"Kan PktRow10":"",
					"ZauberRow11":"",
					"SchuleRow11":"",
					"GradRow11":"",
					"SchwRow11":"",
					"FokusRow11":"",
					"ZDRow11":"",
					"RWRow11":"",
					"WDRow11":"",
					"VerstärkungRow11":"",
					"SeiteRow11":"",
					"Kan PktRow11":"",
					"ZauberRow12":"",
					"SchuleRow12":"",
					"GradRow12":"",
					"SchwRow12":"",
					"FokusRow12":"",
					"ZDRow12":"",
					"RWRow12":"",
					"WDRow12":"",
					"VerstärkungRow12":"",
					"SeiteRow12":"",
					"Kan PktRow12":"",
					"ZauberRow13":"",
					"SchuleRow13":"",
					"GradRow13":"",
					"SchwRow13":"",
					"FokusRow13":"",
					"ZDRow13":"",
					"RWRow13":"",
					"WDRow13":"",
					"VerstärkungRow13":"",
					"SeiteRow13":"",
					"Kan PktRow13":"",
					"ZauberRow14":"",
					"SchuleRow14":"",
					"GradRow14":"",
					"SchwRow14":"",
					"FokusRow14":"",
					"ZDRow14":"",
					"RWRow14":"",
					"WDRow14":"",
					"VerstärkungRow14":"",
					"SeiteRow14":"",
					"Kan PktRow14":"",
					"ZauberRow15":"",
					"SchuleRow15":"",
					"GradRow15":"",
					"SchwRow15":"",
					"FokusRow15":"",
					"ZDRow15":"",
					"RWRow15":"",
					"WDRow15":"",
					"VerstärkungRow15":"",
					"SeiteRow15":"",
					"Kan PktRow15":"",
					*/
				
			}, writeData = function(data, name){
				var destFile = path.join(destPDFPath, 'Splittermond_Charakterbogen_'+name+'.pdf');
				pdfFiller.fillForm(formFile, destFile, data, function(err){});
			};

		checkDirectory();
		
		return{
			getTemplate : getTemplate,
			mapTemplate : mapTemplate,
			writeData : writeData
		}
	};
	
module.exports = PDFCHARAKTERBOGEN();