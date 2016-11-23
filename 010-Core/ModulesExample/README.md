# Modules Example

## Modules
Each file can be seen as a module in NodeJs. The require() function can be used to load other module.

## Example
This is an example showing main.js loading module a.js to run program specified in a.js

main.js
```
console.log("main.js")
require("./a");
```

a.js
```
console.log("a.js")
```

output
```
main.js
a.js
```