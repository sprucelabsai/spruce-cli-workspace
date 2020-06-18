import { ISpruce, test, assert } from '@sprucelabs/test'
import { Feature } from '#spruce/autoloaders/features'
import BaseCliTest from '../BaseCliTest'
import FeatureComponent from './FeatureComponent'

export default class FeatureComponentTest extends BaseCliTest {
	@test('Can create feature component')
	protected static async canCreateFeatureComponent() {
		const featureComponent = new FeatureComponent({ term: this.term() })
		assert.isOk(featureComponent)
	}

	@test('Asks questions for installing the Skill Feature', Feature.Skill, {
		name: 'test',
		description: 'test'
	})
	@test(
		'Honors default values for installing the Skill Feature',
		Feature.Skill,
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
		Feature.Skill,
		{
			name: 'test',
			description: 'test'
		}
	)
	@test(
		'Skips questions when no options definition set',
		Feature.Error,
		undefined
	)
	protected static async asksRightQuestions(
		spruce: ISpruce,
		feature: Feature,
		expectedAnswers: Record<string, any> | undefined,
		values: Record<string, string> | undefined
	) {
		const cli = await this.cli()
		const featureComponent = new FeatureComponent({ term: this.term() })
		const promise = featureComponent.prompt(cli.features[feature], {
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
		assert.deepEqual(answers, expectedAnswers)
	}
}
