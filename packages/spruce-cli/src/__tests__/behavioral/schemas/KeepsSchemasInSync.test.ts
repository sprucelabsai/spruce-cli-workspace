import { assert, test } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import { CORE_SCHEMA_VERSION, CORE_NAMESPACE } from '../../../constants'
import { Service } from '../../../factories/ServiceFactory'
import diskUtil from '../../../utilities/disk.utility'

export default class CanSyncSchemas extends AbstractSchemaTest {
	private static get schemaTypesFile() {
		return this.resolveHashSprucePath('schemas', 'schemas.types.ts')
	}

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
		const cli = await this.bootCliInstallSchemasAndSetCwd('sync1')
		await cli.syncSchemas()

		const expectedSchemaTypesDestination = this.resolveHashSprucePath(
			'schemas',
			'schemas.types.ts'
		)

		assert.isEqual(this.schemaTypesFile, expectedSchemaTypesDestination)
		assert.isTrue(diskUtil.doesFileExist(this.schemaTypesFile))
	}

	@test()
	protected static async makeSureSchemaTypesAreVersioned() {
		const cli = await this.bootCliInstallSchemasAndSetCwd('sync1')
		await cli.syncSchemas()

		const typesFile = CanSyncSchemas.schemaTypesFile
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
		const cli = await this.bootCliInstallSchemasAndSetCwd('sync1')
		await cli.syncSchemas()

		const typesFile = CanSyncSchemas.schemaTypesFile
		await this.Service(Service.TypeChecker).check(typesFile)
	}
}
