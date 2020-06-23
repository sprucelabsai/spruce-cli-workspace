import { test, assert } from '@sprucelabs/test'
import BaseCliTest from '../../BaseCliTest'
import { FeatureCode } from '../../FeatureManager'
import diskUtil from '../../utilities/disk.utility'
import tsConfigUtil from '../../utilities/tsConfig.utility'

export default class SettingUpSchemasTests extends BaseCliTest {
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
		const cli = await this.Cli()
		await cli.installFeatures({
			features: [
				{
					code: FeatureCode.Skill,
					options: {
						name: 'test',
						description: 'again'
					}
				},
				{
					code: FeatureCode.Schema
				}
			]
		})

		// test if package.json has @sprucelabs/schema
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
}
