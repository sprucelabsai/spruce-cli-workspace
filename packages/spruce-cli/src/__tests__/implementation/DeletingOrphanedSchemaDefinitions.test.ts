import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../AbstractSchemaTest'

export default class DeletingOrphanedSchemaDefinitionsTest extends AbstractSchemaTest {
	@test()
	protected static async test() {
		assert.fail()
	}
}
