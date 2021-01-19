import { DirectoryTemplateCode } from '@sprucelabs/spruce-templates'
import AbstractWriter, { WriteResults } from '../../../writers/AbstractWriter'

export default class NodeWriter extends AbstractWriter {
	public async writeNodeModule(destinationDir: string): Promise<WriteResults> {
		return this.writeDirectoryTemplate({
			destinationDir,
			code: DirectoryTemplateCode.Skill,
			filesToWrite: ['tsconfig.json'],
			context: { name: 'ignored', description: 'ignored' },
		})
	}
}
