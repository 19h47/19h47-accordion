const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackNotifier = require('webpack-notifier');

const production = process.env.NODE_ENV === 'production';
const path = require('path');

module.exports = {
	watch: production ? false : true,
	entry: path.resolve(__dirname, 'src/index.js'),
	output: {
		filename: '[name].js',
		library: 'AccordionStyle',
		libraryTarget: 'umd',
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src/'),
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
		},
		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: production ? false : true
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: production ? false : true
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: production ? false : true
					}
				}
			]
		}]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new MiniCssExtractPlugin({
			filename: 'main.css'
		}),
		new WebpackNotifier(),
	],
	devtool: production ? false : 'source-map',
};
