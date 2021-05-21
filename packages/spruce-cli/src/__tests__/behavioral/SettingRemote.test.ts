import { test, assert } from '@sprucelabs/test'
import AbstractSkillTest from '../../tests/AbstractSkillTest'

export default class SettingRemoteTest extends AbstractSkillTest {
	public static skillCacheKey = 'events'

	@test.skip()
	protected static async hasSetRemoteAction() {
		assert.isFunction(this.cli.getFeature('event').Action('remote').execute)
	}
}
