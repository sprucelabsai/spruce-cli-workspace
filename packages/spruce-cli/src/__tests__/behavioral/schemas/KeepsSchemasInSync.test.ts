import { assert, test } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import { CORE_SCHEMA_VERSION, CORE_NAMESPACE } from '../../../constants'
import { Service } from '../../../factories/ServiceFactory'
import diskUtil from '../../../utilities/disk.utility'
import testUtil from '../../../utilities/test.utility'
import versionUtil from '../../../utilities/version.utility'

export default class KeepsSchemasInSyncTest extends AbstractSchemaTest {
	@test()
	protected static async hasSyncSchemaFunction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('schema').Action('sync').execute)
	}

	@test()
	protected static async failsBecauseSchemasIsNotInstalled() {
		const cli = await this.Cli()
		assert.doesThrowAsync(
			() => cli.getFeature('schema').Action('sync').execute({}),
			/SKILL_NOT_INSTALLED/gi
		)
	}

	@test()
	protected static async syncsSchemasGeneratesTypesFile() {
		const cli = await this.installSchemas('keeps-schemas-in-sync')
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
				`SpruceSchemas.${CORE_NAMESPACE}.IPerson(.*?)interface ${CORE_SCHEMA_VERSION.constValue}`,
				'gis'
			)
		)
	}

	@test()
	protected static async schemaTypesVileIsValid() {
		await this.syncSchemas('keeps-schemas-in-sync')

		const typesFile = this.schemaTypesFile
		await this.Service(Service.TypeChecker).check(typesFile)
	}

	@test()
	protected static async schemasStayInSyncAsFilesAreMoved() {
		const cli = await this.syncSchemas('keeps-schemas-in-sync')
		const version = versionUtil.generateVersion()
		const typeChecker = this.Service(Service.TypeChecker)
		const createAction = cli.getFeature('schema').Action('create')

		const matcher = new RegExp(
			`SpruceSchemas.Local.ITestSchema(.*?)interface ${version.constValue}`,
			'gis'
		)

		let typesContents = diskUtil.readFile(this.schemaTypesFile)

		// should not found our test schema
		assert.doesNotInclude(typesContents, matcher)

		const createResponse = await createAction.execute({
			nameReadable: 'Test schema',
			nameCamel: 'testSchema',
		})

		const builderFile = testUtil.findPathByNameInGeneratedFiles(
			/testSchema\.builder/,
			createResponse.files ?? []
		)

		// make sure builder is versioned
		assert.doesInclude(builderFile, version.dirValue)

		const definitionFile = testUtil.findPathByNameInGeneratedFiles(
			/testSchema\.definition/,
			createResponse.files ?? []
		)

		// make sure this path is versioned
		assert.doesInclude(definitionFile, version.dirValue)
		assert.doesInclude(definitionFile, '/local/')

		// schema types should be good
		await typeChecker.check(this.schemaTypesFile)

		// the types should include our test schema
		typesContents = diskUtil.readFile(this.schemaTypesFile)
		assert.doesInclude(typesContents, matcher)

		// the definition file should exist
		assert.isTrue(diskUtil.doesFileExist(definitionFile))

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
		assert.isFalse(diskUtil.doesFileExist(definitionFile))
	}
}
