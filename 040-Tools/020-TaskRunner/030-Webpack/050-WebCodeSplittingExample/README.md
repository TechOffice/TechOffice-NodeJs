
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

## Dependencies
* babel-plugin-syntax-dynamic-import
* babel-preset-es2015

**Execute webpack**
```
yarn install
webpack
```