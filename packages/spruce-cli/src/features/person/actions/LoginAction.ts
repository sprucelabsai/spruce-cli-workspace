import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'loginAction',
	fields: {
		phone: {
			type: 'phone',
			label: 'Phone number (for pin)',
			isRequired: true,
		},
	},
})
type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>

export default class LoginAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'login'
	public optionsSchema: OptionsSchema = optionsSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const { phone } = this.validateAndNormalizeOptions(options)
		let loggedIn = false

		do {
			const pin = await this.ui.prompt({ type: 'text', label: 'Pin' })

			this.ui.renderWarning('Oops, bad pin. Try again please! 🙏')
		} while (!loggedIn)

		return {}
	}
}
