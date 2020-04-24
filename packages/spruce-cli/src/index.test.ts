import BaseTest, { ISpruce, test, assert } from '@sprucelabs/test'
import Schema from '@sprucelabs/schema'
import { SpruceSchemas } from '../.spruce/schemas/schemas.types'

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

	@test('Schema can be instantiated')
	protected static async instantiateSchema() {
		const schema = new Schema(SpruceSchemas.local.OnboardingStore.definition)
		assert.isOk(schema)

		assert.expectType<string>('something')
	}
}
