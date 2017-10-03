
Create webpack.config.js
```
const path = require('path');

module.exports = {
	entry: './src/app.js'
	output: path.resolv(__dirname, 'bin'),
	filename: 'app.bundle.js'
}; 
```