# Modules Example

## Modules
Each file can be seen as a module in NodeJs. The require() function can be used to load other module.

main.js
```
console.log("main.js")
require("./module1");
```

module1.js
```
console.log("module1.js")
```

output
```
main.js
module1.js
```

### exports 
In the module file, it can define the export functions by **exports** object.

exportModule1.js
```
exports.saySomething = (str) => {console.log("exportModule1.js say: " + str)}
```

main.js
```
var exportModule1 = require("./exportModule1.js");
exportModule1.saySomething("from main.js");
```

### module.exports
If the module export would be a function. module.exports should be used instead of exports.

moduleExport1.js
```
module.exports = (str) => {
	return {
		str: () => str;
	};
}
```

main.js
```
var moduleExport1 = require("./moduleExport1Module1.js");
console.log(moduleExport1);
```