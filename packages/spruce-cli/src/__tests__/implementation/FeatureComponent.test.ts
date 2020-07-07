import { Mercury } from '@sprucelabs/mercury'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import FeatureComponent from '../../components/FeatureComponent'
import ServiceFactory from '../../factories/ServiceFactory'
import FeatureManager from '../../features/FeatureManager'
import { FeatureCode } from '../../features/FeatureManager'

export default class FeatureComponentTest extends AbstractCliTest {
	private static FeatureComponent() {
		const serviceFactory = new ServiceFactory(new Mercury())
		const featureManager = FeatureManager.WithAllFeatures({
			cwd: this.cwd,
			serviceFactory
		})
		const featureComponent = new FeatureComponent(this.Term(), featureManager)
		return featureComponent
	}
	@test('Can create feature component')
	protected static async canCreateFeatureComponent() {
		const featureComponent = this.FeatureComponent()
		assert.isOk(featureComponent)
	}

	@test('Asks questions for installing the Skill Feature', FeatureCode.Skill, {
		name: 'test',
		description: 'test'
	})
	@test(
		'Honors default values for installing the Skill Feature',
		FeatureCode.Skill,
		{
			name: 'waka',
			description: 'test'
		},
		{
			name: 'waka'
		}
	)
	@test(
		'Asks questions for installing the Skill Feature Again',
		FeatureCode.Skill,
		{
			name: 'test',
			description: 'test'
		}
	)
	@test(
		'Skips questions when no options definition set',
		FeatureCode.Error,
		undefined
	)
	protected static async asksRightQuestions(
		feature: FeatureCode,
		expectedAnswers: Record<string, any> | undefined,
		values: Record<string, string> | undefined
	) {
		const featureComponent = this.FeatureComponent()
		const promise = featureComponent.prompt(feature, {
			// @ts-ignore
			values
		})
		const expectedTotalQuestions =
			Object.keys(expectedAnswers ?? {}).length -
			Object.keys(values ?? {}).length

		for (let i = 0; i < expectedTotalQuestions; i++) {
			await this.sendInput('test')
		}

		const answers = await promise
		assert.isEqualDeep(answers, expectedAnswers)
	}
}
