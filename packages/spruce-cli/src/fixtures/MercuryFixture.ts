import { MercuryClientFactory } from '@sprucelabs/mercury-client'
import eventsContract from '#spruce/events/events.contract'
import {
	ApiClient,
	ApiClientFactory,
	ApiClientFactoryOptions,
} from '../types/apiClient.types'
import apiClientUtil from '../utilities/apiClient.utility'

const TEST_HOST = 'https://sandbox.mercury.spruce.ai'

export default class MercuryFixture {
	private clients: Record<string, ApiClient> = {}

	public getApiClientFactory(): ApiClientFactory {
		return async (options?: ApiClientFactoryOptions) => {
			const key = apiClientUtil.generateClientKey(options)

			if (!this.clients[key]) {
				this.clients[key] = await MercuryClientFactory.Client({
					host: TEST_HOST,
					contracts: eventsContract,
				})

				if (options) {
					await this.clients[key].emit('authenticate', {
						payload: options,
					})
				}
			}

			return this.clients[key] as ApiClient
		}
	}

	public connectToApi(options?: ApiClientFactoryOptions) {
		return this.getApiClientFactory()(options)
	}

	public async logout(client: ApiClient) {
		await this.disconnect(client)
		await this.connectToApi()
	}

	public async logoutAll() {
		for (const client of Object.values(this.clients)) {
			await this.logout(client)
		}
	}

	public async disconnect(client: ApiClient) {
		await client.disconnect()
		for (const key in this.clients) {
			if (this.clients[key] === client) {
				delete this.clients[key]
			}
		}
	}

	public async disconnectAll() {
		for (const client of Object.values(this.clients)) {
			await this.disconnect(client)
		}
	}
}
