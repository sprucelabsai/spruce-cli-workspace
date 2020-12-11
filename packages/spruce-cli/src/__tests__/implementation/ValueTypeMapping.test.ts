import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../tests/AbstractSchemaTest'

export default class ValueTypeMappingTest extends AbstractSchemaTest {
	protected static async beforeEach() {
		await super.beforeEach()
		await this.installSchemaFeature('schemas')
	}

	// WE NEED THIS TEST BACK WHEN WE TEST INTRODUCING NEW SCHEMA FIELDS
	@test.skip()
	protected static async dropsMappersIntoFieldTypes() {
		const cli = await this.Cli()
		await cli.getFeature('schema').Action('sync').execute({})

		const fieldTypesFile = this.resolveHashSprucePath(
			'schemas',
			'fields',
			'fields.types.ts'
		)
		const typeContents = diskUtil.readFile(fieldTypesFile)
		assert.doesInclude(
			typeContents,
			'SchemaFieldValueTypeMapper<F extends SchemaFieldFieldDefinition? F : SchemaFieldFieldDefinition, CreateEntityInstances>'
		)
		assert.doesInclude(
			typeContents,
			'SelectFieldValueTypeMapper<F extends SelectFieldDefinition ? F: SelectFieldDefinition>'
		)

		await this.Service('typeChecker').check(fieldTypesFile)
	}
}
