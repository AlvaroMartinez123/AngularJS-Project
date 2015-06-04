var debug = require('debug')('LoLStats');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');


var app = express();

var http = require('http').Server(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next){
  debug(err);
  res.status(500).json({'error': err});
});






app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	next();
});


var port = process.env.PORT || 9001; 
var ip = process.env.IP || '0.0.0.0'; 

http.listen(port, ip, function () {
	debug('Application listening on http://' + ip + ':' + port);
	
});

module.exports = app;