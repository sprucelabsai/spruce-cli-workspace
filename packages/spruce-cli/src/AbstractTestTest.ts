import AbstractCliTest from './AbstractCliTest'

export default class AbstractTestTest extends AbstractCliTest {
	protected static async installTests(cacheKey?: string) {
		const fixture = this.FeatureFixture()
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
