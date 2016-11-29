//simple module loading example
console.log("NodeJs Module Example");
console.log("=====================================");
require("./module1");

// exports example
var exportModule1 = require("./exportModule1.js");
exportModule1.saySomething("from main.js");

// module export example
const moduleExport1 = require("./moduleExportModule1.js");
var myModuleExport1 = moduleExport1("from main.js to moduleExportModule1.js")
myModuleExport1.doSomething()