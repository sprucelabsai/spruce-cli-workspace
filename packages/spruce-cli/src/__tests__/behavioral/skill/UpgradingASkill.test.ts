import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../../AbstractCliTest'

export default class UpgradingASkillTest extends AbstractCliTest {
	@test()
	protected static async upgradeOvewritesOldIndexFile() {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installFeatures(
			[
				{
					code: 'skill',
					options: {
						name: 'testing events',
						description: 'this too, is a great test!',
					},
				},
			],
			'skill-upgrade'
		)

		const indexFile = this.resolvePath('src/index.ts')
		diskUtil.writeFile(indexFile, 'throw new Error("cheese!")')

		const response = await cli.checkHealth()

		assert.doesInclude(response, {
			'skill.errors[].stack': 'cheese',
		})
	}
}
