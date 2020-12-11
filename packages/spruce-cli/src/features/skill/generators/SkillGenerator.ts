import pathUtil from 'path'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import {
	DirectoryTemplateContextSkill,
	DirectoryTemplateCode,
} from '@sprucelabs/spruce-templates'
import AbstractGenerator, {
	GenerationResults,
} from '../../../generators/AbstractGenerator'

export default class SkillGenerator extends AbstractGenerator {
	public async generateSkill(
		destinationDir: string,
		options: DirectoryTemplateContextSkill & { upgrade?: boolean }
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
			if (!options.upgrade || !this.shouldSkipOnUpgrade(generated.filename)) {
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

	private shouldSkipOnUpgrade(filename: string) {
		return filename === 'package.json' || filename === 'settings.json'
	}
}
