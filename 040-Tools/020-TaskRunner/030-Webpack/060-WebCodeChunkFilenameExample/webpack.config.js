const path = require('path');

module.exports = {
	entry: {
		app: 	'./src/app.js'
	},
	output: {
		publicPath: 'bin/',
		path: path.resolve(__dirname, 'bin'),
		filename: '[name].bundle.js',
		chunkFilename: '[name].bundle.js'
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