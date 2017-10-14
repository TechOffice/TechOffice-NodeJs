# Webpack Bower Example

## webpack.config.js
```
const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'bin'),
		filename: 'app.bundle.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
                    presets: ['es2015']
                }
			}
		]
	},
	resolve: {
        modules: ["web_modules", "node_modules", "bower_components"]
    }
}; 
```

## Webpack Watch Mode Command
```
webpack --progress --colors --watch
```