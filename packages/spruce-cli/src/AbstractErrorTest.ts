import AbstractCliTest from './AbstractCliTest'
import FeatureFixture from './fixtures/FeatureFixture'

export default abstract class AbstractErrorTest extends AbstractCliTest {
	protected static async installErrorFeature(cacheKey?: string) {
		const fixture = new FeatureFixture(this.cwd)
		const cli = await fixture.installFeatures(
			[
				{
					code: 'skill',
					options: {
						name: 'testing',
						description: 'this is also a great test!',
					},
				},
				{
					code: 'error',
				},
			],
			cacheKey
		)

		return cli
	}
}
