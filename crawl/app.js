var express 	= require('express');
var request 	= require('request');


var app 		= express();
var j 			= request.jar();
var request 	= request.defaults({jar:j});

app.get('/', function(req, response){
	console.log('Vao day');
	request.get('https://m.facebook.com', function(err, res, body){
		console.log('Vao day luon!');
		response.send(body);
	});
});

app.listen(3000);