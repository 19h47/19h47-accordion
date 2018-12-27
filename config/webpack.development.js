/**
 *
 * @file webpack.development.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

const path = require('path');

const merge  = require('webpack-merge');
const common = require('./webpack.common.js');

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = merge(
	common,
	{
		mode: 'development',
		devtool: 'source-map',
		watch: true,
	},
);
