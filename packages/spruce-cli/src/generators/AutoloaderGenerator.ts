import AbstractGenerator from './AbstractGenerator'

export default class AutoloaderGenerator extends AbstractGenerator {
	public async generateRoot(
		destinationFilePath: string
	): Promise<{
		generatedFiles: {
			root: string
		}
	}> {
		const autoloaders = this.stores.autoloader.autoloaders()
		const rootTemplateItem = await this.utilities.autoloader.buildRootTemplateItem(
			autoloaders
		)

		const autoloaderFileContents = this.templates.rootAutoloader(
			rootTemplateItem
		)

		await this.writeFile(destinationFilePath, autoloaderFileContents)
		await this.services.lint.fix(destinationFilePath)

		return {
			generatedFiles: {
				root: destinationFilePath
			}
		}
	}
}
