import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../../AbstractEventTest'
import testUtil from '../../../utilities/test.utility'

export default class SkillEmitsBootstrapEventTest extends AbstractEventTest {
	@test()
	protected static async createsValidListener() {
		const cli = await this.installEventFeature('bootstrap-event')
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

		await this.Service('typeChecker').check(match)
	}
}
