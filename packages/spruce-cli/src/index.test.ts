import BaseTest, { ISpruce, test, assert } from '@sprucelabs/test'

export default class IndexTest extends BaseTest {
	@test('Can do some trivial asserts', 'hello', 'world')
	protected static async canAccessVarsFromDecorator(
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
