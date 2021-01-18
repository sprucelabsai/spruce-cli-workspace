import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import {
	DirectoryTemplateContextSkill,
	DirectoryTemplateCode,
} from '@sprucelabs/spruce-templates'
import AbstractWriter, { WriteResults } from '../../../writers/AbstractWriter'

export default class SkillGenerator extends AbstractWriter {
	public async writeSkill(
		destinationDir: string,
		options: DirectoryTemplateContextSkill
	): Promise<WriteResults> {
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
