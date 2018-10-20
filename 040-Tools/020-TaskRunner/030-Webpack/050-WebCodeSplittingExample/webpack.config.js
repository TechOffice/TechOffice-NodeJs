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
						options: {
							presets: ['es2015'],
							plugins: ["syntax-dynamic-import"]
						}
					}
				]				
			}
		]
	}
}; 