/**
 * Definiert ein CharakterObjekt
 * aus diesem kann man nachher den CharakterBogen befüllen
 * 
 */
var sfcrypto = require('./encryption.js'), _ = require('lodash'), CHARAKTER = function (charakterObjekt) {
    charakterObjekt = charakterObjekt || {};
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
          AUS: '',
          BEW: '',
          INT: '',
          KON: '',
          MYS: '',
          STA: '',
          VER: '',
          WIL: ''
        },
        abgeleitet: {
          GK: '',
          GSW: '',
          INI: '',
          LP: '',
          FO: '',
          VTD: '',
          GW: '',
          KW: ''
        },
        fertigkeiten: {
          akrobatik: {
            wert: '',
            attr: [
              'BEW',
              'STA'
            ]
          },
          alchemie: {
            wert: '',
            attr: [
              'MYS',
              'VER'
            ]
          },
          anfuehren: {
            wert: '',
            attr: [
              'AUS',
              'WIL'
            ]
          },
          arkaneKunde: {
            wert: '',
            attr: [
              'MYS',
              'VER'
            ]
          },
          athletik: {
            wert: '',
            attr: [
              'BEW',
              'STA'
            ]
          },
          darbietung: {
            wert: '',
            attr: [
              'AUS',
              'WIL'
            ]
          },
          diplomatie: {
            wert: '',
            attr: [
              'AUS',
              'VER'
            ]
          },
          edelhandwerk: {
            wert: '',
            attr: [
              'INT',
              'VER'
            ]
          },
          empathie: {
            wert: '',
            attr: [
              'INT',
              'VER'
            ]
          },
          entschlossenheit: {
            wert: '',
            attr: [
              'AUS',
              'WIL'
            ]
          },
          fingerfertigkeit: {
            wert: '',
            attr: [
              'AUS',
              'BEW'
            ]
          },
          geschichteUndMythen: {
            wert: '',
            attr: [
              'MYS',
              'VER'
            ]
          },
          handwerk: {
            wert: '',
            attr: [
              'KON',
              'VER'
            ]
          },
          heilkunde: {
            wert: '',
            attr: [
              'INT',
              'VER'
            ]
          },
          heimlichkeit: {
            wert: '',
            attr: [
              'BEW',
              'INT'
            ]
          },
          jagdkunst: {
            wert: '',
            attr: [
              'KON',
              'VER'
            ]
          },
          laenderkunde: {
            wert: '',
            attr: [
              'INT',
              'VER'
            ]
          },
          naturkunde: {
            wert: '',
            attr: [
              'INT',
              'VER'
            ]
          },
          redegewandtheit: {
            wert: '',
            attr: [
              'AUS',
              'WIL'
            ]
          },
          schloesserUndFallen: {
            wert: '',
            attr: [
              'INT',
              'BEW'
            ]
          },
          schwimmen: {
            wert: '',
            attr: [
              'STA',
              'KON'
            ]
          },
          seefahrt: {
            wert: '',
            attr: [
              'BEW',
              'KON'
            ]
          },
          strassenkunde: {
            wert: '',
            attr: [
              'AUS',
              'INT'
            ]
          },
          tierfuehrung: {
            wert: '',
            attr: [
              'AUS',
              'BEW'
            ]
          },
          Ueberleben: {
            wert: '',
            attr: [
              'INT',
              'KON'
            ]
          },
          wahrnehmung: {
            wert: '',
            attr: [
              'INT',
              'WIL'
            ]
          },
          zaehigkeit: {
            wert: '',
            attr: [
              'KON',
              'WIL'
            ]
          }
        },
        meisterschaften: {},
        ressourcen: {
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
        staerken: {},
        kampffertigkeiten: {
          handgemenge: '',
          hiebwaffen: '',
          kettenwaffen: '',
          klingenwaffen: '',
          stangenwaffen: '',
          schusswaffen: '',
          wurfwaffen: ''
        },
        waffen: {
          waffenlos: {
            wert: '',
            fertigkeit: '',
            attr: [
              'BEW',
              'STA'
            ],
            WGS: '',
            hit: '',
            merkmale: ''
          }
        },
        schild: {},
        ruestung: {},
        lp: {
          unverletzt: '',
          angeschlagen: '',
          verletzt: '',
          schwer_verletzt: '',
          todgeweiht: ''
        },
        vermoegen: '',
        magieschulen: {},
        zauber: {},
        meta: {},
        extra: {}
      },
      //PRIVATE METHODEN
      __abgeleiteteWerteAusrechnen = function () {
      }, __setCharakterObjekt = function (charakterObjekt) {
        _.merge(__charakter, charakterObjekt);
      },
      // ÖFFENTLICHE METHODEN
      /**
	 * holt das ganze CharakterObjekt
	 * VORSICHT! 
	 * Wenn der secure parameter nicht ausdrücklich ausgeschaltet wird, 
	 * ist das resultierende Objekt verschlüsselt 
	 * 
	 */
      getCharakterObjekt = function (secure) {
        secure = secure || true;
        if (secure) {
          return sfcrypto.encrypt(__charakter);
        } else {
          return __charakter;
        }
      },
      /**
	 * modifizierte einen Wert 
	 * der selector parameter ist entweder eine array, oder ein string.
	 * Als array muss der verlauf von meta zu detail auf dem Charakter korrekt sein.
	 * z.B. ['waffen', 'schwert', 'WGS']
	 * @param selector -> entweder array, oder string
	 * @param wert -> der neue Wert 
	 */
      wertModifizieren = function (selector, wert) {
        if (selector.isArray()) {
          if (selector.length = 2) {
            if (__charakter[selector[0]][selector[1]] === undefined) {
              return {
                error: 'SelectorError',
                desc: 'Dieser Selektor existiert nicht'
              };
            }
            __charakter[selector[0]][selector[1]] = wert;
          } else if (selector.length = 3) {
            if (__charakter[selector[0]][selector[1]][selector[2]] === undefined) {
              return {
                error: 'SelectorError',
                desc: 'Dieser Selektor existiert nicht'
              };
            }
            __charakter[selector[0]][selector[1]][selector[2]] = wert;
          }
        } else {
          if (__charakter[selector] === undefined) {
            return {
              error: 'SelectorError',
              desc: 'Dieser Selektor existiert nicht'
            };
          }
          __charakter[selector] = wert;
        }
        __abgeleiteteWerteAusrechnen();
      },
      /**
	 * Erwartet einen Namen und ein Objekt in der form:
	 *  fertigkeit: , attr: [], wgs: , hit: , merkmale: 
	 * 
	 */
      waffeHinzufuegen = function (name, waffeObjekt) {
        if (_.size(waffeObjekt) !== 5) {
          return {
            error: 'TypeError',
            desc: 'Nicht genug/zu viele Einträge'
          };
        }
        __charakter.waffen[name] = waffeObjekt;
      },
      /**
	 * Erwartet einen Namen und ein Objekt in der form:
	 *  vtd_plus: , sr: , beh: , tick_plus:
	 * 
	 */
      ruestungHinzufuegen = function (name, ruestungObjekt) {
        if (_.size(ruestungObjekt) !== 4) {
          return {
            error: 'TypeError',
            desc: 'Nicht genug/zu viele Einträge'
          };
        }
        __charakter.ruestung[name] = ruestungObjekt;
      },
      /**
	 * Erwartet einen Namen und ein Objekt in der form:
	 *  fertigkeit: , vtd_plus: ,  merkmale: 
	 * 
	 */
      schildHinzufuegen = function (name, schildObjekt) {
        if (_.size(schildObjekt) !== 3) {
          return {
            error: 'TypeError',
            desc: 'Nicht genug/zu viele Einträge'
          };
        }
        __charakter.schild[name] = schildObjekt;
      },
      /**
	 * Erwartet einen Namen und ein Objekt in der form:
	 * schule: , grad:, schw: , fokus: ,zd: , rw: , wd: , verstaerkung: , seite: 
	 * 
	 */
      zauberHinzufuegen = function (name, zauberObjekt) {
        if (_.size(zauberObjekt) !== 9) {
          return {
            error: 'TypeError',
            desc: 'Nicht genug/zu viele Einträge'
          };
        }
        __charakter.zauber[name] = zauberObjekt;
      },
      /**
	 * Erwartet einen Namen und ein Objekt in der form:
	 * schwelle: , fertigk:, wirkung:
	 */
      staerkenHinzufuegen = function (name, staerkeObjekt) {
        if (_.size(staerkeObjekt) !== 3) {
          return {
            error: 'TypeError',
            desc: 'Nicht genug/zu viele Einträge'
          };
        }
        __charakter.staerken[name] = staerkeObjekt;
      },
      /**
	 * Gibt Metainformationen über den Cahrakter aus
	 */
      getMeta = function () {
        return __charakter.meta;
      },
      /**
	 * Speichert Metainformationen über den Charakter
	 */
      setMeta = function (metaObj) {
        __charakter.meta = _.merge(__charakter.meta, metaObj);
      },
      /**
	 * importiert einen Charakter aus einer secureID, oder aus einem Objekt.
	 * VORSICHT!
	 * Wenn secure nicht ausdrücklich ausgeschaltet wird erwartet die methode einen hexcodierten string
	 */
      importCharakter = function (charakterInput, secure) {
        secure = secure || true;
        var charakterObjekt;
        if (secure) {
          if (typeof charakterObjekt !== 'string') {
            return {
              error: 'TypeError',
              desc: 'Erwartet wurde ein HexString'
            };
          }
          charakterObjekt = sfcrypto.decrypt(charakterInput);
        }
        if (typeof charakterObjekt !== 'object') {
          return {
            error: 'TypeError',
            desc: 'Erwartet wurde ein charakterObjekt'
          };
        }
        charakterObjekt = charakterInput;
        __setCharakterObjekt(charakterObjekt);
      };
    return {
      getCharakterObjekt: getCharakterObjekt,
      wertModifizieren: wertModifizieren,
      waffeHinzufuegen: waffeHinzufuegen,
      ruestungHinzufuegen: ruestungHinzufuegen,
      schildHinzufuegen: schildHinzufuegen,
      zauberHinzufuegen: zauberHinzufuegen,
      staerkenHinzufuegen: staerkenHinzufuegen,
      getMeta: getMeta,
      setMeta: setMeta,
      importCharakter: importCharakter
    };
  };
module.exports = CHARAKTER;