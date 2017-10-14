//simple module loading example
console.log("NodeJs Module Example");
console.log("=====================================");
console.log("	Executing: require(\"./module1\");")
require("./module1");

// module export example
moduleExport1 = require("./moduleExport1.js");
console.log("	Executing: moduleExport1 = require(\"./moduleExport1.js\")")
console.log("		" + JSON.stringify(moduleExport1));