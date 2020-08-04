// import { DirectoryTemplateKind } from '@sprucelabs/spruce-templates'
import { IExtension } from '../services/VsCodeService'
import log from '../singletons/log'
import AbstractFeature from './AbstractFeature'
import { FeatureCode } from './features.types'

export default class VsCodeFeature extends AbstractFeature {
	public nameReadable = 'VSCode'
	public description = 'Create settings and install VSCode extensions'
	public code: FeatureCode = 'vsCode'
	public dependencies: FeatureCode[] = ['skill']
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
		{
			id: 'esbenp.prettier-vscode',
			label: 'Code formatter using prettier',
		}
	]

	// 	})
	private async getMissingExtensions() {
		const currentExtensions = await this.Service('vsCode').getVSCodeExtensions()

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
		return false
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
			await this.Service('vsCode').installExtensions(extensionsToInstall)
		} else {
			log.debug('No extensions to install')
		}
	}
}
