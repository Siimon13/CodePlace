const express = require('express');
var path = require('path');
const app = express();
var config = require("./static/config.js");
var googleplaces = require("googleplaces");
var geolib = require("geolib");
var geolocation = require('geolocation');

app.use(express.static(__dirname));


app.get('/', function (req, res) {
    res.sendFile(__dirname+'/index.html'); 
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

console.log('Starting directory: ' + process.cwd());

console.log(config.apiKey);
