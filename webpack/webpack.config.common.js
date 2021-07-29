/**
 * Common
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ESLintPlugin = require('eslint-webpack-plugin');

const resolve = require('./webpack.utils');

module.exports = {
	entry: {
		dist: resolve('src/Accordion.js'),
		docs: resolve('src/Accordion.js'),
	},
	output: {
		path: resolve('/dist'),
		library: 'Accordion',
		libraryTarget: 'umd',
		filename: '../[name]/main.js',
	},
	devServer: {
		static: [
			resolve('/')
		],
		compress: true,
		port: 3000,
		// firewall: true,
		// writeToDisk: true,
	},
	resolve: {
		alias: {
			'@': resolve('src'),
			Utils: resolve('src/utils'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [resolve('dist'), resolve('docs')],
		}),
		new HtmlWebpackPlugin({
			filename: resolve('docs/index.html'),
			template: resolve('index.html'),
			inject: false,
			minify: { removeRedundantAttributes: false },
		}),
		new WebpackNotifierPlugin({
			title: 'Webpack',
			excludeWarnings: true,
			alwaysNotify: true,
		}),
		new ESLintPlugin()
	],
};
