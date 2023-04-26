/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable-next-line no-undef */
module.exports = {
	mode: 'jit',
	darkMode: 'class',
	parse: [
		'./source/**/*.tsx',
		'./source/**/*.ts',
		'./pages/**/*.tsx',
		'./pages/**/*.ts',
	],
	content: [
		'./source/**/*.tsx',
		'./source/**/*.ts',
		'./pages/**/*.tsx',
		'./pages/**/*.ts',
	],
	plugins: [require('tailwindcss-radix')(), require('daisyui')],
};
