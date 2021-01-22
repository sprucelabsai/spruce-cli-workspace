import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import SpruceError from '../errors/SpruceError'
import { ApiClientFactory } from '../types/apiClient.types'

require('dotenv').config()

export const DUMMY_PHONE = process.env.DEMO_NUMBER

export default class PersonFixture {
	private apiClientFactory: ApiClientFactory

	public constructor(apiClientFactory: ApiClientFactory) {
		this.apiClientFactory = apiClientFactory
	}

	public async loginAsDemoPerson(phone = DUMMY_PHONE) {
		if (!phone) {
			throw new SpruceError({
				code: 'MISSING_PARAMETERS',
				parameters: ['env.DEMO_NUMBER'],
			})
		}

		const client = await this.apiClientFactory()

		//@ts-ignore
		if (client.auth?.person?.phone === phone) {
			return client
		}

		const requestPinResults = await client.emit('request-pin::v2020_12_25', {
			payload: { phone },
		})

		const { challenge } = eventResponseUtil.getFirstResponseOrThrow(
			requestPinResults
		)

		const confirmPinResults = await client.emit('confirm-pin::v2020_12_25', {
			payload: { challenge, pin: phone.substr(-4) },
		})

		const { person } = eventResponseUtil.getFirstResponseOrThrow(
			confirmPinResults
		)

		//@ts-ignore
		client.auth = { person }

		return person
	}
}
