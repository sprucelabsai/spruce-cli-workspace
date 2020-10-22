import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../test/AbstractSchemaTest'
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
			/What's the name of your skill\?' is required/gi
		)
	}

	@test()
	protected static async installsSchema() {
		await this.installSchemaFeature('schemas')

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
		const cli = await this.installSchemaFeature('schemas')
		const health = await cli.checkHealth()

		assert.isTruthy(health.schema)
		assert.isEqual(health.schema.status, 'passed')
	}
}
