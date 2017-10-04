
## Prerequisit
* Install Webpack
```
npm install -g webpack
npm install -g babel-loader
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