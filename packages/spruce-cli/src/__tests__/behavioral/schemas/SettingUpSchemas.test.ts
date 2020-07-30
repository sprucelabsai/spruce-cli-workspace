import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import diskUtil from '../../../utilities/disk.utility'
import tsConfigUtil from '../../../utilities/tsConfig.utility'

export default class SettingUpSchemasTests extends AbstractSchemaTest {
	@test()
	protected static async failsBecauseMissingSkillInformation() {
		const cli = await this.Cli()

		await assert.doesThrowAsync(
			() =>
				cli.installFeatures({
					features: [
						{
							code: 'schema',
						},
					],
				}),
			'INVALID_FIELD'
		)
	}

	@test()
	protected static async installsSchema() {
		await this.installSchemaFeature('setting-up-schemas')

		const pgkPath = this.resolvePath('package.json')
		const contents = JSON.stringify(diskUtil.readFile(pgkPath))

		assert.doesInclude(contents, '@sprucelabs/schema')

		const tsConfig = tsConfigUtil.readConfig(this.cwd)

		assert.isEqualDeep(tsConfig['compilerOptions']['paths'], {
			'#spruce/*': ['.spruce/*'],
		})
	}

	@test()
	protected static async schemaPassesHealthCheck() {
		const cli = await this.installSchemaFeature('setting-up-schemas')
		const status = await cli.checkHealth()

		assert.isEqual(status.schema.status, 'passed')
	}
}
