import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import FeatureCommandExecuter from '../../features/FeatureCommandExecuter'
import { FeatureCode } from '../../features/features.types'
import diskUtil from '../../utilities/disk.utility'

export default class FeatureCommandExecuterTest extends AbstractCliTest {
	@test()
	protected static async canInstantiateExecuter() {
		const executer = this.Executer('schema', 'create')
		assert.isOk(executer)
	}

	@test()
	protected static async shouldAsAllQuestionsOfFeature() {
		const executer = this.Executer('skill', 'create')
		const promise = executer.execute()

		this.sendInput('My new skill')
		this.sendInput('So great!')

		await promise

		await this.assertHealthySkillNamed('myNewSkill')
	}

	@test()
	protected static async shouldNotAskAlreadyAnsweredQuestions() {
		const executer = this.Executer('skill', 'create')
		const promise = executer.execute({ description: 'go team!' })

		this.sendInput('My great skill')

		await promise

		await this.assertHealthySkillNamed('myGreatSkill')
	}

	private static async assertHealthySkillNamed(name: string) {
		const cli = await this.Cli()
		const health = await cli.checkHealth()

		assert.isEqualDeep(health, { skill: { status: 'passed' } })

		const packageContents = diskUtil.readFile(this.resolvePath('package.json'))
		assert.doesInclude(packageContents, name)
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
			term: this.Term(),
		})

		return executer
	}
}
