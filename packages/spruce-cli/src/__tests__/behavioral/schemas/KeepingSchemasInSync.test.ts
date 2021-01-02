import * as coreSchemas from '@sprucelabs/spruce-core-schemas'
import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import {
	CORE_SCHEMA_VERSION,
	CORE_NAMESPACE,
	DEFAULT_GLOBAL_SCHEMA_NAMESPACE,
} from '@sprucelabs/spruce-skill-utils'
import { assert, test } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractSchemaTest from '../../../tests/AbstractSchemaTest'
import testUtil from '../../../tests/utilities/test.utility'

const TYPE_FILE_COUNT = 3
const SYNC_FILE_COUNT = Object.keys(coreSchemas).length + TYPE_FILE_COUNT
const MOCK_CORE_SYNC_FILE_COUNT = 3 + TYPE_FILE_COUNT

export default class KeepsSchemasInSyncTest extends AbstractSchemaTest {
	private static readonly coreSyncOptions = {
		generateCoreSchemaTypes: true,
	}

	@test()
	protected static async hasSyncSchemaAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('schema').Action('sync').execute)
	}

	@test()
	protected static async failsBecauseSchemasIsNotInstalled() {
		const cli = await this.Cli()

		const err = await assert.doesThrowAsync(() =>
			cli.getFeature('schema').Action('sync').execute({})
		)

		errorAssertUtil.assertError(err, 'FEATURE_NOT_INSTALLED')
	}

	@test()
	protected static async syncingWithNoSchemasSucceeds() {
		const cli = await this.installSchemaFeature('schemas')

		const results = await cli.getFeature('schema').Action('sync').execute({})

		assert.isFalsy(results.errors)

		testUtil.assertCountsByAction(results.files, {
			updated: 0,
			generated: SYNC_FILE_COUNT,
			skipped: 0,
		})
	}

	@test()
	protected static async syncingWithNoSchemasAnFetchCoreSchemasFalseSucceeds() {
		const cli = await this.installSchemaFeature('schemas')

		const results = await cli
			.getFeature('schema')
			.Action('sync')
			.execute({ fetchCoreSchemas: false })

		assert.isFalsy(results.errors)

		testUtil.assertCountsByAction(results.files, {
			updated: 0,
			generated: TYPE_FILE_COUNT,
			skipped: 0,
		})
	}

	@test()
	protected static async syncingCleansUpTempFiles() {
		const cli = await this.installSchemaFeature('schemas')

		const results = await cli.getFeature('schema').Action('sync').execute({})

		assert.isFalsy(results.errors)

		const tmpFile = this.resolveHashSprucePath(
			'schemas',
			'tmp',
			'valueType.tmp.ts'
		)

		assert.isFalse(diskUtil.doesFileExist(tmpFile))
	}

	@test()
	protected static async syncingCoreSchemasGeneratesTypesFile() {
		const cli = await this.installSchemaFeature('schemas')
		await this.copyMockCoreSchemas()

		const results = await cli
			.getFeature('schema')
			.Action('sync')
			.execute(this.coreSyncOptions)

		assert.isUndefined(results.errors)
		assert.isTruthy(results.files)
		assert.isLength(results.files, MOCK_CORE_SYNC_FILE_COUNT)

		testUtil.assertCountsByAction(results.files, {
			generated: MOCK_CORE_SYNC_FILE_COUNT,
			skipped: 0,
			updated: 0,
		})

		assert.isTrue(diskUtil.doesFileExist(this.coreSchemaTypesFile))
	}

	private static async copyMockCoreSchemas() {
		const source = this.resolveTestPath('mock_core_builders')
		const destination = this.resolvePath('src', 'schemas')

		await diskUtil.copyDir(source, destination)
	}

	@test()
	protected static async syncSchemasTwiceSkipsFiles() {
		const cli = await this.syncSchemas('schemas', this.coreSyncOptions)
		const results = await cli
			.getFeature('schema')
			.Action('sync')
			.execute(this.coreSyncOptions)

		assert.isFalsy(results.errors)
		assert.isAbove(results.files?.length, 0)

		testUtil.assertCountsByAction(results.files, {
			generated: 0,
			skipped: results.files?.length ?? 0,
			updated: 0,
		})
	}

	@test()
	protected static async makeSureSchemaTypesAreVersioned() {
		const cli = await this.installSchemaFeature('schemas')

		await this.copyMockCoreSchemas()

		const results = await cli
			.getFeature('schema')
			.Action('sync')
			.execute(this.coreSyncOptions)

		assert.isFalsy(results.errors)

		const typesContents = diskUtil.readFile(this.coreSchemaTypesFile)
		assert.doesInclude(
			typesContents,
			new RegExp(
				`SpruceSchemas.${CORE_NAMESPACE}.${CORE_SCHEMA_VERSION.constValue}(.*?)interface Person`,
				'gis'
			)
		)
	}

	@test()
	protected static async generateCoreSchemaTypesGeneratesValidFiles() {
		const cli = await this.installSchemaFeature('schemas')

		await this.copyMockCoreSchemas()

		const results = await cli
			.getFeature('schema')
			.Action('sync')
			.execute(this.coreSyncOptions)

		assert.isFalsy(results.errors)
		assert.isTruthy(results.files)

		await this.assertValidActionResponseFiles(results)

		const typesContents = diskUtil.readFile(this.coreSchemaTypesFile)

		assert.doesNotInclude(typesContents, /@sprucelabs\/spruce-core-schemas/gi)
		assert.doesInclude(
			typesContents,
			new RegExp(
				`export declare namespace ${DEFAULT_GLOBAL_SCHEMA_NAMESPACE}.${CORE_NAMESPACE}.${CORE_SCHEMA_VERSION.constValue}`,
				'gis'
			)
		)

		const orgSchema = testUtil.assertsFileByNameInGeneratedFiles(
			'organization.schema.ts',
			results.files
		)

		const locationSchemaContents = diskUtil.readFile(orgSchema)
		assert.doesInclude(locationSchemaContents, 'SchemaRegistry')
	}

	@test()
	protected static async canHandleHyphenSchemaIds() {
		const cli = await this.syncSchemas('schemas')

		const createResponse = await cli
			.getFeature('schema')
			.Action('create')
			.execute({
				nameReadable: 'Test schema',
				nameCamel: 'testSchema',
			})

		const builderPath = testUtil.assertsFileByNameInGeneratedFiles(
			'testSchema.builder.ts',
			createResponse.files
		)

		const contents = diskUtil
			.readFile(builderPath)
			.replace("id: 'testSchema'", "id: 'test-schema'")

		diskUtil.writeFile(builderPath, contents)

		const syncResults = await cli
			.getFeature('schema')
			.Action('sync')
			.execute({})

		const testSchema = testUtil.assertsFileByNameInGeneratedFiles(
			'test-schema.schema.ts',
			syncResults.files
		)

		const testSchemaContents = diskUtil.readFile(testSchema)
		assert.doesInclude(testSchemaContents, 'SchemaRegistry')

		await this.assertValidActionResponseFiles(syncResults)
	}

	@test()
	protected static async coreSchemasPullFromCoreSchemasModuleDuringNormalGeneration() {
		const cli = await this.syncSchemas('schemas')

		const createResponse = await cli
			.getFeature('schema')
			.Action('create')
			.execute({
				nameReadable: 'Test schema',
				nameCamel: 'testSchema',
			})

		for (const schema of Object.values(coreSchemas)) {
			const id = schema.id
			const match = testUtil.assertsFileByNameInGeneratedFiles(
				`${id}.schema.ts`,
				createResponse.files
			)
			const contents = diskUtil.readFile(match)
			assert.doesInclude(
				contents,
				`export { ${id}Schema as default } from '@sprucelabs/spruce-core-schemas'`
			)
		}
	}

	@test()
	protected static async schemasStayInSyncWhenBuildersAreDeleted() {
		const cli = await this.syncSchemas('schemas')
		const version = versionUtil.generateVersion()
		const typeChecker = this.Service('typeChecker')
		const createAction = cli.getFeature('schema').Action('create')

		const matcher = new RegExp(
			`SpruceSchemas.TestingSchemas.${version.constValue}(.*?)interface TestSchema`,
			'gis'
		)

		assert.isTrue(diskUtil.doesFileExist(this.schemaTypesFile))

		const createResponse = await createAction.execute({
			nameReadable: 'Test schema',
			nameCamel: 'testSchema',
		})

		const builderFile = testUtil.assertsFileByNameInGeneratedFiles(
			/testSchema\.builder/,
			createResponse.files
		)

		// make sure builder is versioned
		assert.doesInclude(builderFile, version.dirValue)

		const schemaFile = testUtil.assertsFileByNameInGeneratedFiles(
			/testSchema\.schema/,
			createResponse.files
		)

		// make sure this path is versioned
		assert.doesInclude(schemaFile, version.dirValue)
		assert.doesInclude(schemaFile, '/testingSchemas/')

		// schema types should be good
		await typeChecker.check(this.schemaTypesFile)

		// the types should include our test schema
		let typesContents = diskUtil.readFile(this.schemaTypesFile)
		assert.doesInclude(typesContents, matcher)

		// the schema file should exist
		assert.isTrue(diskUtil.doesFileExist(schemaFile))

		// DELETE builder and make sure we are cleaned up
		diskUtil.deleteFile(builderFile)

		// this should cleanup types and schema files
		await cli.getFeature('schema').Action('sync').execute({})

		assert.isTrue(diskUtil.doesFileExist(this.schemaTypesFile))

		// and the schema should have been deleted
		assert.isFalse(diskUtil.doesFileExist(schemaFile))
	}

	@test()
	protected static async canSyncSchemasWhenOnlyNodeModuleIsInstalled() {
		const cli = await this.FeatureFixture().installCachedFeatures(
			'schemasInNodeModule'
		)

		const results = await cli.getFeature('schema').Action('sync').execute({})
		assert.isFalsy(results.errors)

		await this.assertValidActionResponseFiles(results)
	}
}
