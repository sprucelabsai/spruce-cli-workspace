import { MercuryClientFactory } from '@sprucelabs/mercury-client'
import eventsContract from '#spruce/events/events.contract'
import { ApiClient } from '../stores/AbstractStore'

const TEST_HOST = 'https://sandbox.mercury.spruce.ai'

export default class MercuryFixture {
	private client?: ApiClient

	public getApiClientFactory() {
		return async () => {
			if (!this.client) {
				this.client = await MercuryClientFactory.Client({
					host: TEST_HOST,
					contracts: eventsContract,
				})
			}

			return this.client as ApiClient
		}
	}

	public connectToApi() {
		return this.getApiClientFactory()()
	}

	public async logout() {
		await this.disconnect()
		await this.connectToApi()
	}

	public async disconnect() {
		await this.client?.disconnect()
		this.client = undefined
	}
}
