import { assert, test } from '@sprucelabs/test'
import { HASH_SPRUCE_DIR, CORE_SCHEMA_VERSION } from '../../../constants'
import diskUtil from '../../../utilities/disk.utility'
import AbstractSchemaTest from '../../../AbstractSchemaTest'

export default class CanSyncSchemas extends AbstractSchemaTest {
	private static get schemaTypesFile() {
		return this.resolvePath(HASH_SPRUCE_DIR, 'schemas', 'schemas.types.ts')
	}

	@test()
	protected static async hasSyncSchemaFunction() {
		const cli = await this.Cli()
		assert.isFunction(cli.syncSchemas)
	}

	@test()
	protected static async failsBecauseSchemasIsNotInstalled() {
		const cli = await this.Cli()
		assert.throws(() => cli.syncSchemas(), /SKILL_NOT_INSTALLED/gi)
	}

	@test()
	protected static async syncsSchemasGeneratesTypesFile() {
		const cli = await this.bootCliInstallSchemasAndSetCwd('sync1')
		await cli.syncSchemas()

		const expectedSchemaTypesDestination = this.resolvePath(
			HASH_SPRUCE_DIR,
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

		assert.include(
			typesContents,
			`SpruceSchemas.Core.${CORE_SCHEMA_VERSION.constVal}.User`
		)
	}
}
