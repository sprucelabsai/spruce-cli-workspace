import AbstractCliTest from './AbstractCliTest'

export default class AbstractTestTest extends AbstractCliTest {
	protected static async installTests() {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installCachedFeatures('tests', {
			graphicsInterface: this.ui,
		})
		return cli
	}
}
