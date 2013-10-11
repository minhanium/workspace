var http = require('http');
//http.globalAgent.maxSockets = 10;

function request(index)
{
	console.log("###########################:", index);
	var options = {
	  hostname: 'localhost',
	  port: 80,
	  path: '/test/index.php'
	};

	var req = http.request(options, function(res) {
	  res.on('data', function (chunk) {
	  	console.log('FROM LOCAL (LONG):', index);
	  });
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	req.end();
}


function request_fb(index)
{
	var options = {
	  hostname: 'graph.facebook.com',
	  port: 80,
	  path: '/tpphu'
	};

	var req = http.request(options, function(res) {
	  res.on('data', function (chunk) {
	  	console.log('From FB:', index);
	  });
	});


	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});
	req.end();
}

for(var i = 0; i < 100; i++)
{
	request(i);
	request_fb(i);
}
