/*globals node, window, export, console*/
var require = window.require,
    fs = require("fs"),
    q = require("q"),
    _ = require("lodash"),
    database = require("./modules/database_connect.js"),
    calculation = require("./modules/calculate_values.js"),
    exportImport = require("./modules/export_import.js"),
    pdf = require("./modules/pdf_generation.js");
