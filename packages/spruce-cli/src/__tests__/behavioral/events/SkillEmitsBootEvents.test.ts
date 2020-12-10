import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractEventTest from '../../../tests/AbstractEventTest'

export default class SkillEmitsBootEventsTest extends AbstractEventTest {
	@test()
	protected static async skillEmitsWillBootEvents() {
		const cli = await this.installEventFeature('events')
		const version = 'v2020_01_01'

		await cli.getFeature('event').Action('listen').execute({
			eventNamespace: 'skill',
			eventName: 'will-boot',
			version,
		})

		await this.Service('build').build()

		const err = await assert.doesThrowAsync(async () => {
			const response = await cli.getFeature('skill').Action('boot').execute({})
			await response.meta?.promise
		})

		errorAssertUtil.assertError(err, 'SKILL_WILL_BOOT_NOT_IMPLEMENTED')
	}

	@test()
	protected static async skillEmitsDidBootEvents() {
		const cli = await this.installEventFeature('events')
		const version = 'v2020_01_01'

		await cli.getFeature('event').Action('listen').execute({
			eventNamespace: 'skill',
			eventName: 'did-boot',
			version,
		})

		await this.Service('build').build()

		const err = await assert.doesThrowAsync(async () => {
			const response = await cli.getFeature('skill').Action('boot').execute({})
			await response.meta?.promise
		})

		errorAssertUtil.assertError(err, 'SKILL_DID_BOOT_NOT_IMPLEMENTED')
	}
}
