module.exports = {
	'env': {
		'es6': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		"plugin:react-hooks/recommended",
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'project': 'tsconfig.json',
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'react-native',
		'react-hooks',
		'eslint-comments',
		'@typescript-eslint',
		'prettier',
		'import',
	],
	'rules': {
		'semi': 0,
		'curly': 0,
		'no-shadow': 0,
		'radix': 'error',
		'no-empty-function': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/member-delimiter-style': [
			'error', 
			{
				'multiline': {
					'delimiter': 'none',
					'requireLast': false
				},
				'singleline': {
					'delimiter': 'comma',
					'requireLast': false
				}
			}
		],
		'react/self-closing-comp': [ 
			'error', 
			{ 
				'component': true,
			},
		],
		'react/jsx-sort-props': [
			'error',
			{
				'noSortAlphabetically': false,
			}
		],
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'react/no-direct-mutation-state': 'error',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react-native/no-inline-styles': 0,
		'eslint-comments/no-unused-disable': 'error',
		'prettier/prettier': 'error',
		'import/first': 'error',
		'import/no-duplicates': 1,
		'import/no-named-default': 1,
		'import/no-absolute-path': 1,
		'import/newline-after-import': 1,
		'import/no-self-import': 1,
		'import/order': [
			1,
			{
				'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
				'alphabetize': {
					'order': 'asc',
					'caseInsensitive': true,
				}
			}
		]
  },
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
}