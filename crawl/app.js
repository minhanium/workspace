var express 	= require('express');
var request 	= require('request');
var cheerio	 	= require('cheerio');


var app 		= express();
var j 			= request.jar();
var request 	= request.defaults({jar:j});
var formData	= {};
var loginAction	= '';
var username	= '';
var password	= '';
var rootUrl		= 'https://m.facebook.com';
var home		= rootUrl+'/home.php';
var profile		= rootUrl+'/'+username;

app.get('/', function(req, response){
	request.get(rootUrl, function(err, res, body){
		var $ = cheerio.load(body);
		var el 		= null;
        $('input[type="hidden"]').each(function(i, el) {
            el = $(el);
            formData[el.attr('name')] = el.attr('value');
        });
        formData['email'] 	= username;
        formData['pass'] 	= password;

        loginAction 		= $('#login_form').attr('action');
        console.log('loginAction:', loginAction);
        console.log('formData:', formData);        
        response.redirect('/login');
	});
});

app.get('/login', function(req, response){
	request.post(loginAction, {form: formData}, function(err, res, body){
		if( err )
		{
			console.log(err, res);
		}
		response.redirect('/home');
	});
});

app.get('/home', function(req, response){
	request.get(home, function(err, res, body){	
		if( err )
		{
			console.log(err, res);
		}	
		response.send(body);
	});
});

app.get('/profile', function(req, response){
	request.get(profile, function(err, res, body){		
		if( err )
		{
			console.log(err, res);
		}
		response.send(body);
	});
});

app.get('*', function(req, response){	
	var fetchUrl = rootUrl + req.url;
	request.get(fetchUrl, function(err, res, body){		
		if( err )
		{
			console.log(err, res);
		}
		response.send(body);
	});
});
app.listen(3000);