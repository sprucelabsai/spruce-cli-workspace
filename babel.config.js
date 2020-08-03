const copySchema = require('./babel-plugins/copySchema')
const pathUtil = require('path')


module.exports = (api) => {
	api.cache(true)
	
	copySchema({
		cwd: __dirname,
		destination: process.env.PWD
	})

	return {
		ignore: ["**/testDirsAndFiles/**"],
		presets: ['@babel/preset-env', '@babel/preset-typescript'],
		plugins: [
			'@babel/plugin-transform-runtime',
			[
				'@babel/plugin-proposal-decorators',
				{
					legacy: true,
				},
			],
			['@babel/plugin-proposal-class-properties', {loose: true}],
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						'#spruce/schemas/fields/fieldTypeEnum':
							'./node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/fieldTypeEnum',
						'#spruce/schemas/fields/fieldClassMap':
							'./node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/fieldClassMap',
						'#spruce/schemas/fields/field.types':
							'./node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/field.type',
						'#spruce': './src/.spruce',
					},
				},
			],
		],
	}
}
