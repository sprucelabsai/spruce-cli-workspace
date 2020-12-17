import { EventContract, eventResponseUtil } from '@sprucelabs/mercury-types'
import SpruceError from '../../../errors/SpruceError'
import AbstractStore from '../../../stores/AbstractStore'

export interface EventStoreFetchEventContractsResponse {
	errors: SpruceError[]
	contracts: EventContract[]
}

export default class EventStore extends AbstractStore {
	public name = 'event'

	public async fetchEventContracts(): Promise<EventStoreFetchEventContractsResponse> {
		const client = await this.connectToApi()

		const results = await client.emit('get-event-contracts')
		const { contracts } = eventResponseUtil.getFirstResponseOrThrow(results)

		return {
			contracts,
			errors: [],
		}
	}

	public async registerEventContract(options: {
		eventContract: EventContract
	}) {
		const client = await this.connectToApi()
		const results = await client.emit('register-events', {
			payload: {
				contract: options.eventContract,
			},
		})

		eventResponseUtil.getFirstResponseOrThrow(results)
	}
}
