import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../../test/AbstractEventTest'
import testUtil from '../../../utilities/test.utility'

export default class SkillEmitsBootstrapEventTest extends AbstractEventTest {
	@test()
	protected static async createsValidListener() {
		const cli = await this.installEventFeature('events')

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

		// make sure the listener doesn't throw exception (all new listeners will throw NOT_IMPLEMENTED) error
		diskUtil.writeFile(match, 'export default () => {}')

		await this.Service('typeChecker').check(match)

		const health = await cli.checkHealth()

		assert.isTruthy(health.skill)
		assert.isUndefined(health.skill.errors)
		assert.isTruthy(health.event)
		assert.doesInclude(health.event.listeners, {
			eventName: 'will-boot',
			eventNamespace: 'skill',
			version,
		})
	}
}
