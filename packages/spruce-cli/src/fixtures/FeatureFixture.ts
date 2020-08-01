import pathUtil from 'path'
import { ICliBootOptions, ICli, boot } from '../cli'
import { InstallFeature } from '../features/features.types'
import TestInterface from '../interfaces/TestInterface'
import diskUtil from '../utilities/disk.utility'
import testUtil from '../utilities/test.utility'

export interface ICachedCli {
	cli: ICli
	cwd: string
}

export default class FeatureFixture {
	private cwd: string
	private installedSkills: Record<string, ICachedCli> = {}

	public constructor(cwd: string) {
		this.cwd = cwd
	}

	private async Cli(options?: ICliBootOptions) {
		const cli = await boot({
			cwd: this.cwd,
			graphicsInterface: new TestInterface(),
			...(options ?? {}),
		})

		return cli
	}

	public async installFeatures(
		features: InstallFeature[],
		cacheKey?: string,
		bootOptions?: ICliBootOptions
	): Promise<ICli> {
		if (
			cacheKey &&
			this.installedSkills[cacheKey] &&
			testUtil.isCacheEnabled()
		) {
			this.cleanCachedSkillDir()

			return this.installedSkills[cacheKey].cli
		}

		let alreadyInstalled = false

		if (cacheKey && testUtil.isCacheEnabled()) {
			alreadyInstalled = await this.loadCachedSkillAndTrackItsDir(cacheKey)
		}

		const cli = await this.Cli(bootOptions)

		if (!alreadyInstalled) {
			await cli.installFeatures({
				features,
			})
		}

		if (cacheKey && testUtil.isCacheEnabled()) {
			this.cacheCli(cacheKey, cli)
		}

		this.cleanCachedSkillDir()

		return cli
	}

	private async loadCachedSkillAndTrackItsDir(cacheKey: string) {
		const settingsFile = this.getSettingsFilePath()

		const exists = diskUtil.doesFileExist(settingsFile)
		let alreadyInstalled = false
		let settingsObject = exists
			? JSON.parse(diskUtil.readFile(settingsFile))
			: {}

		if (settingsObject?.[cacheKey]) {
			if (testUtil.shouldClearCache()) {
				this.resetCachedSkillDir()
			} else {
				alreadyInstalled = true
			}

			await diskUtil.copyDir(settingsObject[cacheKey], this.cwd)
		}

		if (settingsFile) {
			if (!settingsObject) {
				settingsObject = {}
			}

			if (!settingsObject[cacheKey]) {
				settingsObject[cacheKey] = this.cwd
				diskUtil.createDir(pathUtil.dirname(settingsFile))
				diskUtil.writeFile(
					settingsFile,
					JSON.stringify(settingsObject, null, 2)
				)
			}
		}

		return alreadyInstalled
	}

	private getSettingsFilePath() {
		return diskUtil.resolveHashSprucePath(
			__dirname,
			'tmp',
			'test-skill-dirs.json'
		)
	}

	private resolveHashSprucePath(...filePath: string[]) {
		return diskUtil.resolveHashSprucePath(this.cwd, ...filePath)
	}

	private cleanCachedSkillDir() {
		const dirs = [
			// TODO make this so it does not need to be updated for each feature
			this.resolveHashSprucePath(),
			diskUtil.resolvePath(this.cwd, 'build'),
			diskUtil.resolvePath(this.cwd, 'src', 'events'),
			diskUtil.resolvePath(this.cwd, 'src', 'schemas'),
			diskUtil.resolvePath(this.cwd, 'src', 'errors'),
		]

		dirs.forEach((dir) => {
			if (diskUtil.doesFileExist(dir)) {
				diskUtil.deleteDir(dir)
				diskUtil.createDir(dir)
			}
		})

		diskUtil.createDir(this.resolveHashSprucePath())
	}

	private resetCachedSkillDir() {
		diskUtil.deleteDir(this.cwd)
		diskUtil.createDir(this.cwd)
	}

	private cacheCli(cacheKey: string, cli: ICli) {
		this.installedSkills[cacheKey] = {
			cwd: this.cwd,
			cli,
		}
	}
}
