import _ from 'lodash'

export const reservedWords = [
	'await',
	'break',
	'case',
	'catch',
	'class',
	'const',
	'continue',
	'debugger',
	'default',
	'delete',
	'do',
	'else',
	'enum',
	'export',
	'extends',
	'false',
	'finally',
	'for',
	'function',
	'if',
	'implements',
	'import',
	'in',
	'instanceof',
	'interface',
	'let',
	'new',
	'null',
	'package',
	'private',
	'protected',
	'public',
	'return',
	'super',
	'switch',
	'static',
	'this',
	'throw',
	'try',
	'True',
	'typeof',
	'var',
	'void',
	'while',
	'with',
	'yield'
]

export function isReservedWord(wordToCheck: string) {
	if (_.includes(reservedWords, wordToCheck.toLowerCase())) {
		return true
	}
	return false
}
