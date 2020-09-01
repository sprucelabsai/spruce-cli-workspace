import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { templates, IValueTypes } from '@sprucelabs/spruce-templates'
import { assert, test } from '@sprucelabs/test'
import AbstractSchemaTest from '../../AbstractSchemaTest'
import { CORE_NAMESPACE, CORE_SCHEMA_VERSION } from '../../constants'
import SchemaGenerator from '../../generators/SchemaGenerator'

export default class SchemaValueTypeGenerationTest extends AbstractSchemaTest {
	private static generator: SchemaGenerator
	protected static async beforeEach() {
		await super.beforeEach()
		this.generator = new SchemaGenerator({ templates, term: this.ui })

		const cli = await this.installSchemaFeature('schema-value-type-generation')

		const schemasDir = this.resolvePath('src', 'schemas')
		await diskUtil.copyDir(this.resolveTestPath('test_builders'), schemasDir)

		await cli.getFeature('schema').Action('sync').execute({})
	}

	@test()
	protected static async hasGenerateMethod() {
		assert.isFunction(this.generator.generateValueTypes)
	}

	@test()
	protected static async runsWithoutBreakingWithNoArgs() {
		const results = await this.generator.generateValueTypes(
			this.resolveHashSprucePath('tmp'),
			{
				schemaTemplateItems: [],
				fieldTemplateItems: [],
			}
		)

		assert.isTruthy(results)
	}

	private static async generateValueTypes() {
		const {
			fieldTemplateItems,
			schemaTemplateItems,
		} = await this.fetchAllTemplateItems()

		await this.generator.generateFieldTypes(
			this.resolveHashSprucePath('schemas'),
			{
				fieldTemplateItems,
			}
		)

		return this.generator.generateValueTypes(
			this.resolveHashSprucePath('tmp'),
			{
				schemaTemplateItems,
				fieldTemplateItems,
			}
		)
	}

	private static async fetchAllTemplateItems() {
		const schemaStore = this.StoreFactory().Store('schema')

		const results = await schemaStore.fetchAllTemplateItems()

		assert.isLength(results.schemas.errors, 0)

		return {
			schemaTemplateItems: results.schemas.items,
			fieldTemplateItems: results.fields.items,
		}
	}

	@test()
	protected static async generatesValidTypesFile() {
		const results = await this.generateValueTypes()
		assert.isAbove(results.length, 0)

		const first = results[0].path
		assert.isTrue(diskUtil.doesFileExist(first))

		await this.Service('typeChecker').check(first)
	}

	@test(
		'generates person.firstName value type (string)',
		`${CORE_NAMESPACE}.person.${CORE_SCHEMA_VERSION.constValue}.firstName.valueTypes`,
		{
			type: 'string',
			value: 'string',
			schemaType: 'string',
		}
	)
	@test(
		'generates personLocation.roles value types (select)',
		`${CORE_NAMESPACE}.personLocation.${CORE_SCHEMA_VERSION.constValue}.roles.valueTypes`,
		{
			type: '("owner" | "groupManager" | "manager" | "teammate" | "guest")',
			value: '("owner" | "groupManager" | "manager" | "teammate" | "guest")',
			schemaType:
				'("owner" | "groupManager" | "manager" | "teammate" | "guest")',
		}
	)
	@test(
		'generates personLocation.person value type (schema)',
		`${CORE_NAMESPACE}.personLocation.${CORE_SCHEMA_VERSION.constValue}.person.valueTypes`,
		{
			type: `SpruceSchemas.${CORE_NAMESPACE}.${CORE_SCHEMA_VERSION.constValue}.IPerson`,
			value: 'personSchema',
			schemaType: `SpruceSchemas.${CORE_NAMESPACE}.${CORE_SCHEMA_VERSION.constValue}.IPersonSchema`,
		}
	)
	@test(
		'generates acl dynamic field',
		`${CORE_NAMESPACE}.acl.${CORE_SCHEMA_VERSION.constValue}.__dynamicKeySignature.valueTypes`,
		{
			type: 'string[]',
			value: 'string[]',
			schemaType: 'string[]',
		}
	)
	protected static async importsTypes(
		path: string,
		expected: Record<string, any>
	) {
		const results = await this.generateValueTypes()

		const valueTypes = await this.Service('import').importDefault<IValueTypes>(
			results[0].path
		)

		assert.isObject(valueTypes)
		assert.isAbove(
			Object.keys(valueTypes).length,
			0,
			'Value types came back as empty object'
		)
		assert.doesInclude(valueTypes, {
			[path]: expected,
		})
	}
}
