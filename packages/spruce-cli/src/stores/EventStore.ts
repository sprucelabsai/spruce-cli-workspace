import { EventContract } from '@sprucelabs/mercury-types'
import SpruceError from '../errors/SpruceError'
import AbstractStore from './AbstractStore'

export interface EventStoreFetchEventContractsResponse {
	errors: SpruceError[]
	contracts: EventContract[]
}

export default class EventStore extends AbstractStore {
	public name = 'event'
	public async fetchEventContracts(): Promise<EventStoreFetchEventContractsResponse> {
		const client = await this.connectToApi()

		const results = await client.emit('get-event-contracts')
		const { contracts } = results.responses[0].payload as any

		return {
			contracts,
			errors: [],
		}
	}
}
