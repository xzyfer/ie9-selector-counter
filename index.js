
module.exports = require('./lib/counter.js');

var path = require('path');

console.log(module.exports.count(path.resolve(process.argv[2])));
