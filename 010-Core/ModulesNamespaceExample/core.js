var core = require('./core/core.js')();
require('./core/core.sub1.js')(core);
require('./sub1/sub1.sub1sub1.js')(core);
 
// test 
console.log(core);