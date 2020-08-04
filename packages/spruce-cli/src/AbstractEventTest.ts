import AbstractCliTest from './AbstractCliTest'

export default abstract class AbstractEventTest extends AbstractCliTest {
	protected static async installEventFeature(cacheKey?: string) {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installFeatures(
			[
				{
					code: 'skill',
					options: {
						name: 'testing events',
						description: 'this too, is a great test!',
					},
				},
				{
					code: 'event',
				},
			],
			cacheKey
		)

		return cli
	}
}
