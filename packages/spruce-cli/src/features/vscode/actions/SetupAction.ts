import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import setupVscodeSchema from '#spruce/schemas/spruceCli/v2020_07_22/setupVscodeAction.schema'
import { NpmPackage } from '../../../types/cli.types'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
import { Extension } from '../services/VsCodeService'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.SetupVscodeActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.SetupVscodeAction

export default class SetupAction extends AbstractFeatureAction<OptionsSchema> {
	private recommendedExtensions: Extension[] = [
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

	public name = 'setup'
	public optionsSchema = setupVscodeSchema
	private dependencies: NpmPackage[] = [
		{
			name: 'eslint',
			isDev: true,
		},
		{
			name: 'eslint-config-spruce',
			isDev: true,
		},
	]

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const { all } = this.validateAndNormalizeOptions(options)

		const missing = await this.getMissingExtensions()
		const choices = missing.map((ext) => ({ value: ext.id, label: ext.label }))
		const response: FeatureActionResponse = {
			summaryLines: [],
		}

		const answers =
			all || missing.length === 0
				? missing.map((m) => m.id)
				: await this.ui.prompt({
						type: 'select',
						label: 'Which extensions should I install?',
						isArray: true,
						options: {
							choices,
						},
				  })

		if (answers && answers?.length > 0) {
			this.ui.startLoading(`Installing ${answers.length} extensions...`)

			for (const answer of answers) {
				response.summaryLines?.push(`Installed ${answer} extension.`)
			}

			await this.Service('vsCode').installExtensions(answers)

			this.ui.stopLoading()
		}

		const files = await this.Generator('vscode').generateVsCodeConfigurations(
			this.cwd
		)

		response.files = files
		response.packagesInstalled = []

		const pkg = this.Service('pkg')

		for (const module of this.dependencies) {
			if (!pkg.isInstalled(module.name)) {
				response.packagesInstalled.push(module)
			}
		}

		if (response.packagesInstalled.length > 0) {
			const shouldInstallPackages =
				all ||
				(await this.ui.confirm(
					'Last thing! Ready for me to install eslint modules?'
				))

			if (shouldInstallPackages) {
				for (const module of response.packagesInstalled) {
					await pkg.install(module.name, {
						isDev: module.isDev,
					})
				}
			}
		}

		return response
	}

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
}
