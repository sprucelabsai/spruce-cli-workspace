import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class EnvServiceTest extends AbstractCliTest {
	@test()
	protected static async envService() {
		const service = this.Service('env')
		assert.isTruthy(service)
	}

	@test('Can set string', 'MY_KEY', 'MY_VALUE', 'MY_KEY="MY_VALUE"')
	@test('Can set boolean true', 'MY_KEY', true, 'MY_KEY=true')
	@test('Can set boolean false', 'MY_KEY', false, 'MY_KEY=false')
	@test('Can set integer', 'MY_KEY', 123, 'MY_KEY=123')
	@test('Can set negative integer', 'MY_KEY', -1, 'MY_KEY=-1')
	@test('Can set negative integer', 'MY_KEY', -1, 'MY_KEY=-1')
	@test(
		'Can set uuid',
		'MY_KEY',
		'5fdaccbd40a09d00459b0e71',
		'MY_KEY="5fdaccbd40a09d00459b0e71"'
	)
	protected static async canGetAndSet(
		key: string,
		value: string | boolean | number,
		expected: string
	) {
		const service = this.Service('env')
		service.set(key, value)

		this.assertEnvIsExpected(expected)

		const actual = service.get(key)
		assert.isEqual(actual, value)
	}

	private static assertEnvIsExpected(expected: string) {
		const envPath = this.resolvePath('.env')
		const fileContents = diskUtil.readFile(envPath)
		assert.isEqual(fileContents, expected)
	}

	@test()
	protected static async canSetTwoUniqueKeys() {
		const service = this.Service('env')
		service.set('MY_KEY', 'MY_VALUE')
		service.set('OTHER_KEY', -1)

		this.assertEnvIsExpected('MY_KEY="MY_VALUE"\nOTHER_KEY=-1')

		assert.isEqual(service.get('MY_KEY'), 'MY_VALUE')
		assert.isEqual(service.get('OTHER_KEY'), -1)
	}

	@test()
	protected static async canSetTwoUniqueKeysAndChangeThem() {
		const service = this.Service('env')
		service.set('MY_KEY', 'MY_VALUE')
		service.set('OTHER_KEY', -1)
		service.set('MY_KEY', 'New')
		service.set('OTHER_KEY', -2)

		this.assertEnvIsExpected('MY_KEY="New"\nOTHER_KEY=-2')

		assert.isEqual(service.get('MY_KEY'), 'New')
		assert.isEqual(service.get('OTHER_KEY'), -2)
	}

	@test()
	protected static async getUnsetKeyReturnsUndefned() {
		const service = this.Service('env')
		const result = service.get('NOT_A_REAL_KEY')
		assert.isUndefined(result)
	}
}
