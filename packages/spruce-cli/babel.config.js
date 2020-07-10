const copySchema = require('./babel-plugins/copySchema')

copySchema({
	cwd: __dirname,
})

module.exports = (api) => {
	api.cache(false)
	return {
		exclude: [],
		presets: ['@babel/preset-env', '@babel/preset-typescript'],
		plugins: [
			[
				'@babel/plugin-proposal-decorators',
				{
					decoratorsBeforeExport: true,
				},
			],
			'@babel/plugin-proposal-class-properties',
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						'#spruce/schemas/fields/fieldTypeEnum':
							'../../../node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/fieldTypeEnum',
						'#spruce': './src/.spruce',
					},
				},
			],
		],
	}
}
