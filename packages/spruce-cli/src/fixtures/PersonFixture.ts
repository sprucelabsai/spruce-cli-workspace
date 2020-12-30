import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import { ApiClientFactory } from '../types/apiClient.types'
export const DUMMY_PHONE = '555-123-4567'

export default class PersonFixture {
	private apiClientFactory: ApiClientFactory

	public constructor(apiClientFactory: ApiClientFactory) {
		this.apiClientFactory = apiClientFactory
	}

	public async loginAsDummyPerson(phone = DUMMY_PHONE) {
		const client = await this.apiClientFactory()

		debugger
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

		return person
	}
}
