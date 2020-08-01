import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../../AbstractCliTest'
import FeatureFixture from '../../../fixtures/FeatureFixture'

export default class BootingASkillTest extends AbstractCliTest {
	@test()
	protected static async bootingWithoutBuildingThrowsGoodError() {
		const fixture = new FeatureFixture(this.cwd)
		const cli = await fixture.installFeatures([
			{
				code: 'skill',
				options: {
					name: 'testing events',
					description: 'this too, is a great test!',
				},
			},
		])

		await assert.doesThrowAsync(
			() => cli.getFeature('skill').Action('boot').execute({}),
			/You must build/gis
		)
	}

	@test()
	protected static async aSkillCanBeBootedAndKilled() {}
}
