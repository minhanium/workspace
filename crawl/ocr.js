var nodecr = require('nodecr');

// Recognise text of any language in any format
nodecr.process(__dirname + '/img.jpg',function(err, text) {
    if( err ) {
        console.error(err);
    }
    console.log('Code: ', text);
}, null, null, null, nodecr.preprocessors.convert);