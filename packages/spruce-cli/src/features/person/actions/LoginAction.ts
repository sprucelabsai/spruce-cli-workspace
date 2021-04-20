import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'loginAction',
	fields: {
		phone: {
			type: 'phone',
			label: 'Phone number',
			isRequired: true,
		},
		pin: {
			type: 'text',
			label: 'Pin',
		},
	},
})
type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>

export default class LoginAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'login'
	public optionsSchema: OptionsSchema = optionsSchema
	public commandAliases = ['login']

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const { phone, pin: suppliedPin } = this.validateAndNormalizeOptions(
			options
		)
		let loggedIn = false

		const client = await this.connectToApi()

		const requestPinResults = await client.emit('request-pin::v2020_12_25', {
			payload: { phone },
		})

		const { challenge } = eventResponseUtil.getFirstResponseOrThrow(
			requestPinResults
		)

		const response: FeatureActionResponse = {}

		do {
			const pin =
				suppliedPin ??
				(await this.ui.prompt({
					type: 'text',
					label: 'Pin',
					isRequired: true,
				}))

			const confirmPinResults = await client.emit('confirm-pin::v2020_12_25', {
				payload: { challenge, pin },
			})

			try {
				const { person, token } = eventResponseUtil.getFirstResponseOrThrow(
					confirmPinResults
				)

				const loggedInPerson = { ...person, token }

				this.Service('auth').setLoggedInPerson(loggedInPerson)

				loggedIn = true

				response.meta = { loggedInPerson }
				response.summaryLines = [`Logged in as ${loggedInPerson.casualName}`]
			} catch (err) {
				this.ui.renderWarning('Oops, bad pin. Try again please! 🙏')
			}
		} while (!loggedIn)

		return response
	}
}
