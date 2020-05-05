import BaseTest, { ISpruce, test, assert } from '@sprucelabs/test'

export default class TestFeatureTest extends BaseTest {
	@test('Can install the test feature')
	protected static async canInstallTestFeature(
		spruce: ISpruce,
		hello: string,
		world: string
	) {
		assert.isOk(spruce, 'Failed to load Spruce')
		assert.isOk(spruce.mercury, 'Mercury missing from Spruce')
		assert.equal(hello, 'hello')
		assert.equal(world, 'world')
	}
}
