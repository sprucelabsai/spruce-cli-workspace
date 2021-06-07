import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'
import testUtil from '../../tests/utilities/test.utility'

export default class CreatingASkillTest extends AbstractCliTest {
	@test()
	protected static async creatingAtADestinationAsksForSkillDetailsOnce() {
		const promise = this.Action('skill', 'create', {
			shouldAutoHandleDependencies: true,
		}).execute({ destination: 'taco' })

		await this.waitForInput()

		await this.ui.sendInput('adventure')
		await this.ui.sendInput('i would not')

		const last = this.ui.lastInvocation()

		assert.isEqual(last.command, 'startLoading')

		const results = await promise

		testUtil.assertFileByPathInGeneratedFiles(
			/taco\/package\.json/gis,
			results.files
		)
	}
}
