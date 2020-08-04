import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../../AbstractEventTest'

const CACHE_KEY = 'boot-events'

export default class SkillEmitsBootEventsTest extends AbstractEventTest {
	@test()
	protected static async skillEmitsWillBootEvents() {
		const cli = await this.installEventFeature(CACHE_KEY)
		const version = 'v2020_01_01'

		await cli.getFeature('event').Action('listen').execute({
			eventNamespace: 'skill',
			eventName: 'will-boot',
			version,
		})

		await this.Service('build').build()

		await assert.doesThrowAsync(
			() => cli.getFeature('skill').Action('boot').execute({}),
			'SKILL_BOOT_NOT_IMPLEMENTED'
		)
	}
}
