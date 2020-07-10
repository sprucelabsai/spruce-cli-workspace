const fs = require('fs')
const pathUtil = require('path')
const fsExtra = require('fs-extra')
const rimRaf = require('rimraf')

module.exports = function (options) {
	// places to look for schema
	const rootTarget = pathUtil.join(
		options.cwd,
		'..',
		'..',
		'node_modules',
		'@sprucelabs',
		'schema'
	)

	const destination = pathUtil.join(
		options.cwd,
		'build',
		'node_modules',
		'@sprucelabs',
		'schema'
	)

	// step 1, make sure it exists at the destination
	if (!fs.existsSync(destination)) {
		fsExtra.copySync(rootTarget, destination)

		const schemaNodeModules = pathUtil.join(destination, 'node_modules')

		console.log('***********************************')
		console.log(schemaNodeModules)

		if (fs.existsSync(schemaNodeModules)) {
			rimRaf(schemaNodeModules)
		}
	}

	// step 2, path replacement
	// const source = pathUtil.join(destination, 'build', '**', '*.js')
	// const resolved = resolver.resolvePath('#spruce/schemas')

	// console.log('resolved', resolved)
	// throw new Error('raoesuthaoeu')

	// const results = replace.sync({
	// 	files: source,
	// 	from: '#spruce/schemas',
	// 	to:
	//   });
}
