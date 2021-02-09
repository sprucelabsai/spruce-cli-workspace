import { MercuryClient } from '@sprucelabs/mercury-client'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import { EventContracts } from '#spruce/events/events.contract'
import AbstractCliTest from '../../tests/AbstractCliTest'
import testUtil from '../../tests/utilities/test.utility'

export default class DeployingToSandboxTest extends AbstractCliTest {
	private static sandboxDemoNumber = process.env.SANDBOX_DEMO_NUMBER as string

	protected static async beforeAll() {
		await super.beforeAll()
		if (!this.sandboxDemoNumber) {
			assert.fail(
				'You gotta have a SANDBOX_DEMO_NUMBER set in your ENV for the Deploying to Sandbox test pass.'
			)
		}
	}

	protected static async beforeEach() {
		await super.beforeEach()

		const personFixture = this.PersonFixture()
		await personFixture.loginAsDemoPerson(this.sandboxDemoNumber)
	}

	protected static async afterEach() {
		await super.afterEach()

		const skillFixture = this.SkillFixture()
		await skillFixture.clearAllSkills()
	}

	@test()
	protected static async hasSetupSandboxAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('sandbox').Action('setup').execute)
	}

	@test()
	protected static async writesWillBootListener() {
		const cli = await this.FeatureFixture().installCachedFeatures('events')
		const results = await cli.getFeature('sandbox').Action('setup').execute({})

		assert.isFalsy(results.errors)
		const version = versionUtil.generateVersion().dirValue
		testUtil.assertsFileByNameInGeneratedFiles(
			`will-boot.${version}.listener.ts`,
			results.files
		)
	}

	@test()
	protected static async throwsHelpfulErrorWhenMissingParams() {
		const { cli } = await this.installAndLoginAndSetupForSandbox()

		const skill = await this.SkillFixture().registerCurrentSkill({
			name: 'My new skill',
		})

		await this.Store('skill').unregisterSkill(skill.id)

		const env = this.Service('env')

		env.unset('SKILL_NAME')
		env.unset('SKILL_SLUG')

		const err = await assert.doesThrowAsync(() =>
			cli.getFeature('skill').Action('boot').execute({ local: true })
		)

		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['env.SKILL_NAME', 'env.SKILL_SLUG'],
		})
	}

	@test()
	protected static async doesNotReRegisterIfNotRegisteredFirstTime() {
		const { cli, client } = await this.installAndLoginAndSetupForSandbox()

		const boot = await cli
			.getFeature('skill')
			.Action('boot')
			.execute({ local: true })

		boot.meta?.kill()

		const results2 = await client.emit(`list-skills::v2020_12_25`, {
			payload: { showMineOnly: true },
		})

		const { skills: skills2 } = eventResponseUtil.getFirstResponseOrThrow(
			results2
		)

		assert.isLength(skills2, 0)
	}

	@test()
	protected static async skipsAlreadyRegisteredSkill() {
		const { cli, client } = await this.installAndLoginAndSetupForSandbox()

		const registered = await this.SkillFixture().registerCurrentSkill({
			name: 'My new skill',
		})

		const boot = await cli
			.getFeature('skill')
			.Action('boot')
			.execute({ local: true })

		boot.meta?.kill()

		const skills = await this.fetchSkills(client)

		assert.isLength(skills, 1)
		assert.isTruthy(skills[0])
		assert.isEqual(skills[0].id, registered.id)
	}

	private static async installAndLoginAndSetupForSandbox() {
		await this.PersonFixture().loginAsDemoPerson()
		const client = await this.MercuryFixture().connectToApi()
		const cli = await this.FeatureFixture().installCachedFeatures('events')
		await cli.getFeature('sandbox').Action('setup').execute({})
		this.Service('env').set('SANDBOX_DEMO_NUMBER', this.sandboxDemoNumber)
		return { cli, client }
	}

	private static async fetchSkills(client: MercuryClient<EventContracts>) {
		const results = await client.emit(`list-skills::v2020_12_25`, {
			payload: {
				showMineOnly: true,
			},
		})
		const { skills } = eventResponseUtil.getFirstResponseOrThrow(results)

		return skills
	}
}
