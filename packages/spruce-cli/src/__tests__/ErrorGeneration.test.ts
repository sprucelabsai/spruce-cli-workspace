import { assert, test } from '@sprucelabs/test'
import BaseCliTest from '../BaseCliTest'
import ErrorStore from '../stores/ErrorStore'

export default class ErrorStoreTest extends BaseCliTest {
	@test('Can create store')
	protected static canCreateStore() {
		const store = new ErrorStore()
		assert.isOk(store)
	}

	@test('Store fetchErrorTemplateItems method')
	protected static hasFetchErrorTemplateTimesMethod() {
		const store = new ErrorStore()
		assert.isFunction(store.fetchErrorTemplateItems)
	}

	@test('looking up bad directory throws error')
	protected static async badLookupNoItems() {
		const store = new ErrorStore()
		assert.throws(
			() => store.fetchErrorTemplateItems('/should-no-match-anything-ever'),
			/directory not found/i
		)
		console.log('in')
	}
}
