import * as coreSchemas from '@sprucelabs/spruce-core-schemas'
import {
	diskUtil,
	HealthCheckResults,
	versionUtil,
} from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import FeatureCommandExecuter from '../../features/FeatureCommandExecuter'
import { FeatureCode } from '../../features/features.types'
import AbstractSchemaTest from '../../test/AbstractSchemaTest'
import testUtil from '../../utilities/test.utility'

export default class FeatureCommandExecuterTest extends AbstractSchemaTest {
	protected static async beforeEach() {
		await super.beforeEach()
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

		await this.waitForInput()

		await this.ui.sendInput('My new skill')
		await this.ui.sendInput('So great!')

		await promise

		await this.assertHealthySkillNamed('my-new-skill')
	}

	@test()
	protected static async shouldNotAskAlreadyAnsweredQuestions() {
		const executer = this.Executer('skill', 'create')
		const promise = executer.execute({ description: 'go team!' })

		await this.waitForInput()

		void this.ui.sendInput('Already answered skill')

		await promise

		await this.assertHealthySkillNamed('already-answered-skill')
	}

	private static async assertHealthySkillNamed(
		name: string,
		expectedHealth: HealthCheckResults = { skill: { status: 'passed' } },
		expectedInstalledSkills: FeatureCode[] = ['skill']
	) {
		const cli = await this.Cli()
		await this.linkLocalPackages()

		const health = await cli.checkHealth()

		// @ts-ignore
		if (health.schema?.schemas) {
			//@ts-ignore
			health.schema.schemas = this.sortSchemas(health.schema.schemas)
		}

		assert.isEqualDeep(health, expectedHealth)

		const packageContents = diskUtil.readFile(this.resolvePath('package.json'))
		assert.doesInclude(packageContents, name)

		const installer = this.FeatureInstaller()

		for (const code of expectedInstalledSkills) {
			const isInstalled = await installer.isInstalled(code)
			assert.isTrue(isInstalled)
		}
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
		const isInstalled = await installer.isInstalled('test')

		assert.isTrue(isInstalled)
	}

	@test.only()
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
			'skills'
		)

		const executer = this.Executer('event', 'listen')
		const promise = executer.execute()

		await this.waitForInput()

		debugger
		await this.ui.sendInput('skill')
		await this.ui.sendInput('will-boot')

		const results = await promise

		testUtil.assertsFileByNameInGeneratedFiles(
			'will-boot.listener.ts',
			results.files ?? []
		)
	}

	@test()
	protected static async shouldAskInstallDependentFeatures() {
		const executer = this.Executer('schema', 'create')
		void executer.execute()

		await this.waitForInput()

		this.ui.reset()
		const lastQuestion = this.ui.lastInvocation()

		assert.isEqual(lastQuestion.command, 'confirm')
		assert.doesInclude(lastQuestion.options, /install the skill feature/gi)
	}

	@test()
	protected static async shouldInstallDependentFeatures() {
		const executer = this.Executer('schema', 'create')
		const promise = executer.execute()

		await this.waitForInput()

		await this.ui.sendInput('\n')

		await this.ui.sendInput('Skill with 1 dependency')
		await this.ui.sendInput('A skill that is so good')

		await this.waitForInput()

		await this.ui.sendInput('\n')

		await this.ui.sendInput('Restaurant')
		await this.ui.sendInput('\n')

		await promise

		await this.assertHealthySkillNamed('skill-with-1-dependency', {
			skill: { status: 'passed' },
			schema: {
				status: 'passed',
				schemas: this.generateExpectedHealthSchemas([
					...Object.values(coreSchemas),
					{
						id: 'restaurant',
						name: 'Restaurant',
						namespace: 'SkillWith1Dependency',
						version: versionUtil.generateVersion().constValue,
					},
				]),
			},
		})

		const installer = this.FeatureInstaller()
		const isInstalled = await installer.isInstalled('schema')

		assert.isTrue(isInstalled)
	}

	@test()
	protected static async shouldInstallTwoDependentFeatures() {
		const executer = this.Executer('error', 'create')
		const promise = executer.execute()

		await this.waitForInput()

		await this.ui.sendInput('\n')

		await this.ui.sendInput('My skill with 2 dependent features')

		await this.ui.sendInput('A skill that is so good')

		await this.waitForInput()

		await this.ui.sendInput('\n')

		await this.waitForInput()

		await this.ui.sendInput('\n')

		await this.ui.sendInput('Test error')

		await this.ui.sendInput('\n')

		await promise

		await this.assertHealthySkillNamed('my-skill-with-2-dependent-features', {
			skill: { status: 'passed' },
			schema: {
				status: 'passed',
				schemas: this.generateExpectedHealthSchemas([
					...Object.values(coreSchemas),
				]),
			},
			error: {
				errorSchemas: [{ name: 'Test error', id: 'testError' }],
				status: 'passed',
			},
		})

		const installer = this.FeatureInstaller()
		const isInstalled = await installer.isInstalled('schema')

		assert.isTrue(isInstalled)
	}

	@test()
	protected static async shouldReturnProperSummary() {
		const executer = this.Executer('skill', 'create')
		const results = await executer.execute({
			name: 'install summary test skill',
			description: 'go team!',
		})

		assert.isTruthy(results.files)
		assert.isTruthy(results.packagesInstalled)

		assert.isAbove(results.files.length, 0)
		assert.isAbove(results.packagesInstalled.length, 0)
	}

	@test.skip()
	protected static async canSkipOptionalDependencies() {
		const executer = this.Executer('error', 'create')
		const promise = executer.execute()

		await this.waitForInput()

		assert.doesInclude(this.ui.lastInvocation(), {
			command: 'prompt',
			options: {
				type: 'select',
				options: {
					choices: [
						{
							value: 'yes',
							label: 'Yes',
						},
						{
							value: 'no',
							label: 'No',
						},
						{
							value: 'alwaysSkip',
							label: 'Always skip',
						},
					],
				},
			},
		})

		await this.ui.sendInput('no')
		await this.ui.sendInput('no')

		await this.ui.sendInput('')

		await this.waitForInput()

		await this.ui.sendInput('My new error')
		await this.ui.sendInput('')

		await promise

		debugger
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
			term: this.ui,
		})

		return executer
	}
}
