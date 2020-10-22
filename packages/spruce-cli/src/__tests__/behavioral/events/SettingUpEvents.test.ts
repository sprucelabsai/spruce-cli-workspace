import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../../test/AbstractEventTest'

export default class SettingUpEventsTest extends AbstractEventTest {
	@test()
	protected static async setsUpEvents() {
		const cli = await this.installEventFeature('setting-up-events')
		const health = await cli.checkHealth()
		assert.isTruthy(health.event)
		assert.isEqual(health.event.status, 'passed')
	}
}
