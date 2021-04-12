import { eventNameUtil } from '@sprucelabs/spruce-event-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../tests/AbstractEventTest'

export default class ListeningToAnEventYouCreateTest extends AbstractEventTest {
	@test()
	protected static async canListenToEventWeCreated() {
		const {
			currentSkill,
			cli,
		} = await this.registerCurrentSkillAndInstallToOrg()

		const fqen = eventNameUtil.join({
			eventName: 'register-skill-views',
			eventNamespace: currentSkill.slug,
			version: 'v2021_04_11',
		})

		const source = this.resolveTestPath(
			'skill_register_skill_views_event/src/events'
		)
		const destination = this.resolvePath('src/events')

		await diskUtil.copyDir(source, destination)

		const listenPromise = cli.getFeature('event').Action('listen').execute({})

		await this.waitForInput()
		await this.ui.sendInput(currentSkill.slug)

		await this.waitForInput()
		await this.ui.sendInput(fqen)

		const results = await listenPromise

		assert.isFalsy(results.errors)
	}
}
