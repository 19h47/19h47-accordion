const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifier = require('webpack-notifier');

const production = process.env.NODE_ENV === 'production';
const path = require('path');

module.exports = {
	watch: production ? false : true,
	entry: {
		dist: path.resolve(__dirname, 'src/index.js'),
		example: path.resolve(__dirname, 'src/index.js')
	},
	output: {
		library: 'AccordionStyle',
		libraryTarget: 'umd',
		path: path.resolve(__dirname),
		filename: '[name]/main.js'
	},
	devServer: {
    	contentBase: path.resolve(__dirname, 'dist'),
    	compress: true,
    	port: 9000,
		inline: true,
	},
	resolve: {
		alias: {
			Utils: path.resolve(__dirname, 'src/utils'),
		}
	},
	module: {
		rules: [
		{
			enforce: 'pre',
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint-loader'
		},
		{
			test: /\.js$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader'
		}]
	},
	plugins: [
		new CleanWebpackPlugin(
			['dist', 'example'],
			{
				exclude: ['.git']
			}
		),
		new WebpackNotifier(),
		new HtmlWebpackPlugin({
      		filename: path.resolve(__dirname, 'example/index.html' ),
      		template: path.resolve(__dirname, 'index.html' ),
			inject: false,
    	})
	],
	devtool: production ? false : 'source-map',
};
