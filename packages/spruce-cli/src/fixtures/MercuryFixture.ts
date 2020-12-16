import { MercuryClientFactory } from '@sprucelabs/mercury-client'
import eventsContract from '#spruce/events/events.contract'
import { ApiClient } from '../stores/AbstractStore'

const TEST_HOST = 'https://sandbox.mercury.spruce.ai'

export default class MercuryFixture {
	private client?: ApiClient

	public getApiClientFactory() {
		return async () => {
			debugger
			if (!this.client) {
				try {
					debugger
					this.client = await MercuryClientFactory.Client({
						host: TEST_HOST,
						contracts: eventsContract,
					})
				} catch (err) {
					debugger
					console.log(err)
				}
				debugger
			}

			return this.client as ApiClient
		}
	}

	public connectToApi() {
		return this.getApiClientFactory()()
	}

	public async disconnect() {
		await this.client?.disconnect()
	}
}
