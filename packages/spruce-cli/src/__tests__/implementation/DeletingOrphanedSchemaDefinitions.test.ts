import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../AbstractSchemaTest'
import schemaGeneratorUtil from '../../utilities/schemaGenerator.utility'

export default class DeletingOrphanedSchemaDefinitionsTest extends AbstractSchemaTest {
	@test()
	protected static async hasFunction() {
		assert.isFunction(schemaGeneratorUtil.filterSchemaFilesBySchemaIds)
	}

	@test()
	protected static async findsAllSchemas() {
		const results = await schemaGeneratorUtil.filterSchemaFilesBySchemaIds(
			this.resolveTestPath('schemas'),
			['one', 'two']
		)

		assert.isEqual(results.length, 0)
	}

	@test()
	protected static async findsOneMissing() {
		const results = await schemaGeneratorUtil.filterSchemaFilesBySchemaIds(
			this.resolveTestPath('schemas'),
			['one']
		)

		assert.isEqual(results.length, 1)
		assert.doesInclude(results[0], /two\.definition\.[t|j]s/gi)
	}
}
