module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
	},
	extends: ['standard', 'airbnb-base', 'prettier'],
	rules: {
		'arrow-parens': ['error', 'as-needed'],
		'no-console': 'off',
		'no-debugger': 'production' === process.env.NODE_ENV ? 'error' : 'off',
		'no-tabs': 0,
		indent: ['error', 'tab', { SwitchCase: 1, ignoredNodes: ['TemplateLiteral'] }],
		'template-curly-spacing': ['off'],
		'no-param-reassign': ['error', { props: false }],
		yoda: [2, 'always'],
		'import/no-named-as-default': 0,
	},
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
		allowImportExportEverywhere: true,
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: 'config/webpack.common.js',
			},
		},
	},
};
