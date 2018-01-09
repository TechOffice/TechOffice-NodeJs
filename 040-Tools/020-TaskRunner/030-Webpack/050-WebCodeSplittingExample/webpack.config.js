const path = require('path');

module.exports = {
	entry: {
		app: 	'./src/app.js',
		test: 	'./src/test.js'
	},
	output: {
		path: path.resolve(__dirname, 'bin'),
		filename: '[name].bundle.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: [
					{
						loader: 'babel-loader',
						query: {
							presets: ['es2015']
						}
					}
				]				
			}
		]
	}
}; 