import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import {
	CORE_SCHEMA_VERSION,
	CORE_NAMESPACE,
	DEFAULT_NAMESPACE_PREFIX,
} from '@sprucelabs/spruce-skill-utils'
import { assert, test } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import testUtil from '../../../utilities/test.utility'

export default class KeepsSchemasInSyncTest extends AbstractSchemaTest {
	private static readonly coreSyncOptions = {
		generateCoreSchemaTypes: true,
		fetchLocalSchemas: false,
		fetchRemoteSchemas: false,
	}

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
	protected static async cantSyncCoreAndLocalSchemas() {
		const cli = await this.installSchemaFeature('keeps-schemas-in-sync')
		await assert.doesThrowAsync(
			() =>
				cli.getFeature('schema').Action('sync').execute({
					generateCoreSchemaTypes: true,
					fetchLocalSchemas: true,
					fetchRemoteSchemas: false,
				}),
			/When `--generateCoreSchemaTypes true`, you must set `--fetchLocalSchemas false` and `--fetchRemoteSchemas false`/
		)
	}

	@test()
	protected static async cantSyncCoreAndRemoteSchemas() {
		const cli = await this.installSchemaFeature('keeps-schemas-in-sync')
		await assert.doesThrowAsync(
			() =>
				cli.getFeature('schema').Action('sync').execute({
					generateCoreSchemaTypes: true,
					fetchLocalSchemas: false,
					fetchRemoteSchemas: true,
				}),
			/When `--generateCoreSchemaTypes true`, you must set `--fetchLocalSchemas false` and `--fetchRemoteSchemas false`/
		)
	}

	@test()
	protected static async syncingWithNoSchemasSucceeds() {
		const cli = await this.installSchemaFeature('keeps-schemas-in-sync')

		const results = await cli.getFeature('schema').Action('sync').execute({})

		assert.isFalsy(results.errors)

		testUtil.assertCountsByAction(results.files ?? [], {
			updated: 0,
			generated: 11,
			skipped: 0,
		})
	}

	@test()
	protected static async syncingCoreSchemasGeneratesTypesFile() {
		const cli = await this.installSchemaFeature('keeps-schemas-in-sync')

		const results = await cli
			.getFeature('schema')
			.Action('sync')
			.execute(this.coreSyncOptions)

		assert.isUndefined(results.errors)
		assert.isTruthy(results.files)
		assert.isLength(results.files, 11)

		testUtil.assertCountsByAction(results.files ?? [], {
			generated: 11,
			skipped: 0,
			updated: 0,
		})

		assert.isTrue(diskUtil.doesFileExist(this.coreSchemaTypesFile))
	}

	@test()
	protected static async syncSchemasTwiceSkipsFiles() {
		const cli = await this.syncSchemas(
			'keeps-schemas-in-sync',
			this.coreSyncOptions
		)
		const results = await cli
			.getFeature('schema')
			.Action('sync')
			.execute(this.coreSyncOptions)

		assert.isFalsy(results.errors)
		assert.isAbove(results.files?.length, 0)

		testUtil.assertCountsByAction(results.files ?? [], {
			generated: 0,
			skipped: results.files?.length ?? 0,
			updated: 0,
		})
	}

	@test()
	protected static async makeSureSchemaTypesAreVersioned() {
		await this.syncSchemas('keeps-schemas-in-sync', this.coreSyncOptions)

		const typesContents = diskUtil.readFile(this.coreSchemaTypesFile)

		assert.doesInclude(
			typesContents,
			new RegExp(
				`SpruceSchemas.${CORE_NAMESPACE}.${CORE_SCHEMA_VERSION.constValue}(.*?)interface IPerson`,
				'gis'
			)
		)
	}

	@test()
	protected static async schemaGeneratesValidFiles() {
		const cli = await this.installSchemaFeature('keeps-schemas-in-sync')
		const results = await cli
			.getFeature('schema')
			.Action('sync')
			.execute(this.coreSyncOptions)

		assert.isFalsy(results.errors)
		assert.isTruthy(results.files)

		for (const file of results.files) {
			await this.Service('typeChecker').check(file.path)
		}

		const typesContents = diskUtil.readFile(this.coreSchemaTypesFile)

		assert.doesNotInclude(typesContents, /@sprucelabs\/spruce-core-schemas/gi)
		assert.doesInclude(
			typesContents,
			new RegExp(
				`export declare namespace ${DEFAULT_NAMESPACE_PREFIX}.${CORE_NAMESPACE}.${CORE_SCHEMA_VERSION.constValue}`,
				'gis'
			)
		)
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

		testUtil.assertsFileByNameInGeneratedFiles(
			'test-schema.schema.ts',
			syncResults.files ?? []
		)

		const typeChecker = this.Service('typeChecker')
		for (const file of syncResults.files ?? []) {
			await typeChecker.check(file.path)
		}
	}

	@test()
	protected static async schemasStayInSyncWhenBuildersAreDeleted() {
		const cli = await this.syncSchemas('keeps-schemas-in-sync')
		const version = versionUtil.generateVersion()
		const typeChecker = this.Service('typeChecker')
		const createAction = cli.getFeature('schema').Action('create')

		const matcher = new RegExp(
			`SpruceSchemas.Testing.${version.constValue}(.*?)interface ITestSchema`,
			'gis'
		)

		assert.isTrue(diskUtil.doesFileExist(this.schemaTypesFile))

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
		assert.doesInclude(schemaFile, '/testing/')

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
	protected static async nestedSchemasInDynamicFields() {
		const cli = await this.installSchemaFeature('keeps-schemas-in-sync')
		const schemasDir = this.resolvePath('src', 'schemas')

		await diskUtil.copyDir(
			this.resolveTestPath('dynamic_key_schemas'),
			schemasDir
		)

		const results = await cli.getFeature('schema').Action('sync').execute({})

		const typesPath = this.resolveHashSprucePath('schemas', 'schemas.types.ts')
		const typesContent = diskUtil.readFile(typesPath)
		assert.doesInclude(
			typesContent,
			"[eventNameWithOptionalNamespace:string]: { schemaId: 'eventSignature', version: 'v2020_07_22', values: SpruceSchemas.Testing.v2020_07_22.IEventSignature } | { schemaId: 'eventSignature2', version: 'v2020_07_22', values: SpruceSchemas.Testing.v2020_07_22.IEventSignature2 }"
		)

		await this.Service('typeChecker').check(typesPath)

		const schemaMatch = testUtil.assertsFileByNameInGeneratedFiles(
			'mercuryContract.schema.ts',
			results.files ?? []
		)
		await this.Service('typeChecker').check(schemaMatch)
	}
}
