import { TemplateKind } from '@sprucelabs/spruce-templates'
import log from '../lib/log'
import AbstractFeature from './AbstractFeature'
import { IExtension } from '../services/VsCodeService'

export default class VSCodeFeature extends AbstractFeature {
	public description = 'VSCode: Create settings and install VSCode extensions'

	private recommendedExtensions: IExtension[] = [
		{
			id: 'dbaeumer.vscode-eslint',
			label: 'ESLint syntax validation and fixing'
		},
		{
			id: 'eg2.vscode-npm-script',
			label: 'NPM package.json validation and warnings'
		},
		{
			id: 'christian-kohler.npm-intellisense',
			label: 'Intellisense autocompletion of installed npm modules'
		}
	]

	public async beforePackageInstall() {
		this.utilities.terminal.startLoading('Creating VSCode config files')
		await this.writeDirectoryTemplate({
			template: TemplateKind.VSCode
		})
		this.utilities.terminal.stopLoading()
	}

	public async isInstalled(
		/** The directory to check if a skill is installed. Default is the cwd. */
		dir?: string
	) {
		const containsAllTemplateFiles = await this.containsAllTemplateFiles({
			templateKind: TemplateKind.VSCode,
			dir
		})

		if (!containsAllTemplateFiles) {
			return false
		}

		const missingExtensions = await this.getMissingExtensions()

		return missingExtensions.length === 0
	}

	public async afterPackageInstall() {
		this.utilities.terminal.startLoading('Installing VSCode extensions')
		await this.installMissingExtensions()
		this.utilities.terminal.stopLoading()
	}

	private async installMissingExtensions() {
		const extensionsToInstall = await this.getMissingExtensions()

		if (extensionsToInstall.length > 0) {
			await this.services.vsCode.installExtensions(extensionsToInstall)
		} else {
			log.debug('No extensions to install')
		}
	}

	private async getMissingExtensions() {
		const currentExtensions = await this.services.vsCode.getVSCodeExtensions()
		const missingExtensions = this.recommendedExtensions.filter(
			recommendedExtension => {
				const currentExtension = currentExtensions.find(
					e => e === recommendedExtension.id
				)
				if (currentExtension) {
					return false
				}
				return true
			}
		)
		return missingExtensions
	}
}
