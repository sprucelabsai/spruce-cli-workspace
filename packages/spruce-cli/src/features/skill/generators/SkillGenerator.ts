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
		options: DirectoryTemplateContextSkill
	): Promise<GenerationResults> {
		return this.writeDirectoryTemplate({
			destinationDir,
			code: DirectoryTemplateCode.Skill,
			context: {
				...options,
				name: namesUtil.toKebab(options.name),
			},
		})
	}
}
