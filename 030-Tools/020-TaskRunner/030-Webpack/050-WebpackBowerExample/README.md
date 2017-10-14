# Webpack Watch Mode

## Create webpack.config.js
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

## execute webpack watch mode
```
webpack --progress --colors --watch
```