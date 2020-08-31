import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../AbstractSchemaTest'

export default class ValueTypeMappingTest extends AbstractSchemaTest {
	protected static async beforeEach() {
		await super.beforeEach()
		await this.installSchemaFeature('schema-value-type-mapping')
	}

	@test()
	protected static async generatedTypeMapsCanBeImportedAndIsCorrect() {
		const store = this.Store('schema')
		const templateResults = await store.fetchFieldTemplateItems(
			'no-local-fields-needed'
		)

		const fieldTemplateItems = templateResults.items

		const selectItem = fieldTemplateItems.find(
			(item) => item.camelType === 'select'
		)

		assert.isTruthy(selectItem)
		assert.isEqual(
			selectItem.valueTypeMapper,
			'SelectFieldValueTypeMapper<F extends ISelectFieldDefinition ? F: ISelectFieldDefinition>'
		)

		const textItem = fieldTemplateItems.find(
			(item) => item.camelType === 'text'
		)
		assert.isTruthy(textItem)
		assert.isUndefined(textItem.valueTypeMapper)

		const schemaItem = fieldTemplateItems.find(
			(item) => item.camelType === 'schema'
		)
		assert.isTruthy(schemaItem)

		assert.isEqual(
			schemaItem.valueTypeMapper,
			'SchemaFieldValueTypeMapper<F extends ISchemaFieldDefinition? F : ISchemaFieldDefinition, CreateEntityInstances>'
		)
	}

	@test()
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
			'SchemaFieldValueTypeMapper<F extends ISchemaFieldDefinition? F : ISchemaFieldDefinition, CreateEntityInstances>'
		)
		assert.doesInclude(
			typeContents,
			'SelectFieldValueTypeMapper<F extends ISelectFieldDefinition ? F: ISelectFieldDefinition>'
		)

		await this.Service('typeChecker').check(fieldTypesFile)
	}
}
