import { assert, test } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import { CORE_SCHEMA_VERSION, CORE_NAMESPACE } from '../../../constants'
import { Service } from '../../../factories/ServiceFactory'
import { GeneratedFileAction } from '../../../types/cli.types'
import diskUtil from '../../../utilities/disk.utility'
import testUtil from '../../../utilities/test.utility'
import versionUtil from '../../../utilities/version.utility'

export default class CanSyncSchemas extends AbstractSchemaTest {
	@test()
	protected static async hasSyncSchemaFunction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('schema').syncSchemas)
	}

	@test()
	protected static async failsBecauseSchemasIsNotInstalled() {
		const cli = await this.Cli()
		assert.doesThrowAsync(
			() => cli.getFeature('schema').syncSchemas(),
			/SKILL_NOT_INSTALLED/gi
		)
	}

	@test()
	protected static async syncsSchemasGeneratesTypesFile() {
		const cli = await this.installSchemasAndSetCwd('in-sync')
		const results = await cli.getFeature('schema').syncSchemas()

		assert.isAbove(results.length, 0)
		assert.doesInclude(results, { action: GeneratedFileAction.Generated })

		const expectedSchemaTypesDestination = this.resolveHashSprucePath(
			'schemas',
			'schemas.types.ts'
		)

		assert.isEqual(this.schemaTypesFile, expectedSchemaTypesDestination)
		assert.isTrue(diskUtil.doesFileExist(this.schemaTypesFile))
	}

	@test()
	protected static async syncSchemasUpdatesTypesFile() {
		const cli = await this.syncSchemasAndSetCwd('in-sync')
		const results = await cli.getFeature('schema').syncSchemas()

		assert.isAbove(results.length, 0)
		assert.doesInclude(results, { action: GeneratedFileAction.Skipped })
	}

	@test()
	protected static async makeSureSchemaTypesAreVersioned() {
		await this.syncSchemasAndSetCwd('in-sync')

		const typesFile = this.schemaTypesFile
		const typesContents = diskUtil.readFile(typesFile)

		assert.doesInclude(
			typesContents,
			new RegExp(
				`SpruceSchemas.${CORE_NAMESPACE}.IPerson(.*?)interface ${CORE_SCHEMA_VERSION.constVal}`,
				'gis'
			)
		)
	}

	@test()
	protected static async schemaTypesVileIsValid() {
		await this.syncSchemasAndSetCwd('in-sync')

		const typesFile = this.schemaTypesFile
		await this.Service(Service.TypeChecker).check(typesFile)
	}

	@test()
	protected static async schemasStayInSyncAsFilesAreMoved() {
		const cli = await this.syncSchemasAndSetCwd('in-sync')
		const version = versionUtil.generateVersion()
		const typeChecker = this.Service(Service.TypeChecker)
		const matcher = new RegExp(
			`SpruceSchemas.Local.ITestSchema(.*?)interface ${version.constValue}`,
			'gis'
		)

		let typesContents = diskUtil.readFile(this.schemaTypesFile)

		// should not found our test schema
		assert.doesNotInclude(typesContents, matcher)

		const createResponse = await cli.getFeature('schema').createSchema({
			nameReadable: 'Test schema',
			nameCamel: 'testSchema',
		})

		const builderFile = testUtil.findPathByNameInGeneratedFiles(
			/testSchema\.builder/,
			createResponse
		)

		const definitionFile = testUtil.findPathByNameInGeneratedFiles(
			/testSchema\.definition/,
			createResponse
		)

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
		await cli.getFeature('schema').syncSchemas()

		// should lastly NOT include our test schema
		await typeChecker.check(this.schemaTypesFile)

		// our schema should be missing from the types file
		typesContents = diskUtil.readFile(this.schemaTypesFile)
		assert.doesNotInclude(typesContents, matcher)

		// and the definition should have been deleted
		assert.isFalse(diskUtil.doesFileExist(definitionFile))
	}
}
