import { diskUtil, MERCURY_API_NAMESPACE } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractEventTest from '../../../tests/AbstractEventTest'
import testUtil from '../../../tests/utilities/test.utility'

export default class SkillEmitsBootstrapEventTest extends AbstractEventTest {
	@test()
	protected static async throwsWithBadNamespace() {
		const cli = await this.installEventFeature('events')
		const err = await assert.doesThrowAsync(() =>
			cli
				.getFeature('event')
				.Action('listen')
				.execute({ eventNamespace: 'taco-bell' })
		)

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['eventNamespace'],
		})
	}

	@test()
	protected static async throwsWithBadEventName() {
		const cli = await this.installEventFeature('events')
		const err = await assert.doesThrowAsync(() =>
			cli
				.getFeature('event')
				.Action('listen')
				.execute({ eventNamespace: 'mercuryApi', eventName: 'bad-time' })
		)

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['eventName'],
		})
	}

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
			results.files
		)

		assert.doesInclude(match, version)

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

	@test()
	protected static async creatingANewListenerAsksWhichEventToListenTo() {
		const cli = await this.installEventFeature('events')

		void cli.getFeature('event').Action('listen').execute({})

		await this.waitForInput()

		let lastInvocation = this.ui.lastInvocation()

		assert.isEqual(lastInvocation.command, 'prompt')
		assert.doesInclude(lastInvocation.options.label, 'namespace')

		await this.ui.sendInput(MERCURY_API_NAMESPACE)

		await this.waitForInput()

		lastInvocation = this.ui.lastInvocation()

		assert.doesInclude(lastInvocation.options.label, 'event')

		this.ui.reset()
	}

	@test.only()
	protected static async generatesTypedListenerForAnotherSkillsEvents() {
		const cliPromise = this.installEventFeature('events')

		const skillFixture = this.SkillFixture()

		const skill2 = await skillFixture.seedDummySkill({
			name: 'my second skill',
		})

		const orgFixture = this.OrganizationFixture()
		const org = await orgFixture.seedDummyOrg({ name: 'my org' })

		await orgFixture.installSkillAtOrganization(skill2.id, org.id)

		await skillFixture.registerEventContract(skill2, {
			eventSignatures: {
				'my-new-event': {},
			},
		})

		const cli = await cliPromise

		const skill = await skillFixture.registerCurrentSkill({
			name: 'my first skill',
		})

		await orgFixture.installSkillAtOrganization(skill.id, org.id)

		const results = await cli.getFeature('event').Action('listen').execute({
			eventNamespace: skill2.slug,
			eventName: 'my-new-event',
		})

		assert.isFalsy(results.errors)

		const listener = testUtil.assertsFileByNameInGeneratedFiles(
			'my-new-event.listener.ts',
			results.files
		)

		await this.Service('typeChecker').check(listener)

		await this.openInVsCode()
	}
}
