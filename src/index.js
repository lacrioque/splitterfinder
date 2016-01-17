/*globals node, window, export, console*/
var fs = require('fs'), q = require('q'), 
//nwgui = global.window.nwDispatcher.requireNwGui(), 
nwgui = require('nw.gui'), 
_ = require('lodash'), database = require('./modules/database_connect.js').init(nwgui), calculation = require('./modules/calculate_values.js'), exportImport = require('./modules/export_import.js'), encrytion = require('node-forge'), pdf = require('./modules/pdf_generation.js');