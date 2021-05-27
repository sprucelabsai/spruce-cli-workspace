import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractEventTest from '../../../tests/AbstractEventTest'

export default class SkillEmitsBootEventsTest extends AbstractEventTest {
	@test()
	protected static async skillEmitsWillBootEvents() {
		await this.installEventFeature('events')
		const version = 'v2020_01_01'

		await this.Executer('event', 'listen').execute({
			eventNamespace: 'skill',
			eventName: 'will-boot',
			version,
		})

		await this.Service('build').build()

		const err = await assert.doesThrowAsync(async () => {
			const response = await this.Executer('skill', 'boot').execute({})
			await response.meta?.promise
		})

		errorAssertUtil.assertError(err, 'LISTENER_NOT_IMPLEMENTED')
	}

	@test()
	protected static async skillEmitsDidBootEvents() {
		await this.installEventFeature('events')
		const version = 'v2020_01_01'

		await this.Executer('event', 'listen').execute({
			eventNamespace: 'skill',
			eventName: 'did-boot',
			version,
		})

		await this.Service('build').build()

		const err = await assert.doesThrowAsync(async () => {
			const response = await this.Executer('skill', 'boot').execute({})
			await response.meta?.promise
		})

		errorAssertUtil.assertError(err, 'LISTENER_NOT_IMPLEMENTED')
	}
}
