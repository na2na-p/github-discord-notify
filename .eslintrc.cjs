module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'google',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint',
	],
	rules: {
		'no-tabs': 'off',
		'max-len': ['error', {code: 240}],
		'indent': ['error', 'tab'],
		'@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
		'no-unused-vars': 'off',
		'new-cap': 'off',
		'require-jsdoc': 'off',
	},
};
