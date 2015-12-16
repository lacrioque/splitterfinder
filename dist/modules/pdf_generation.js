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
			}, mapTemplate = function(data, map){
				//TOCOME
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