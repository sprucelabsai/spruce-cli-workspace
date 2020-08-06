import pathUtil from 'path'
import globby from 'globby'
import SpruceError from './SpruceError'

const pluginUtil = {
	import(args: any[], ...path: string[]) {
		const lookup = pathUtil.join(...path, '**', '*.plugin.[t|j]s')
		const results = globby.sync(lookup)

		results.forEach((path) => {
			const plugin = require(path)

			if (!plugin || !plugin.default) {
				throw new SpruceError({
					code: 'FAILED_TO_LOAD_PLUGIN',
					file: path,
					friendlyMessage: 'You must export your plugin as the default.',
				})
			}

			plugin.default(...args)
		})
	},
}

export default pluginUtil
