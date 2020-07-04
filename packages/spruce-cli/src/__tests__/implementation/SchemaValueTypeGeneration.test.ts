import { Mercury } from '@sprucelabs/mercury'
import { templates } from '@sprucelabs/spruce-templates'
import { assert, test } from '@sprucelabs/test'
import AbstractSchemaTest from '../../AbstractSchemaTest'
import { CORE_NAMESPACE } from '../../constants'
import ServiceFactory, { Service } from '../../factories/ServiceFactory'
import SchemaGenerator from '../../generators/SchemaGenerator'
import SchemaStore from '../../stores/SchemaStore'
import { IValueTypes } from '../../types/cli.types'
import diskUtil from '../../utilities/disk.utility'

export default class SchemaValueTypeGenerationTest extends AbstractSchemaTest {
	private static generator: SchemaGenerator
	protected static async beforeEach() {
		super.beforeEach()
		this.generator = new SchemaGenerator(templates)
		await this.bootCliInstallSchemasAndSetCwd('value-type-generation')
	}

	@test()
	protected static async hasGenerateMethod() {
		assert.isFunction(this.generator.generateValueTypes)
	}

	@test()
	protected static async runsWithoutBreakingWithNoArgs() {
		const results = await this.generator.generateValueTypes(
			this.resolveHashSprucePath(),
			{
				schemaTemplateItems: [],
				fieldTemplateItems: []
			}
		)

		assert.isOk(results)
	}

	private static async generateValueTypes() {
		const {
			fieldTemplateItems,
			schemaTemplateItems
		} = await SchemaValueTypeGenerationTest.fetchAllTemplateItems()

		await this.generator.generateFieldTypes(
			this.resolveHashSprucePath('schemas'),
			{
				fieldTemplateItems
			}
		)

		return this.generator.generateValueTypes(
			this.resolveHashSprucePath('tmp'),
			{
				schemaTemplateItems,
				fieldTemplateItems
			}
		)
	}

	private static async fetchAllTemplateItems() {
		const schemaStore = new SchemaStore(
			this.cwd,
			new ServiceFactory(new Mercury())
		)

		const schemasDir = this.resolvePath('src/schemas')
		const addonsDir = this.resolvePath('src/addons')

		const schemaRequest = schemaStore.fetchSchemaTemplateItems(schemasDir)
		const fieldRequest = schemaStore.fetchFieldTemplateItems(addonsDir)

		const [schemaResults, fieldResults] = await Promise.all([
			schemaRequest,
			fieldRequest
		])

		return {
			schemaTemplateItems: schemaResults.items,
			fieldTemplateItems: fieldResults.items
		}
	}

	@test()
	protected static async generatesValidTypesFile() {
		const results = await this.generateValueTypes()
		assert.isAbove(results.generatedFiles.length, 0)

		const first = results.generatedFiles[0].path
		assert.isTrue(diskUtil.doesFileExist(first))

		await this.Service(Service.TypeChecker).check(first)
	}

	@test(
		'generates user.firstName value types',
		`${CORE_NAMESPACE}.person[].fields.firstName`,
		{
			Type: 'string',
			Value: 'string',
			DefinitionType: 'string'
		}
	)
	protected static async importsTypes(
		path: string,
		expected: Record<string, any>
	) {
		const results = await this.generateValueTypes()

		const valueTypes = await this.Service(Service.Import).importDefault<
			IValueTypes
		>(results.generatedFiles[0].path)

		assert.isObject(valueTypes)
		assert.isAbove(
			Object.keys(valueTypes).length,
			0,
			'Value types came back as empty object'
		)
		assert.doesInclude(valueTypes, {
			[path]: expected
		})
	}
}
