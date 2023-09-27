const presets = [
	[
		'@babel/preset-env',
		{
			useBuiltIns: 'entry',
			corejs: '3.32.4',
		},
	],
];

const plugins = ['@babel/plugin-transform-runtime'];

module.exports = { presets, plugins };
