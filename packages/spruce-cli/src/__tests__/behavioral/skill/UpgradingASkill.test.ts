import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../../AbstractCliTest'
import { ICli } from '../../../cli'
import TestInterface from '../../../interfaces/TestInterface'

export default class UpgradingASkillTest extends AbstractCliTest {
	@test()
	protected static async forceUpgradeOverwritesOldIndexFileWithoutAsking() {
		const cli = await this.installAndBreakSkill('skill-upgrade-force')

		const results = await cli.getFeature('skill').Action('upgrade').execute({
			force: true,
		})

		assert.doesInclude(results.files, {
			name: 'index.ts',
			action: 'updated',
		})

		const passedHealthCheck = await cli.checkHealth()

		assert.isEqualDeep(passedHealthCheck, { skill: { status: 'passed' } })
	}

	@test()
	protected static async upgradeWillAskIfYouWantToOverwriteFiles() {
		const cli = await this.installAndBreakSkill('skill-upgrade-ask')

		const promise = cli.getFeature('skill').Action('upgrade').execute({})

		await this.wait(5000)

		// this should NOT have fixed the skill
		await this.assertFailedHealthCheck(cli)

		// should be asking for some files
		const term = this.term as TestInterface

		assert.doesInclude(term.invocations, {
			command: 'confirm',
			options: `Overwrite ${this.resolvePath('src/index.ts')}?`,
		})

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		this.term.sendInput('')

		await promise
	}

	@test()
	protected static async upgradesUpdatesPackageScripts() {
		const cli = await this.installSkill('package-update')

		const pkgService = this.Service('pkg')
		pkgService.set({ path: 'scripts', value: {} })

		const failedHealth = await cli.checkHealth()

		assert.doesInclude(failedHealth, {
			'skill.errors[].message': '"health.local" not found',
		})

		await cli.getFeature('skill').Action('upgrade').execute({ force: true })

		const passedHealth = await cli.checkHealth()
		assert.isEqual(passedHealth.skill.status, 'passed')
	}

	private static async installAndBreakSkill(cacheKey: string) {
		const cli = await this.installSkill(cacheKey)

		const indexFile = this.resolvePath('src/index.ts')
		diskUtil.writeFile(indexFile, 'throw new Error("cheese!")')

		await this.assertFailedHealthCheck(cli)

		return cli
	}

	private static async installSkill(cacheKey: string) {
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
			cacheKey
		)
		return cli
	}

	private static async assertFailedHealthCheck(cli: ICli) {
		const failedHealthCheck = await cli.checkHealth()

		assert.doesInclude(failedHealthCheck, {
			'skill.errors[].stack': 'cheese',
		})
	}
}
