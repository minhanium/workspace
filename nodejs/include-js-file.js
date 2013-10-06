var fs = require('fs');
var vm = require('vm');

/**
 |-------------------------------------------------------------------------------------
 |http://stackoverflow.com/questions/5625569/include-external-js-file-in-node-js-app
 |-------------------------------------------------------------------------------------
 */

//Case 1
var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code, path);
}.bind(this);
//Case 2
//La sao ta, confused ghe
/*
var includeInThisContext = function(path) {
    var code = fs.readFileSync(path);
    vm.runInThisContext(code);
};
*/

includeInThisContext(__dirname+"/_include-js-file.js");
console.log(positive);
