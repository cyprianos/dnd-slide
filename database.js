var dbUrl = "library";
var collections = ["images"];

var db = require('mongojs').connect(dbUrl, collections);

module.exports = db;
