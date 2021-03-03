import { diskUtil, namesUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../../../errors/SpruceError'
import { GeneratedFile } from '../../../types/cli.types'
import AbstractWriter from '../../../writers/AbstractWriter'

export default class StoreWriter extends AbstractWriter {
	public async writeStore(
		destination: string,
		options: { nameCamel: string; namePascal: string; nameSnake: string }
	) {
		const camel = namesUtil.toCamel(options.nameCamel)
		const pascal = namesUtil.toPascal(camel)
		const files: GeneratedFile[] = []

		const filename = `${pascal}.store.ts`

		const fileDest = diskUtil.resolvePath(
			destination,
			'src',
			'stores',
			filename
		)

		if (diskUtil.doesFileExist(fileDest)) {
			throw new SpruceError({ code: 'STORE_EXISTS' })
		}

		const contents = this.templates.store(options)

		diskUtil.writeFile(fileDest, contents)

		files.push({
			action: 'generated',
			name: filename,
			path: fileDest,
		})

		return files
	}

	public writePlugin(cwd: string) {
		const destination = diskUtil.resolveHashSprucePath(
			cwd,
			'features',
			'store.plugin.ts'
		)

		const pluginContents = this.templates.storePlugin()

		const results = this.writeFileIfChangedMixinResults(
			destination,
			pluginContents,
			'Loads all your data stores and connects you to any databases you have configured.'
		)

		return results
	}
}
