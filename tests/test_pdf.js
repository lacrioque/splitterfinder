var pdf = require ("../src/modules/pdf_generation.js"),
	q = require('q'),
	fs = require('fs');

console.log('Testing PDF fuctions');
var form_data = pdf.getTemplate();
form_data.then(function(data){fs.writeFileSync('charakterbogen_template.json', JSON.stringify(data))});
