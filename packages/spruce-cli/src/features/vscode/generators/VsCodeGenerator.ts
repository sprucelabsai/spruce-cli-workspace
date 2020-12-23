import { DirectoryTemplateCode } from '@sprucelabs/spruce-templates'
import AbstractGenerator, {
	GenerationResults,
} from '../../../generators/AbstractGenerator'

export default class VsCodeGenerator extends AbstractGenerator {
	public async generateVsCodeConfigurations(
		destinationDir: string
	): Promise<GenerationResults> {
		return this.writeDirectoryTemplate({
			destinationDir,
			code: DirectoryTemplateCode.VsCode,
			context: {},
		})
	}
}
