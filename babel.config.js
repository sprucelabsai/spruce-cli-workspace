module.exports = (api) => {
	api.cache(true)
	return {
		ignore: ["**/testDirsAndFiles/**", "**/spruce-templates/src/templates/**"],
		presets: [['@babel/preset-env', {loose: false}], '@babel/preset-typescript'],
		plugins: [
			'@babel/plugin-transform-runtime',
			[
				'@babel/plugin-proposal-decorators',
				{
					legacy: true,
				},
			],
			['@babel/plugin-proposal-class-properties', {loose: false}],
			[
				'module-resolver',
				{
					root: ['./'],
					alias: {
						'#spruce': './src/.spruce',
					},
				},
			],
		],
	}
}
