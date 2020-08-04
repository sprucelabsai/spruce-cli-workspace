import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../../AbstractEventTest'
import testUtil from '../../../utilities/test.utility'

const CACHE_KEY = 'bootstrap-event'

export default class SkillEmitsBootstrapEventTest extends AbstractEventTest {
	@test()
	protected static async createsValidListener() {
		const cli = await this.installEventFeature(CACHE_KEY)

		const version = 'v2020_01_01'

		const results = await cli.getFeature('event').Action('listen').execute({
			eventNamespace: 'skill',
			eventName: 'will-boot',
			version,
		})

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'will-boot.listener.ts',
			results.files ?? []
		)

		assert.doesInclude(match, version)

		// make sure the listener doen't through, which it does by default based on the template
		diskUtil.writeFile(match, 'export default () => {}')

		await this.Service('typeChecker').check(match)

		const health = await cli.checkHealth()

		console.log(health.skill.errors)
		assert.isUndefined(health.skill.errors)

		assert.doesInclude(health.event.listeners, {
			eventName: 'will-boot',
			eventNamespace: 'skill',
			version,
		})
	}
}
