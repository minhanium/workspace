var fs 		= require('fs'),
    request = require('request'),
    nodecr 	= require('nodecr');

var j 		= request.jar();
var request = request.defaults({jar:j});

var download = function(uri, filename, callback){
	request.head(uri, function(err, res, body){
		console.log('content-type:', res.headers['content-type']);
		console.log('content-length:', res.headers['content-length']);

		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

var image = 'captcha.png';
download('http://www.mobifone.com.vn/portal/vn/users/img.jsp', image, function(){
	// Recognise text of any language in any format
	nodecr.process(__dirname + '/' + image,function(err, text) {
	    if( err ) {
	        console.error(err);
	    }
	    console.log('Code: ', text);
	    request.post('http://www.mobifone.com.vn/portal/vn/users/authenticate.jsp',{form:{
	    	username 	: '0937942974',
	    	password 	: '******',
	    	rdmstring	: text,
	    	btnLogin	: '' 	
	    }},function(err, res, body){
	    	console.log('--------------------------');
	    	console.log(err, res, body);
	    	console.log('--------------------------');
	    	var cookie = request.cookie('username=0937942974')
	    	j.setCookie(cookie, 'www.mobifone.com.vn');
	    	cookie = request.cookie('RouteID=route.neo_srv01');
	    	j.setCookie(cookie, 'www.mobifone.com.vn');
	    	request('http://www.mobifone.com.vn/portal/vn/sms/', function(err, res, body){
	    		console.log('=============================================');
	    		console.log(body);
	    		console.log('=============================================');
	    	});
	    });
	}, null, null, null, nodecr.preprocessors.convert);
});
