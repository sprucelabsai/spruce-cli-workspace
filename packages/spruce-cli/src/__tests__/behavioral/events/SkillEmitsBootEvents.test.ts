import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../../test/AbstractEventTest'

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

		await assert.doesThrowAsync(async () => {
			const response = await cli.getFeature('skill').Action('boot').execute({})
			await response.meta?.promise
		}, 'SKILL_WILL_BOOT_NOT_IMPLEMENTED')
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

		await assert.doesThrowAsync(async () => {
			const response = await cli.getFeature('skill').Action('boot').execute({})
			await response.meta?.promise
		}, 'SKILL_DID_BOOT_NOT_IMPLEMENTED')
	}
}
