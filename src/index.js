/*globals node, window, export, console*/
var fs = require('fs'), q = require('q'), 
//nwgui = global.window.nwDispatcher.requireNwGui(), 
nwgui = require('nw.gui'), 
root = process.cwd(),
_ = require('lodash'), 
calculation = require('./modules/calculate_values.js'), 
exportImport = require('./modules/export_import.js'), 
encrytion = require('node-forge'), 
pdf = require('./modules/pdf_generation.js');

require('./modules/genkey.js').then(
    function(){
         require('./modules/database_connect.js').init(nwgui);
    });