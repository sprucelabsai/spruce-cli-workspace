import AbstractCliTest from './AbstractCliTest'
import FeatureFixture from './fixtures/FeatureFixture'

export default class AbstractTestTest extends AbstractCliTest {
	protected static async installTests(cacheKey?: string) {
		const fixture = new FeatureFixture(this.cwd)
		const cli = await fixture.installFeatures(
			[
				{
					code: 'skill',
					options: {
						name: 'testing tests',
						description: 'test testing!',
					},
				},
				{
					code: 'test',
				},
			],
			cacheKey,
			{ graphicsInterface: this.term }
		)
		return cli
	}
}
