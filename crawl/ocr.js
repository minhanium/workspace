var fs 		= require('fs'),
    request = require('request'),
    nodecr 	= require('nodecr');

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
	}, null, null, null, nodecr.preprocessors.convert);
});
