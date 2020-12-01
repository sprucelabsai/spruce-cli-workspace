import { EventContract } from '@sprucelabs/mercury-types'
import SpruceError from '../errors/SpruceError'
import AbstractStore from './AbstractStore'

export interface EventStoreFetchEventContractsResponse {
	errors: SpruceError[]
	contract: EventContract
}

export default class EventStore extends AbstractStore {
	public name = 'event'
	public async fetchEventContracts(): Promise<EventStoreFetchEventContractsResponse> {
		return {
			contract: {},
			errors: [],
		}
	}
}
