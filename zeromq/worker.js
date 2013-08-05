var zmq = require('zmq')
    ,sock = zmq.socket('pull');

sock.connect('tcp://127.0.0.1:3000');
console.log('Worker connected to port 3000');

sock.on('message', function(msg){
	var begin = process.hrtime();
	//Cho nay no khong work
	//Boi vi no pull theo co the thu tu
	//^^	
	for(var i = 0; i < 99000000; i++)
	{
		var t = i*i/1000;
		var k = i*i/2222;
		var m = i*i/3333;
	}
	var end = process.hrtime(begin);
	console.log('work: %s', msg.toString());
	console.log('time: %s', end);
});
