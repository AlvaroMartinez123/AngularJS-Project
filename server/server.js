var debug = require('debug')('Rapidshot');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


var basePath = path.join(__dirname, '/routes/');
fs.readdirSync(basePath).forEach(function(filename) {
	var basePathService = '/' + filename.replace(/\.js$/, '');
	var serviceDefinition = basePath + filename;
	app.use(basePathService, require(serviceDefinition));
});

app.use(function(err, req, res, next){
  debug(err.stack);
  res.status(500).send('Something broken!');
});

var port =  process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 9001; 
var ip =  process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '0.0.0.0'; 

app.listen(port, ip, function () {
	debug('Application listening on http://' + ip + ':' + port);
});

module.exports = app;
