var zmq = require('zmq')
  , sock = zmq.socket('push');

sock.bindSync('tcp://127.0.0.1:3000');
console.log('Producer bound to port 3000');

var index = 0;
setInterval(function(){  
  sock.send('some work: ' + ++index);
}, 10);
