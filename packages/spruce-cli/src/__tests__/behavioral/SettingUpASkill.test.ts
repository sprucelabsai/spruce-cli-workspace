import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import { FeatureCode } from '../../features/FeatureManager'
import diskUtil from '../../utilities/disk.utility'

export default class SettingUpASkill extends AbstractCliTest {
	@test()
	protected static async setsUpASkillWithoutError() {
		const cli = await this.Cli()
		const response = await cli.installFeatures({
			features: [
				{
					code: FeatureCode.Skill,
					options: {
						name: 'test',
						description: 'This is such a good skill!',
					},
				},
			],
		})

		assert.isOk(response)
	}

	@test()
	protected static async failsWithBadParams() {
		const cli = await this.Cli()
		await assert.doesThrowAsync(async () => {
			await cli.installFeatures({
				features: [
					{
						// @ts-ignore
						code: FeatureCode.Skill,
						options: {
							name: 'test',
							// @ts-ignore
							description2: 'This is such a good skill!',
						},
					},
				],
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
						description: 'This is such a good skill!',
					},
				},
			],
		})

		const hashSpruceDir = this.resolveHashSprucePath()
		assert.isTrue(diskUtil.doesDirExist(hashSpruceDir))
	}

	@test()
	protected static async failsHealthCheckWithNothingInstalled() {
		const cli = await this.Cli()
		const health = await cli.checkHealth()

		assert.isEqual(health.skill.status, 'failed')
		assert.doesInclude(health, {
			'skill.errors[].options.code': 'SKILL_NOT_INSTALLED',
		})
	}

	@test()
	protected static async getsAFailedHealthCheckWhenSrcDirIsMoved() {
		const cli = await this.Cli()
		await cli.installFeatures({
			features: [
				{
					code: FeatureCode.Skill,
					options: {
						name: 'test',
						description: 'This is such a good skill!',
					},
				},
			],
		})

		diskUtil.moveDir(this.resolvePath('src'), this.resolvePath('src2'))

		const health = await cli.checkHealth()

		assert.isEqual(health.skill.status, 'failed')
		assert.doesInclude(health, {
			'skill.errors[].options.code': 'BOOT_ERROR',
		})
	}

	@test()
	protected static async getsGoodHealthCheckAndNothingElse() {
		const cli = await this.Cli()
		await cli.installFeatures({
			features: [
				{
					code: FeatureCode.Skill,
					options: {
						name: 'test',
						description: 'This is such a good skill!',
					},
				},
			],
		})

		const health = await cli.checkHealth()

		if (health.skill?.errors && health.skill.errors.length > 0) {
			assert.fail(health.skill.errors?.[0].message)
		}

		assert.isEqualDeep(health, { skill: { status: 'passed' } })
	}
}
