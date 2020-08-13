import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import FeatureCommandExecuter from '../../features/FeatureCommandExecuter'
import { FeatureCode } from '../../features/features.types'
import testUtil from '../../utilities/test.utility'

export default class FeatureCommandExecuterTest extends AbstractCliTest {
	protected static async beforeEach() {
		super.beforeEach()
	}

	@test()
	protected static async canInstantiateExecuter() {
		const executer = this.Executer('schema', 'create')
		assert.isTruthy(executer)
	}

	@test()
	protected static async shouldAskAllQuestionsOfFeature() {
		const executer = this.Executer('skill', 'create')
		const promise = executer.execute()

		await this.wait(1000)

		await this.term.sendInput('My new skill')
		await this.term.sendInput('So great!')

		await promise

		await this.assertHealthySkillNamed('my-new-skill')
	}

	@test()
	protected static async shouldNotAskAlreadyAnsweredQuestions() {
		const executer = this.Executer('skill', 'create')
		const promise = executer.execute({ description: 'go team!' })

		await this.wait(1000)

		this.term.sendInput('My great skill')

		await promise

		await this.assertHealthySkillNamed('my-great-skill')
	}

	private static async assertHealthySkillNamed(name: string) {
		const cli = await this.Cli()
		await this.linkLocalPackages()

		const health = await cli.checkHealth()

		assert.isEqualDeep(health, { skill: { status: 'passed' } })

		const packageContents = diskUtil.readFile(this.resolvePath('package.json'))
		assert.doesInclude(packageContents, name)
	}

	@test()
	protected static async shouldInstallEvenIfFeatureHasNoOptionsSchema() {
		const executer = this.Executer('test', 'create')
		await executer.execute({
			type: 'behavioral',
			nameReadable: 'Testing Test Creation',
			nameCamel: 'testTestCreation',
		})

		const installer = this.FeatureInstaller()
		const feature = installer.getFeature('test')

		const isInstalled = await feature.isInstalled()
		assert.isTrue(isInstalled)
	}

	@test()
	protected static async shouldAddListenerWithoutBreakingOnSkill() {
		await this.FeatureFixture().installFeatures(
			[
				{
					code: 'skill',
					options: {
						name: 'listener-skill',
						description: 'Testing if listeners can be set.',
					},
				},
			],
			'feature-command-executer'
		)

		const executer = this.Executer('event', 'listen')
		const promise = executer.execute()

		await this.wait(1000)

		await this.term.sendInput('skill')
		await this.term.sendInput('will-boot')

		const results = await promise

		testUtil.assertsFileByNameInGeneratedFiles(
			'will-boot.listener.ts',
			results.files ?? []
		)
	}

	private static Executer<F extends FeatureCode>(
		featureCode: F,
		actionCode: string
	) {
		const featureInstaller = this.FeatureInstaller()

		const executer = new FeatureCommandExecuter({
			featureCode,
			actionCode,
			featureInstaller,
			term: this.term,
		})

		return executer
	}
}
