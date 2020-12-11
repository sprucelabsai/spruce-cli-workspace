import pathUtil from 'path'
import { DirectoryTemplateCode } from '@sprucelabs/spruce-templates'
import AbstractGenerator, {
	GenerationResults,
} from '../../../generators/AbstractGenerator'

export default class NodeGenerator extends AbstractGenerator {
	public async generateNodeModule(
		destinationDir: string
	): Promise<GenerationResults> {
		const files = await this.templates.directoryTemplate({
			kind: DirectoryTemplateCode.Skill,
			context: { name: 'ignored', description: 'ignored' },
		})

		let results: GenerationResults = []
		const filesToInstall = ['tsconfig.json']

		for (const generated of files) {
			if (filesToInstall.indexOf(generated.filename) > -1) {
				results = await this.writeFileIfChangedMixinResults(
					pathUtil.join(destinationDir, generated.relativePath),
					generated.contents,
					'',
					results
				)
			}
		}

		return results
	}
}
