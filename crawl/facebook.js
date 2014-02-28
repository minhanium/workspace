var fs 		= require('fs'),
    request = require('request'),
    nodecr 	= require('nodecr');

var j 		= request.jar();
var request = request.defaults({jar:j});

request.get('https://m.facebook.com', function(err, res, body){
	console.log('=============================================');
	console.log(j);
	console.log('=============================================');
});