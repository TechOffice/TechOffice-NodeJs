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
			},
			{
				test: /\.html$/,
				loader: 'raw-loader'
			}
		]
	}
}; 