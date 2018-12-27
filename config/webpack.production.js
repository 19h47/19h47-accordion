/**
 *
 * @file webpack.production.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

const merge  = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(
	common,
	{
		mode: 'production',
		devtool: false,
		watch: false,
	},
);
