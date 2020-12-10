import { diskUtil, HASH_SPRUCE_DIR } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class PersonStoreTest extends AbstractCliTest {
	protected static async beforeEach() {
		await super.beforeEach()
		diskUtil.createDir(this.resolvePath(HASH_SPRUCE_DIR))
	}

	@test()
	protected static async canInstantiatePersonStore() {
		assert.isTruthy(this.Store('person'))
	}

	@test()
	protected static async hasLoggedInPersonMethod() {
		assert.isFunction(this.Store('person').getLoggedInPerson)
	}

	@test()
	protected static async loggedInPersonIsNullWhenNotLoggedIn() {
		assert.isNull(this.Store('person').getLoggedInPerson())
	}

	@test()
	protected static async cantSaveBadLoggedInPerson() {
		const err = assert.doesThrow(() =>
			//@ts-ignore
			this.Store('person').setLoggedInPerson({ test: true })
		)

		errorAssertUtil.assertError(err, 'INVALID_FIELD')
	}

	@test()
	protected static canSaveLoggedInPerson() {
		const store = this.Store('person')
		const person = {
			id: 'test',
			casualName: 'friend',
			token: 'token',
		}

		store.setLoggedInPerson(person)

		const loggedIn = store.getLoggedInPerson()

		assert.isEqualDeep(loggedIn, { ...person, isLoggedIn: true })
	}

	@test()
	protected static canLogOut() {
		const store = this.Store('person')
		const person = {
			id: 'test',
			casualName: 'friend',
			token: 'token',
		}

		store.setLoggedInPerson(person)
		store.logOutPerson()

		assert.isNull(store.getLoggedInPerson())
	}
}
