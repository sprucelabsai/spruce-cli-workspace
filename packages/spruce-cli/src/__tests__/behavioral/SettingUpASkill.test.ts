import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'

export default class SettingUpASkill extends AbstractCliTest {
	@test()
	protected static async setsUpASkillWithoutError() {
		const cli = await this.Cli()
		const response = await cli.installFeatures({
			features: [
				{
					code: 'skill',
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
						code: 'skill',
						options: {
							// @ts-ignore
							name2: 'test',
							description: 'This is such a good skill!',
						},
					},
				],
			})
		}, 'name')
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
	protected static async getsAFailedHealthCheckWhenIndexFileIsMoved() {
		const cli = await this.installSkill()

		diskUtil.moveFile(
			this.resolvePath('src', 'index.ts'),
			this.resolvePath('src', 'index2.ts')
		)

		const health = await cli.checkHealth()

		assert.isEqual(health.skill.status, 'failed')
		assert.doesInclude(health, {
			'skill.errors[].options.code': 'BOOT_ERROR',
		})
	}

	private static async installSkill() {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installFeatures([
			{
				code: 'skill',
				options: {
					name: 'test',
					description: 'This is such a good skill!',
				},
			},
		])
		return cli
	}

	@test()
	protected static async getsAGoodHealthCheckAndNothingElse() {
		const cli = await this.installSkill()

		const hashSpruceDir = this.resolveHashSprucePath()
		assert.isTrue(diskUtil.doesDirExist(hashSpruceDir))

		const health = await cli.checkHealth()

		if (health.skill?.errors && health.skill.errors.length > 0) {
			assert.fail(health.skill.errors?.[0].message)
		}

		assert.isEqualDeep(health, { skill: { status: 'passed' } })
	}
}
