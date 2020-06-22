import { test, assert } from '@sprucelabs/test'
import BaseCliTest from '../../BaseCliTest'
import { FeatureCode } from '../../FeatureManager'

export default class SettingUpASkill extends BaseCliTest {
	@test()
	protected static async setsUpASkillWithoutError() {
		const cli = await this.Cli()
		const response = await cli.installFeature(FeatureCode.Skill, {
			name: 'test',
			description: 'This is such a good skill!'
		})

		assert.isOk(response)
	}

	@test()
	protected static async failsWithBadParams() {
		const cli = await this.Cli()
		await assert.throws(async () => {
			await cli.installFeature(FeatureCode.Skill, {
				name: 'test',
				description2: 'This is such a good skill!'
			})
		}, 'description')
	}
}
