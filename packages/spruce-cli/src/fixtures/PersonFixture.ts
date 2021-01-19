import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import { ApiClientFactory } from '../types/apiClient.types'

require('dotenv').config()

export const DUMMY_PHONE = process.env.DUMMY_PHONE ?? '+1 555-555-1235'

export default class PersonFixture {
	private apiClientFactory: ApiClientFactory

	public constructor(apiClientFactory: ApiClientFactory) {
		this.apiClientFactory = apiClientFactory
	}

	public async loginAsDemoPerson(phone = DUMMY_PHONE) {
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
			payload: { challenge, pin: '7777' },
		})

		const { person } = eventResponseUtil.getFirstResponseOrThrow(
			confirmPinResults
		)

		//@ts-ignore
		client.auth = { person }

		return person
	}
}
