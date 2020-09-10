import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import setupVscodeSchema from '#spruce/schemas/spruceCli/v2020_07_22/setupVscodeAction.schema'
import { IExtension } from '../../../services/VsCodeService'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export default class SetupAction extends AbstractFeatureAction<
	SpruceSchemas.SpruceCli.v2020_07_22.ISetupVscodeActionSchema
> {
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
			id: 'endormi.2077-theme',
			label: "Tay's favorite theme",
		},
	]

	public name = 'setup'
	public optionsSchema = setupVscodeSchema

	public async execute(
		options: SpruceSchemas.SpruceCli.v2020_07_22.ISetupVscodeAction
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const missing = await this.getMissingExtensions()
		const choices = missing.map((ext) => ({ value: ext.id, label: ext.label }))

		const answers = normalizedOptions.all
			? missing.map((m) => m.id)
			: await this.ui.prompt({
					type: FieldType.Select,
					label: 'What should I install?',
					isArray: true,
					options: {
						choices,
					},
			  })

		if (answers && answers?.length > 0) {
			this.ui.startLoading(`Installing ${answers.length} extensions...`)

			await this.Service('vsCode').installExtensions(answers)

			this.ui.stopLoading()

			return {
				hints: [
					'You will need to restart vscode for the changes to take effect. 👊',
				],
			}
		}

		return {}
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
