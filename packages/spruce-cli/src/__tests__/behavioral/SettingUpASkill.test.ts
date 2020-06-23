import { test, assert } from '@sprucelabs/test'
import BaseCliTest from '../../BaseCliTest'
import { HASH_SPRUCE_DIR } from '../../constants'
import { FeatureCode } from '../../FeatureManager'
import diskUtil from '../../utilities/disk.utility'

export default class SettingUpASkill extends BaseCliTest {
	@test()
	protected static async setsUpASkillWithoutError() {
		const cli = await this.Cli()
		const response = await cli.installFeatures({
			features: [
				{
					code: FeatureCode.Skill,
					options: {
						name: 'test',
						description: 'This is such a good skill!'
					}
				}
			]
		})

		assert.isOk(response)
	}

	@test()
	protected static async failsWithBadParams() {
		const cli = await this.Cli()
		await assert.throws(async () => {
			await cli.installFeatures({
				features: [
					{
						// @ts-ignore
						code: FeatureCode.Skill,
						options: {
							name: 'test',
							// @ts-ignore
							description2: 'This is such a good skill!'
						}
					}
				]
			})
		}, 'description')
	}

	@test()
	protected static async createsHashSpruceDir() {
		const cli = await this.Cli()
		await cli.installFeatures({
			features: [
				{
					code: FeatureCode.Skill,
					options: {
						name: 'test',
						description: 'This is such a good skill!'
					}
				}
			]
		})

		const hashSpruceDir = this.resolvePath(HASH_SPRUCE_DIR)
		assert.isTrue(diskUtil.doesDirExist(hashSpruceDir))
	}

	@test()
	protected static async failsHealthCheckWithNothingInstalled() {
		const cli = await this.Cli()
		const health = await cli.checkHealth()

		assert.equal(health.skill.status, 'failed')
		assert.include(health.skill.errors[0].options.code, 'SKILL_NOT_INSTALLED')
	}

	@test()
	protected static async getsAFailedHealthCheckWhenNodeModulesAreMoved() {
		const cli = await this.Cli()
		await cli.installFeatures({
			features: [
				{
					code: FeatureCode.Skill,
					options: {
						name: 'test',
						description: 'This is such a good skill!'
					}
				}
			]
		})

		diskUtil.moveDir(
			this.resolvePath('node_modules'),
			this.resolvePath('node_modules2')
		)

		const health = await cli.checkHealth()

		assert.equal(health.skill.status, 'failed')
		assert.include(health.skill.errors[0].options.code, 'BOOT_ERROR')
	}

	@test.only()
	protected static async getsGoodHealthCheck() {
		const cli = await this.Cli()
		await cli.installFeatures({
			features: [
				{
					code: FeatureCode.Skill,
					options: {
						name: 'test',
						description: 'This is such a good skill!'
					}
				}
			]
		})

		const health = await cli.checkHealth()
		assert.equal(health.skill.status, 'passed')
	}
}
