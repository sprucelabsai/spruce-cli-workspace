import pathUtil from 'path'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import {
	IDirectoryTemplateContextSkill,
	DirectoryTemplateCode,
} from '@sprucelabs/spruce-templates'
import AbstractGenerator, { GenerationResults } from './AbstractGenerator'

export default class SkillGenerator extends AbstractGenerator {
	public async generateSkill(
		destinationDir: string,
		options: IDirectoryTemplateContextSkill & { upgrade?: boolean }
	): Promise<GenerationResults> {
		const files = await this.templates.directoryTemplate({
			kind: DirectoryTemplateCode.Skill,
			context: {
				...options,
				name: namesUtil.toKebab(options.name),
			},
		})

		let results: GenerationResults = []

		for (const generated of files) {
			if (!options.upgrade || generated.filename !== 'package.json') {
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
