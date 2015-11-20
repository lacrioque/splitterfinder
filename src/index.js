/*globals require, node, window, modules, export*/
var fs = require("fs"),
    jsonfile = require("jsonfile"),
    q = require("q"),
    _ = require("lodash"),
    modules = {
        'database' : "./modules/database.js",
        'calculation' : "./modules/calculate_values.js",
        'exportImport' : "./modules/export_import.js",
        'pdf' : "./modules/pdf_generation.js"
    };