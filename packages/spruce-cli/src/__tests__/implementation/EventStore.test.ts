import { validateEventContract } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class EventStoreTest extends AbstractCliTest {
	@test()
	protected static async canInstantiateEventStore() {
		assert.isTruthy(this.Store('event'))
	}

	@test()
	protected static async hasFetchEventContractsMethod() {
		assert.isFunction(this.Store('event').fetchEventContracts)
	}

	@test()
	protected static async fetchesEventContracts() {
		const results = await this.Store('event').fetchEventContracts()
		const { contracts, errors } = results

		assert.isAbove(contracts.length, 0)

		for (const contract of contracts) {
			validateEventContract(contract)
		}
		assert.isEqual(errors.length, 0)
	}
}
