import { eventResponseUtil, SpruceSchemas } from '@sprucelabs/mercury-types'
import { ApiClientFactory } from '../stores/AbstractStore'
export const DUMMY_PHONE = '555-123-4567'

export default class PersonFixture {
	private apiClientFactory: ApiClientFactory
	private peopleByPhone: Record<
		string,
		SpruceSchemas.Spruce.v2020_07_22.Person
	> = {}

	public constructor(apiClientFactory: ApiClientFactory) {
		this.apiClientFactory = apiClientFactory
	}

	public async loginAsDummyPerson(phone = DUMMY_PHONE) {
		if (this.peopleByPhone[phone]) {
			return phone
		}

		debugger
		const client = await this.apiClientFactory()
		debugger

		const requestPinResults = await client.emit('request-pin', {
			payload: { phone },
		})

		const { challenge } = eventResponseUtil.getFirstResponseOrThrow(
			requestPinResults
		)

		const confirmPinResults = await client.emit('confirm-pin', {
			payload: { challenge, pin: '7777' },
		})

		const { person } = eventResponseUtil.getFirstResponseOrThrow(
			confirmPinResults
		)

		this.peopleByPhone[phone] = person

		return person
	}
}
