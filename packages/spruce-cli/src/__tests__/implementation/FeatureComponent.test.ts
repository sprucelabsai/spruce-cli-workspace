import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import FeatureComponent from '../../components/FeatureComponent'
import { FeatureCode } from '../../features/features.types'

export default class FeatureComponentTest extends AbstractCliTest {
	private static FeatureComponent() {
		const installer = this.FeatureInstaller()
		const featureComponent = new FeatureComponent(this.Term(), installer)
		return featureComponent
	}
	@test('Can create feature component')
	protected static async canCreateFeatureComponent() {
		const featureComponent = this.FeatureComponent()
		assert.isOk(featureComponent)
	}

	@test('Asks questions for installing the Skill Feature', 'skill', {
		name: 'test',
		description: 'test',
	})
	@test(
		'Honors default values for installing the Skill Feature',
		'skill',
		{
			name: 'waka',
			description: 'test',
		},
		{
			name: 'waka',
		}
	)
	@test('Asks questions for installing the Skill Feature Again', 'skill', {
		name: 'test',
		description: 'test',
	})
	@test('Skips questions when no options definition set', 'error', undefined)
	protected static async asksRightQuestions(
		feature: FeatureCode,
		expectedAnswers: Record<string, any> | undefined,
		values: Record<string, string> | undefined
	) {
		const featureComponent = this.FeatureComponent()
		const promise = featureComponent.prompt(feature, {
			// @ts-ignore
			values,
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
