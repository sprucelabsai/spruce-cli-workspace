import { DirectoryTemplateCode } from '@sprucelabs/spruce-templates'
import AbstractGenerator, {
	GenerationResults,
} from '../../../generators/AbstractGenerator'

export default class NodeGenerator extends AbstractGenerator {
	public async generateNodeModule(
		destinationDir: string
	): Promise<GenerationResults> {
		return this.writeDirectoryTemplate({
			destinationDir,
			code: DirectoryTemplateCode.Skill,
			filesToWrite: ['tsconfig.json'],
			context: { name: 'ignored', description: 'ignored' },
		})
	}
}
