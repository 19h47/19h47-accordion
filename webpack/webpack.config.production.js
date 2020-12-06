/**
 * Production
 *
 * @file webpack.production.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (https://19h47.fr)
 */

const CopyPlugin = require('copy-webpack-plugin');

const resolve = require('./webpack.utils');

module.exports = {
	mode: 'production',
	devtool: false,
	watch: false,
	plugins: [
		new CopyPlugin({
			patterns: [{ from: resolve('accordion.png'), to: resolve('docs/') }],
		}),
	],
};
