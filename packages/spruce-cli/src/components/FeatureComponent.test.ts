import { ISpruce, test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../AbstractCliTest'
import FeatureManager from '../FeatureManager'
import { FeatureCode } from '../FeatureManager'
import PkgService from '../services/PkgService'
import VsCodeService from '../services/VsCodeService'
import FeatureComponent from './FeatureComponent'

export default class FeatureComponentTest extends AbstractCliTest {
	private static FeatureComponent() {
		const pkgService = new PkgService(this.cwd)
		const vsCodeService = new VsCodeService(this.cwd)
		const featureManager = FeatureManager.WithAllFeatures(
			this.cwd,
			pkgService,
			vsCodeService
		)
		const featureComponent = new FeatureComponent(this.Term(), featureManager)
		return featureComponent
	}
	@test('Can create feature component')
	protected static async canCreateFeatureComponent() {
		const featureComponent = FeatureComponentTest.FeatureComponent()
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
		spruce: ISpruce,
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
		assert.deepEqual(answers, expectedAnswers)
	}
}
