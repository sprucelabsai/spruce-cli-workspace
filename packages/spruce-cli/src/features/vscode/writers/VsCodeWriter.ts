import { DirectoryTemplateCode } from '@sprucelabs/spruce-templates'
import AbstractWriter, { WriteResults } from '../../../writers/AbstractWriter'

export default class VsCodeWriter extends AbstractWriter {
	public async writeVsCodeConfigurations(
		destinationDir: string
	): Promise<WriteResults> {
		return this.writeDirectoryTemplate({
			destinationDir,
			code: DirectoryTemplateCode.VsCode,
			context: {},
		})
	}
}
