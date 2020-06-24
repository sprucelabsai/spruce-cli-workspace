import { test, assert } from '@sprucelabs/test'
import { FeatureCode } from '../../../FeatureManager'
import diskUtil from '../../../utilities/disk.utility'
import tsConfigUtil from '../../../utilities/tsConfig.utility'
import BaseSchemaTest from './BaseSchemaTest'

export default class SettingUpSchemasTests extends BaseSchemaTest {
	@test()
	protected static async failsBecauseMissingSkillInformation() {
		const cli = await this.Cli()

		await assert.throws(
			() =>
				cli.installFeatures({
					features: [
						{
							code: FeatureCode.Schema
						}
					]
				}),
			'INVALID_FIELD'
		)
	}

	@test()
	protected static async installsSchema() {
		await this.bootCliInstallSchemasAndSetCwd()

		const pgkPath = this.resolvePath('package.json')
		const contents = JSON.stringify(diskUtil.readFile(pgkPath))

		assert.include(contents, '@sprucelabs/schema')

		// does the tsconfig have the right values?
		const tsConfig = tsConfigUtil.readConfig(this.cwd)

		assert.deepEqual(tsConfig['compilerOptions']['paths'], {
			'#spruce/*': ['.spruce/*'],
			'#spruce:schema/*': ['.spruce/schemas/*']
		})
	}

	@test()
	protected static async schemaPassesHealthCheck() {
		const cli = await this.bootCliInstallSchemasAndSetCwd()
		const status = await cli.checkHealth()

		assert.equal(status.schema.status, 'passed')
	}
}
