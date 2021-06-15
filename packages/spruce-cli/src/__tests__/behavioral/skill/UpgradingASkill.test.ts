import fsUtil from 'fs'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { CliInterface } from '../../../cli'
import CommandService from '../../../services/CommandService'
import AbstractCliTest from '../../../tests/AbstractCliTest'
import testUtil from '../../../tests/utilities/test.utility'
import { GeneratedFile } from '../../../types/cli.types'
export default class UpgradingASkillTest extends AbstractCliTest {
	protected static async beforeEach() {
		await super.beforeEach()
		CommandService.setMockResponse(new RegExp(/yarn rebuild/gis), {
			code: 0,
		})
		CommandService.setMockResponse(new RegExp(/npm.*?add .*?/gis), {
			code: 0,
		})
	}

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

		for (const upgradeMode of ['forceRequiredSkipRest', 'forceEverything']) {
			for (const file of files) {
				this.clearFileIfAboutToBeUpdated(file, upgradeMode)
			}

			const results = await this.Action('skill', 'upgrade').execute({
				upgradeMode,
			})

			if (upgradeMode === 'forceRequiredSkipRest') {
				const passedHealthCheck = await cli.checkHealth()
				assert.isEqualDeep(passedHealthCheck, { skill: { status: 'passed' } })
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

		const passedHealthCheck = await cli.checkHealth()

		assert.doesInclude(passedHealthCheck, {
			'skill.status': 'passed',
		})
	}

	private static clearFileIfAboutToBeUpdated(
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

		const promise = this.Action('skill', 'upgrade').execute({
			upgradeMode: 'askForChanged',
		})

		await this.waitForInput()

		// should still fail because we haven't written yet
		await this.assertFailedHealthCheck(cli)

		assert.doesInclude(this.ui.invocations, {
			command: 'confirm',
			options: `Overwrite src/index.ts?`,
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

		await this.Action('skill', 'upgrade').execute({})

		const passedHealth = await cli.checkHealth()
		assert.isEqual(passedHealth.skill.status, 'passed')
	}

	@test('Upgrades error.plugin', 'error.plugin.ts', 'errors')
	@test('Upgrades schema.plugin', 'schema.plugin.ts', 'schemas')
	@test(
		'Upgrades conversation.plugin',
		'conversation.plugin.ts',
		'conversation'
	)
	protected static async upgradesPlugins(pluginName: string, cacheKey: string) {
		await this.FeatureFixture().installCachedFeatures(cacheKey)

		const pluginPath = this.resolveHashSprucePath(`features/${pluginName}`)
		const originalContents = diskUtil.readFile(pluginPath)

		diskUtil.writeFile(pluginPath, '')

		const results = await this.Action('skill', 'upgrade').execute({})

		testUtil.assertFileByNameInGeneratedFiles(pluginName, results.files)

		const updatedContents = diskUtil.readFile(pluginPath)

		assert.isEqual(updatedContents, originalContents)
	}

	@test()
	protected static async canSkipPackageScriptChanges() {
		await this.FeatureFixture().installCachedFeatures('skills')

		const pkg = this.Service('pkg')
		pkg.set({ path: ['scripts', 'build.dev'], value: 'taco' })

		const promise = this.Action('skill', 'upgrade').execute({})

		await this.waitForInput()

		const last = this.ui.lastInvocation()

		assert.isEqual(last.command, 'prompt')
		assert.doesInclude(last.options.options.choices, { value: 'skip' })
		assert.doesInclude(last.options.options.choices, { value: 'skipAll' })
		assert.doesInclude(last.options.options.choices, { value: 'overwrite' })

		await this.ui.sendInput('skip')

		await promise

		assert.isEqual(pkg.get(['scripts', 'build.dev']), 'taco')
	}

	@test()
	protected static async asksForEachScriptChange() {
		await this.FeatureFixture().installCachedFeatures('skills')

		const pkg = this.Service('pkg')
		pkg.set({ path: ['scripts', 'build.dev'], value: 'taco' })
		pkg.set({ path: ['scripts', 'watch.build.dev'], value: 'taco' })

		const promise = this.Action('skill', 'upgrade').execute({})

		await this.waitForInput()

		let last = this.ui.lastInvocation()

		assert.isEqual(last.command, 'prompt')
		await this.ui.sendInput('skip')

		await this.waitForInput()

		last = this.ui.lastInvocation()

		assert.isEqual(last.command, 'prompt')
		await this.ui.sendInput('skip')

		await promise

		assert.isEqual(pkg.get(['scripts', 'build.dev']), 'taco')
		assert.isEqual(pkg.get(['scripts', 'watch.build.dev']), 'taco')
	}

	@test()
	protected static async canSkipAllScriptChanges() {
		await this.FeatureFixture().installCachedFeatures('skills')

		const pkg = this.Service('pkg')
		pkg.set({ path: ['scripts', 'build.dev'], value: 'taco' })
		pkg.set({ path: ['scripts', 'watch.build.dev'], value: 'taco' })

		const promise = this.Action('skill', 'upgrade').execute({})

		await this.waitForInput()

		let last = this.ui.lastInvocation()

		assert.isEqual(last.command, 'prompt')
		await this.ui.sendInput('skipAll')

		await promise

		assert.isEqual(pkg.get(['scripts', 'build.dev']), 'taco')
		assert.isEqual(pkg.get(['scripts', 'watch.build.dev']), 'taco')
	}

	@test()
	protected static async canOverwriteChangedScript() {
		await this.FeatureFixture().installCachedFeatures('skills')

		const pkg = this.Service('pkg')
		pkg.set({ path: ['scripts', 'build.dev'], value: 'taco' })

		const promise = this.Action('skill', 'upgrade').execute({})

		await this.waitForInput()

		let last = this.ui.lastInvocation()

		assert.isEqual(last.command, 'prompt')
		await this.ui.sendInput('overwrite')

		await promise

		assert.isNotEqual(pkg.get(['scripts', 'build.dev']), 'taco')
	}

	@test()
	protected static async canOverwriteMultipleChangedScript() {
		await this.FeatureFixture().installCachedFeatures('skills')

		const pkg = this.Service('pkg')
		pkg.set({ path: ['scripts', 'build.dev'], value: 'taco' })
		pkg.set({ path: ['scripts', 'watch.build.dev'], value: 'taco' })

		const promise = this.Action('skill', 'upgrade').execute({})

		await this.waitForInput()

		let last = this.ui.lastInvocation()

		assert.isEqual(last.command, 'prompt')
		await this.ui.sendInput('overwrite')

		last = this.ui.lastInvocation()

		assert.isEqual(last.command, 'prompt')
		await this.ui.sendInput('overwrite')

		await promise

		assert.isNotEqual(pkg.get(['scripts', 'build.dev']), 'taco')
		assert.isNotEqual(pkg.get(['scripts', 'watch.build.dev']), 'taco')
	}

	@test()
	protected static async doesNotAskIfNewScriptsAreAddedToSkillFeature() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')

		const pkg = this.Service('pkg')

		const skillFeature = cli.getFeature('skill')
		//@ts-ignore
		skillFeature.scripts['taco'] = 'bravo'

		await this.Action('skill', 'upgrade').execute({})

		assert.isEqual(pkg.get(['scripts', 'taco']), 'bravo')

		this.assertSandboxListenerNotWritten()
	}

	protected static assertSandboxListenerNotWritten() {
		const listeners = this.resolvePath('src', 'listeners')
		if (!diskUtil.doesDirExist(listeners)) {
			return
		}
		const matches = fsUtil.readdirSync(listeners)
		assert.isLength(
			matches,
			0,
			'A sandbox listeners was written and it should not have been.'
		)
	}

	@test()
	protected static async upgradingSkillWithSandboxUpgradesTheListener() {
		await this.FeatureFixture().installCachedFeatures('sandbox')
		const results = await this.Action('sandbox', 'setup').execute({})

		const match = testUtil.assertFileByNameInGeneratedFiles(
			/will-boot/,
			results.files
		)

		const originalContents = diskUtil.readFile(match)
		diskUtil.writeFile(match, 'broken')

		await this.Action('skill', 'upgrade').execute({})

		const newContents = diskUtil.readFile(match)
		assert.isEqual(originalContents, newContents)
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
