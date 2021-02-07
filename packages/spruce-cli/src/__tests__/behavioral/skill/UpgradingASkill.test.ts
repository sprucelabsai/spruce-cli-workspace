import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { CliInterface } from '../../../cli'
import AbstractCliTest from '../../../tests/AbstractCliTest'
import testUtil from '../../../tests/utilities/test.utility'
import { GeneratedFile } from '../../../types/cli.types'
export default class UpgradingASkillTest extends AbstractCliTest {
	@test()
	protected static async forceEverythingUpgradeOverwritesWhatHasChanged() {
		const cli = await this.installAndBreakSkill('skills')
		const files: {
			name: string
			path: string
			forceEverythingAction: GeneratedFile['action']
			forceRequiredSkipRestAction: GeneratedFile['action']
		}[] = [
			{
				name: 'index.ts',
				path: 'src/index.ts',
				forceEverythingAction: 'updated',
				forceRequiredSkipRestAction: 'updated',
			},
			{
				name: '.eslintrc.js',
				path: '.eslintrc.js',
				forceEverythingAction: 'updated',
				forceRequiredSkipRestAction: 'updated',
			},
			{
				name: 'SpruceError.ts',
				path: 'src/errors/SpruceError.ts',
				forceEverythingAction: 'updated',
				forceRequiredSkipRestAction: 'skipped',
			},
			{
				name: 'options.types.ts',
				path: 'src/.spruce/errors/options.types.ts',
				forceEverythingAction: 'updated',
				forceRequiredSkipRestAction: 'skipped',
			},
		]

		this.Service('settings').set('testing', true)

		for (const upgradeMode of ['forceRequiredSkipRest', 'forceEverything']) {
			for (const file of files) {
				this.clearEmptyIfAboutToBeUpdated(file, upgradeMode)
			}

			const results = await cli.getFeature('skill').Action('upgrade').execute({
				upgradeMode,
			})

			if (upgradeMode === 'forceRequiredSkipRest') {
				const passedHealthCheck = await cli.checkHealth()

				assert.isEqualDeep(passedHealthCheck, { skill: { status: 'passed' } })
				assert.isTrue(this.Service('settings').get('testing'))
			}

			for (const file of files) {
				//@ts-ignore
				const action = file[`${upgradeMode}Action`]
				assert.doesInclude(
					results.files,
					{
						name: file.name,
						action,
					},
					`${
						file.name
					} was not ${action} when ${upgradeMode} in \n\n ${JSON.stringify(
						results.files ?? [],
						null,
						2
					)}`
				)
			}
		}

		assert.isUndefined(this.Service('settings').get('testing'))

		const passedHealthCheck = await cli.checkHealth()

		assert.doesInclude(passedHealthCheck, {
			'skill.status': 'failed',
		})

		assert.doesInclude(passedHealthCheck, {
			'skill.errors[0].options.code': 'SKILL_NOT_INSTALLED',
		})
	}

	private static clearEmptyIfAboutToBeUpdated(
		file: {
			name: string
			path: string
			forceEverythingAction: GeneratedFile['action']
			forceRequiredSkipRestAction: GeneratedFile['action']
		},
		upgradeMode: string
	) {
		//@ts-ignore
		if (file[`${upgradeMode}Action`] === 'updated') {
			diskUtil.writeFile(this.resolvePath(file.path), '')
		}
	}

	@test()
	protected static async upgradeWillAskIfYouWantToOverwriteFiles() {
		const cli = await this.installAndBreakSkill('skills')

		const promise = cli
			.getFeature('skill')
			.Action('upgrade')
			.execute({ upgradeMode: 'askEverything' })

		await this.waitForInput()

		// should still fail because we haven't written yet
		await this.assertFailedHealthCheck(cli)

		assert.doesInclude(this.ui.invocations, {
			command: 'confirm',
			options: `Overwrite ${this.resolvePath('src/index.ts')}?`,
		})

		await this.ui.sendInput('\n')

		await this.wait(1000)

		await promise

		const health = await cli.checkHealth()

		assert.isEqual(health.skill.status, 'passed')
	}

	@test()
	protected static async upgradesUpdatesPackageScripts() {
		const cli = await this.installSkill('schemas')

		const pkgService = this.Service('pkg')
		pkgService.set({ path: 'scripts', value: {} })

		const failedHealth = await cli.checkHealth()

		assert.doesInclude(failedHealth, {
			'skill.errors[].message': '"health.local" not found',
		})

		await cli.getFeature('skill').Action('upgrade').execute({})

		const passedHealth = await cli.checkHealth()
		assert.isEqual(passedHealth.skill.status, 'passed')
	}

	@test('Upgrades error.plugin', 'error.plugin.ts', 'errors')
	@test('Upgrades schema.plugin', 'schema.plugin.ts', 'schemas')
	protected static async upgradesPlugins(pluginName: string, cacheKey: string) {
		const cli = await this.FeatureFixture().installCachedFeatures(cacheKey)

		const pluginPath = this.resolveHashSprucePath(`features/${pluginName}`)
		const originalContents = diskUtil.readFile(pluginPath)

		diskUtil.writeFile(pluginPath, '')

		const results = await cli.getFeature('skill').Action('upgrade').execute({})

		testUtil.assertsFileByNameInGeneratedFiles(pluginName, results.files)

		const updatedContents = diskUtil.readFile(pluginPath)

		assert.isEqual(updatedContents, originalContents)
	}

	@test()
	protected static async upgradeSkillEmitsDidUpdateEventAndOtherFeaturesListenAndAct() {
		assert.isTrue(false)
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

	private static async assertFailedHealthCheck(cli: CliInterface) {
		const failedHealthCheck = await cli.checkHealth()

		assert.doesInclude(failedHealthCheck, {
			'skill.errors[].message': 'cheese',
		})
	}
}
