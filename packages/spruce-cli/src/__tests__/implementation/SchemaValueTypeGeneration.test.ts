import { Mercury } from '@sprucelabs/mercury'
import { templates } from '@sprucelabs/spruce-templates'
import { assert, test } from '@sprucelabs/test'
import BaseCliTest from '../../BaseCliTest'
import ServiceFactory from '../../factories/ServiceFactory'
import ValueTypeGenerator from '../../generators/ValueTypeGenerator'
import SchemaStore from '../../stores/SchemaStore'
import diskUtil from '../../utilities/disk.utility'

export default class SchemaValueTypeGenerationTest extends BaseCliTest {
	private static generator: ValueTypeGenerator

	protected static async beforeEach() {
		super.beforeEach()
		this.generator = new ValueTypeGenerator(templates)
	}

	@test()
	protected static async canInstantiate() {
		assert.isOk(this.generator)
	}

	@test()
	protected static async hasGenerateMethod() {
		assert.isFunction(this.generator.generateValueTypes)
	}

	@test()
	protected static async testBreaksBecause() {
		const results = this.generator.generateValueTypes({
			schemaTemplateItems: [],
			fieldTemplateItems: []
		})

		assert.isOk(results)
	}
	
	@test()
	protected static async runsWithoutBreakingWithNoArgs() {
		const results = this.generator.generateValueTypes({
			schemaTemplateItems: [],
			fieldTemplateItems: []
		})

		assert.isOk(results)
	}

	@test()
	protected static async runsWithNoErrorsWithArgs() {
		const results = await this.generateValueTypes()
		assert.isOk(results)
	}

	private static async generateValueTypes() {
		const schemasDir = this.resolvePath('schemas')
		const addonsDir = this.resolvePath('addons')

		diskUtil.copyDir(this.resolveTestPath('testSchemas'), schemasDir)

		const schemaStore = new SchemaStore(
			this.cwd,
			new ServiceFactory(new Mercury())
		)

		const schemaRequest = schemaStore.fetchSchemaTemplateItems({
			localLookupDir: schemasDir
		})

		const fieldRequest = schemaStore.fetchFieldTemplateItems({
			localLookupDir: addonsDir
		})

		const [schemaResults, fieldResults] = await Promise.all([
			schemaRequest,
			fieldRequest
		])

		return this.generator.generateValueTypes({
			schemaTemplateItems: schemaResults.items,
			fieldTemplateItems: fieldResults.items
		})
	}

	@test()
	protected static async saysItGeneratesSomeFiles() {
		const results = await this.generateValueTypes()
		assert.isAbove(results.generatedFiles.length, 0)
	}

	@test()
	protected static async actuallyGeneratesAFile() {
		const results = await this.generateValueTypes()
		const first = results.generatedFiles[0].path
		assert.isTrue(diskUtil.doesFileExist(first))
	}
}
