import { ISchema, validateSchema } from '@sprucelabs/schema'
import { CORE_NAMESPACE, diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import AbstractSchemaTest from '../../AbstractSchemaTest'

const LOCAL_NAMESPACE = 'TestSkill'

export default class SchemaStoreTest extends AbstractSchemaTest {
	@test()
	protected static async canInstantiateSchemaStore() {
		assert.isTruthy(this.Store('schema'))
	}

	@test()
	protected static async hasFetchSchemaTemplateItemsMethod() {
		assert.isFunction(this.Store('schema').fetchSchemas)
		assert.isFunction(this.Store('schema').fetchFields)
	}

	@test()
	protected static async fetchesCoreSchemas() {
		const results = await this.Store('schema').fetchSchemas({
			localNamespace: LOCAL_NAMESPACE,
		})
		const { schemasByNamespace, errors } = results

		assert.isEqual(errors.length, 0)
		assert.isTruthy(schemasByNamespace[CORE_NAMESPACE])

		const coreSchemas = schemasByNamespace[CORE_NAMESPACE]
		assert.isAbove(coreSchemas.length, 0)

		this.validateSchemas(coreSchemas)

		assert.doesInclude(coreSchemas, { id: 'person' })
		assert.doesInclude(coreSchemas, { id: 'skill' })
	}

	@test()
	protected static async fetchesLocalSchemas() {
		const results = await this.copySchemasAndFetchSchemas({
			localSchemaDir: this.resolvePath('src', 'schemas'),
		})
		const { schemasByNamespace, errors } = results

		assert.isEqual(errors.length, 0)
		assert.isTruthy(schemasByNamespace[LOCAL_NAMESPACE])
		assert.isLength(Object.keys(schemasByNamespace), 2)

		const localSchemas = schemasByNamespace[LOCAL_NAMESPACE]

		this.validateSchemas(localSchemas)
		assert.isLength(localSchemas, 3)
	}

	@test()
	protected static async canHandleABadSchema() {
		const results = await this.copySchemasAndFetchSchemas(
			{
				localSchemaDir: this.resolvePath('src', 'schemas'),
			},
			'test_builders_one_bad'
		)
		assert.isEqual(results.errors.length, 1)

		assert.doesInclude(results.errors[0].message, 'badSchema')

		const { schemasByNamespace } = results
		const localSchemas = schemasByNamespace[LOCAL_NAMESPACE]

		this.validateSchemas(localSchemas)
		assert.isLength(localSchemas, 3)
	}

	@test()
	protected static async canFetchCoreFields() {
		const results = await SchemaStoreTest.copySchemasAndFieldsThenFetchFields()

		const fieldTypes = Object.keys(FieldType)

		for (const type of fieldTypes) {
			assert.doesInclude(results, { 'fields[].registration.type': type })
		}
	}

	@test()
	protected static async canFetchLocalFields() {
		const results = await this.copySchemasAndFieldsThenFetchFields({
			localAddonsDir: this.resolvePath('src', 'addons'),
		})

		assert.isLength(results.errors, 0)
		assert.isLength(results.fields, Object.keys(FieldType).length + 1)
		assert.doesInclude(results, { 'fields[].registration.type': 'Test' })
		assert.doesInclude(results, {
			'fields[].registration.description': 'A test for us all',
		})
	}

	@test()
	protected static async canHandleBadFields() {
		const results = await this.copySchemasAndFieldsThenFetchFields(
			{
				localAddonsDir: this.resolvePath('src', 'addons'),
			},
			'field_registrations_one_bad'
		)

		assert.isLength(results.errors, 1)
		assert.doesInclude(results.errors[0].message, 'badField')
	}

	private static validateSchemas(schemas: ISchema[]) {
		for (const schema of schemas) {
			validateSchema(schema)
		}
	}

	private static async copySchemasAndFetchSchemas(
		options?: Record<string, any>,
		testBuilderDir = 'test_builders'
	) {
		await this.syncSchemas('schema-store')

		const schemasDir = this.resolvePath('src', 'schemas')
		await diskUtil.copyDir(this.resolveTestPath(testBuilderDir), schemasDir)

		const schemasByNamespace = await this.Store('schema').fetchSchemas({
			localNamespace: LOCAL_NAMESPACE,
			...(options || {}),
		})
		return schemasByNamespace
	}

	private static async copySchemasAndFieldsThenFetchFields(
		options?: Record<string, any>,
		registrationsDir = 'field_registrations'
	) {
		await this.syncSchemas('schema-store')

		const addonsDir = this.resolvePath('src', 'addons')
		await diskUtil.copyDir(this.resolveTestPath(registrationsDir), addonsDir)

		const results = await this.Store('schema').fetchFields(options)
		return results
	}
}
