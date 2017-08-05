const { resolve } = require('path');
const webpack = require('webpack');

module.exports = env => {
	const config = {
		context: resolve('src'),
		entry: {
			'dateformat-converter': './main.js',
			'dateformat-converter.min': './main.js'
		},
		output: {
			filename: '[name].js',
			path: resolve('dist'),
			libraryTarget: 'umd',
			library: 'dateformatConverter',
			umdNamedDefine: true
		},
		devtool: 'source-map',
		module: {
			rules: [{
				enforce: 'pre',
				test: /\.jsx?$/,
				use: ['eslint-loader']
			}, {
				test: /\.jsx?$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			}]
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				include: /\.min\.js$/,
				minimize: true,
				sourceMap: true
			})
		]
	};
	return config;
};
