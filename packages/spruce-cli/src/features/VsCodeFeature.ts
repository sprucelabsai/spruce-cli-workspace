// import { DirectoryTemplateKind } from '@sprucelabs/spruce-templates'
import { Service } from '../factories/ServiceFactory'
import VsCodeService, { IExtension } from '../services/VsCodeService'
import log from '../singletons/log'
import AbstractFeature from './AbstractFeature'

export default class VsCodeFeature extends AbstractFeature {
	public description = 'VSCode: Create settings and install VSCode extensions'

	private recommendedExtensions: IExtension[] = [
		{
			id: 'dbaeumer.vscode-eslint',
			label: 'ESLint syntax validation and fixing',
		},
		{
			id: 'eg2.vscode-npm-script',
			label: 'NPM package.json validation and warnings',
		},
		{
			id: 'christian-kohler.npm-intellisense',
			label: 'Intellisense autocompletion of installed npm modules',
		},
	]

	// public async beforePackageInstall() {
	// 	await this.writeDirectoryTemplate({
	// 		kind: DirectoryTemplateKind.VsCode,
	// 		context: {}
	private VsCodeService(): VsCodeService {
		return this.serviceFactory.Service(this.cwd, Service.VsCode)
	}
	// 	})
	private async getMissingExtensions() {
		const currentExtensions = await this.VsCodeService().getVSCodeExtensions()
		const missingExtensions = this.recommendedExtensions.filter(
			(recommendedExtension) => {
				const currentExtension = currentExtensions.find(
					(e) => e === recommendedExtension.id
				)
				if (currentExtension) {
					return false
				}
				return true
			}
		)
		return missingExtensions
	}

	// }

	public async isInstalled() {
		return true
		// const containsAllTemplateFiles = await this.templates.isValidTemplatedDirectory(
		// 	{
		// 		kind: DirectoryTemplateKind.VsCode,
		// 		dir: dir || this.cwd
		// 	}
		// )

		// if (!containsAllTemplateFiles) {
		// 	return false
		// }

		// const missingExtensions = await this.getMissingExtensions()

		// return missingExtensions.length === 0
	}

	public async afterPackageInstall() {
		await this.installMissingExtensions()
	}

	public getActions() {
		return []
	}

	private async installMissingExtensions() {
		const extensionsToInstall = await this.getMissingExtensions()

		if (extensionsToInstall.length > 0) {
			await this.VsCodeService().installExtensions(extensionsToInstall)
		} else {
			log.debug('No extensions to install')
		}
	}
}
