import { assert, test } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import { CORE_SCHEMA_VERSION, CORE_NAMESPACE } from '../../../constants'
import { Service } from '../../../factories/ServiceFactory'
import { GeneratedFileAction } from '../../../types/cli.types'
import diskUtil from '../../../utilities/disk.utility'

export default class CanSyncSchemas extends AbstractSchemaTest {
	@test()
	protected static async hasSyncSchemaFunction() {
		const cli = await this.Cli()
		assert.isFunction(cli.syncSchemas)
	}

	@test()
	protected static async failsBecauseSchemasIsNotInstalled() {
		const cli = await this.Cli()
		assert.doesThrowAsync(() => cli.syncSchemas(), /SKILL_NOT_INSTALLED/gi)
	}

	@test()
	protected static async syncsSchemasGeneratesTypesFile() {
		const cli = await this.installSchemasAndSetCwd('sync1')
		const results = await cli.syncSchemas()

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
		const cli = await this.syncSchemasAndSetCwd('sync1')
		const results = await cli.syncSchemas()

		assert.isAbove(results.length, 0)
		assert.doesInclude(results, { action: GeneratedFileAction.Skipped })
	}

	@test()
	protected static async makeSureSchemaTypesAreVersioned() {
		await this.syncSchemasAndSetCwd('sync1')

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
		await this.syncSchemasAndSetCwd('sync1')

		const typesFile = CanSyncSchemas.schemaTypesFile
		await this.Service(Service.TypeChecker).check(typesFile)
	}
}
