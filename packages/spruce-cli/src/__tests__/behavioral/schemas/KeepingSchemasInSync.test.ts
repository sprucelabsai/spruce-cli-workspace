import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { assert, test } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import { CORE_SCHEMA_VERSION, CORE_NAMESPACE } from '../../../constants'
import testUtil from '../../../utilities/test.utility'

export default class KeepsSchemasInSyncTest extends AbstractSchemaTest {
	@test()
	protected static async hasSyncSchemaFunction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('schema').Action('sync').execute)
	}

	@test()
	protected static async failsBecauseSchemasIsNotInstalled() {
		const cli = await this.Cli()

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		assert.doesThrowAsync(
			() => cli.getFeature('schema').Action('sync').execute({}),
			/SKILL_NOT_INSTALLED/gi
		)
	}

	@test()
	protected static async syncsSchemasGeneratesTypesFile() {
		const cli = await this.installSchemaFeature('keeps-schemas-in-sync')
		const results = await cli.getFeature('schema').Action('sync').execute({})

		assert.isAbove(results.files?.length, 0)
		assert.doesInclude(results.files, { action: 'generated' })

		const expectedSchemaTypesDestination = this.resolveHashSprucePath(
			'schemas',
			'schemas.types.ts'
		)

		assert.isEqual(this.schemaTypesFile, expectedSchemaTypesDestination)
		assert.isTrue(diskUtil.doesFileExist(this.schemaTypesFile))
	}

	@test()
	protected static async syncSchemasUpdatesTypesFile() {
		const cli = await this.syncSchemas('keeps-schemas-in-sync')
		const results = await cli.getFeature('schema').Action('sync').execute({})

		assert.isAbove(results.files?.length, 0)
		assert.doesInclude(results.files, { action: 'skipped' })
	}

	@test()
	protected static async makeSureSchemaTypesAreVersioned() {
		await this.syncSchemas('keeps-schemas-in-sync')

		const typesFile = this.schemaTypesFile
		const typesContents = diskUtil.readFile(typesFile)

		assert.doesInclude(
			typesContents,
			new RegExp(
				`SpruceSchemas.${CORE_NAMESPACE}.${CORE_SCHEMA_VERSION.constValue}(.*?)interface IPerson`,
				'gis'
			)
		)
	}

	@test()
	protected static async schemaTypesVileIsValid() {
		await this.syncSchemas('keeps-schemas-in-sync')

		const typesFile = this.schemaTypesFile
		await this.Service('typeChecker').check(typesFile)
	}

	@test()
	protected static async canHandleHyphenSchemaIds() {
		const cli = await this.syncSchemas('keeps-schemas-in-sync')
		const createResponse = await cli
			.getFeature('schema')
			.Action('create')
			.execute({
				nameReadable: 'Test schema',
				nameCamel: 'testSchema',
			})

		const builderPath = testUtil.assertsFileByNameInGeneratedFiles(
			'testSchema.builder.ts',
			createResponse.files ?? []
		)

		const contents = diskUtil
			.readFile(builderPath)
			.replace("id: 'testSchema'", "id: 'test-schema'")

		diskUtil.writeFile(builderPath, contents)

		const syncResults = await cli
			.getFeature('schema')
			.Action('sync')
			.execute({})

		const schemaPath = testUtil.assertsFileByNameInGeneratedFiles(
			'test-schema.schema.ts',
			syncResults.files ?? []
		)

		await this.Service('typeChecker').check(schemaPath)
	}

	@test()
	protected static async schemasStayInSyncWhenDefinitionsAreDeleted() {
		const cli = await this.syncSchemas('keeps-schemas-in-sync')
		const version = versionUtil.generateVersion()
		const typeChecker = this.Service('typeChecker')
		const createAction = cli.getFeature('schema').Action('create')

		const matcher = new RegExp(
			`SpruceSchemas.Local.${version.constValue}(.*?)interface ITestSchema`,
			'gis'
		)

		let typesContents = diskUtil.readFile(this.schemaTypesFile)

		// should not found our test schema
		assert.doesNotInclude(typesContents, matcher)

		const createResponse = await createAction.execute({
			nameReadable: 'Test schema',
			nameCamel: 'testSchema',
		})

		const builderFile = testUtil.assertsFileByNameInGeneratedFiles(
			/testSchema\.builder/,
			createResponse.files ?? []
		)

		// make sure builder is versioned
		assert.doesInclude(builderFile, version.dirValue)

		const schemaFile = testUtil.assertsFileByNameInGeneratedFiles(
			/testSchema\.schema/,
			createResponse.files ?? []
		)

		// make sure this path is versioned
		assert.doesInclude(schemaFile, version.dirValue)
		assert.doesInclude(schemaFile, '/local/')

		// schema types should be good
		await typeChecker.check(this.schemaTypesFile)

		// the types should include our test schema
		typesContents = diskUtil.readFile(this.schemaTypesFile)
		assert.doesInclude(typesContents, matcher)

		// the definition file should exist
		assert.isTrue(diskUtil.doesFileExist(schemaFile))

		// DELETE builder and make sure we are cleaned up
		diskUtil.deleteFile(builderFile)

		// this should cleanup types and definition files
		await cli.getFeature('schema').Action('sync').execute({})

		// should lastly NOT include our test schema
		await typeChecker.check(this.schemaTypesFile)

		// our schema should be missing from the types file
		typesContents = diskUtil.readFile(this.schemaTypesFile)
		assert.doesNotInclude(typesContents, matcher)

		// and the definition should have been deleted
		assert.isFalse(diskUtil.doesFileExist(schemaFile))
	}

	@test()
	protected static async nestedSchemasInDynamicFields() {
		const cli = await this.installSchemaFeature('keeps-schemas-in-sync')
		const schemasDir = this.resolvePath('src', 'schemas')

		await diskUtil.copyDir(
			this.resolveTestPath('dynamic_key_schemas'),
			schemasDir
		)

		await cli.getFeature('schema').Action('sync').execute({})

		const typesPath = this.resolveHashSprucePath('schemas', 'schemas.types.ts')
		const typesContent = diskUtil.readFile(typesPath)
		assert.doesInclude(
			typesContent,
			"[eventNameWithOptionalNamespace:string]: { schemaId: 'eventSignature', version: 'v2020_07_22', values: SpruceSchemas.Local.v2020_07_22.IEventSignature } | { schemaId: 'eventSignature2', version: 'v2020_07_22', values: SpruceSchemas.Local.v2020_07_22.IEventSignature2 }"
		)

		await this.Service('typeChecker').check(typesPath)
	}
}
