import { templates, IValueTypes } from '@sprucelabs/spruce-templates'
import { assert, test } from '@sprucelabs/test'
import AbstractSchemaTest from '../../AbstractSchemaTest'
import { CORE_NAMESPACE, CORE_SCHEMA_VERSION } from '../../constants'
import { Service } from '../../factories/ServiceFactory'
import SchemaGenerator from '../../generators/SchemaGenerator'
import diskUtil from '../../utilities/disk.utility'

export default class SchemaValueTypeGenerationTest extends AbstractSchemaTest {
	private static generator: SchemaGenerator
	protected static async beforeEach() {
		super.beforeEach()
		this.generator = new SchemaGenerator(templates)
		await this.installSchemasAndSetCwd('value-type-generation')
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

		assert.isOk(results)
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

		await this.Service(Service.TypeChecker).check(first)
	}

	@test(
		'generates person.firstName value type (string)',
		`${CORE_NAMESPACE}.person.${CORE_SCHEMA_VERSION.constValue}.firstName`,
		{
			type: 'string',
			value: 'string',
			definitionType: 'string',
		}
	)
	@test(
		'generates personLocation.roles value types (select)',
		`${CORE_NAMESPACE}.personLocation.${CORE_SCHEMA_VERSION.constValue}.roles`,
		{
			type: '("owner" | "groupManager" | "manager" | "teammate" | "guest")',
			value: '("owner" | "groupManager" | "manager" | "teammate" | "guest")',
			definitionType:
				'("owner" | "groupManager" | "manager" | "teammate" | "guest")',
		}
	)
	@test(
		'generates personLocation.person value type (schema)',
		`${CORE_NAMESPACE}.personLocation.${CORE_SCHEMA_VERSION.constValue}.person`,
		{
			type: `SpruceSchemas.${CORE_NAMESPACE}.IPerson.${CORE_SCHEMA_VERSION.constValue}`,
			value: '[personDefinition]',
			definitionType: `SpruceSchemas.${CORE_NAMESPACE}.Person.${CORE_SCHEMA_VERSION.constValue}.IDefinition[]`,
		}
	)
	@test(
		'generates acl dynamic field',
		`${CORE_NAMESPACE}.acl.${CORE_SCHEMA_VERSION.constValue}.__dynamicKeySignature`,
		{
			type: 'string[]',
			value: 'string[]',
			definitionType: 'string[]',
		}
	)
	protected static async importsTypes(
		path: string,
		expected: Record<string, any>
	) {
		const results = await this.generateValueTypes()

		const valueTypes = await this.Service(Service.Import).importDefault<
			IValueTypes
		>(results[0].path)

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
