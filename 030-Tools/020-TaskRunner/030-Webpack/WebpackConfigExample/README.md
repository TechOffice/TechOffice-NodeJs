
## Prerequisit
* Install Webpack
```
npm install -g webpack
```

## Example
Create webpack.config.js
```
const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'bin'),
		filename: 'app.bundle.js'
	}
}; 
```

Execute webpack
```
webpack
```