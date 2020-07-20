import pathUtil from 'path'
import { ICliBootOptions, ICli, boot } from '../cli'
import { InstallFeature } from '../features/features.types'
import diskUtil from '../utilities/disk.utility'
import testUtil from '../utilities/test.utility'

export interface IInstallFeatureResults {
	cli: ICli
	cwd: string
}

export default class FeatureFixture {
	private cwd: string
	private installedSkills: Record<string, IInstallFeatureResults> = {}

	public constructor(defaultCwd: string) {
		this.cwd = defaultCwd
	}

	private async Cli(options?: ICliBootOptions) {
		const cli = await boot({
			cwd: this.cwd,
			...(options ?? {}),
		})

		return cli
	}

	public async installFeatures(
		features: InstallFeature[],
		cacheKey?: string,
		bootOptions?: ICliBootOptions
	): Promise<IInstallFeatureResults> {
		if (
			cacheKey &&
			this.installedSkills[cacheKey] &&
			testUtil.isCacheEnabled()
		) {
			this.cleanCachedSkillDir()

			return this.installedSkills[cacheKey]
		}

		let alreadyInstalled = false
		let settingsObject: Record<string, any> = {}
		let settingsFile

		if (cacheKey && testUtil.isCacheEnabled()) {
			settingsFile = diskUtil.resolveHashSprucePath(
				__dirname,
				'tmp',
				'cli-workspace-tests.json'
			)

			if (diskUtil.doesFileExist(settingsFile)) {
				settingsObject = JSON.parse(diskUtil.readFile(settingsFile))
				if (settingsObject?.tmpDirs?.[cacheKey]) {
					if (testUtil.shouldClearCache()) {
						this.resetCachedSkillDir()
					} else {
						alreadyInstalled = true
					}
					this.cwd = settingsObject.tmpDirs[cacheKey]
				}
			}
		}

		const cli = await this.Cli(bootOptions)

		if (!alreadyInstalled) {
			await cli.installFeatures({
				features,
			})
		}

		if (cacheKey && testUtil.isCacheEnabled()) {
			this.cacheCli(cacheKey, cli, settingsFile, settingsObject)
		}

		this.cleanCachedSkillDir()

		return { cli, cwd: this.cwd }
	}

	private resolveHashSprucePath(...filePath: string[]) {
		return diskUtil.resolveHashSprucePath(this.cwd, ...filePath)
	}

	private cleanCachedSkillDir() {
		const dirs = [
			this.resolveHashSprucePath(),
			diskUtil.resolvePath(this.cwd, 'src', 'schemas'),
		]

		dirs.forEach((dir) => {
			if (diskUtil.doesFileExist(dir)) {
				diskUtil.deleteDir(dir)
				diskUtil.createDir(dir)
			}
		})
	}

	private resetCachedSkillDir() {
		diskUtil.deleteDir(this.cwd)
		diskUtil.createDir(this.cwd)
	}

	private cacheCli(
		cacheKey: string,
		cli: ICli,
		settingsFile: string | undefined,
		settingsObject: Record<string, any>
	) {
		this.installedSkills[cacheKey] = {
			cwd: this.cwd,
			cli,
		}

		if (settingsFile) {
			if (!settingsObject.tmpDirs) {
				settingsObject.tmpDirs = {}
			}

			if (!settingsObject.tmpDirs[cacheKey]) {
				settingsObject.tmpDirs[cacheKey] = this.cwd
				diskUtil.createDir(pathUtil.dirname(settingsFile))
				diskUtil.writeFile(
					settingsFile,
					JSON.stringify(settingsObject, null, 2)
				)
			}
		}
	}
}
