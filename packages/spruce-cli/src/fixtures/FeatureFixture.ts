import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { ICliBootOptions, ICli, boot } from '../cli'
import ServiceFactory, {
	IServiceProvider,
	Service,
	IServiceMap,
} from '../factories/ServiceFactory'
import { InstallFeature } from '../features/features.types'
import TestInterface from '../interfaces/TestInterface'
import log from '../singletons/log'
import testUtil from '../utilities/test.utility'

export interface ICachedCli {
	cli: ICli
	cwd: string
}

export default class FeatureFixture implements IServiceProvider {
	private cwd: string
	private installedSkills: Record<string, ICachedCli> = {}
	private serviceFactory: ServiceFactory

	public constructor(cwd: string, serviceFactory: ServiceFactory) {
		this.cwd = cwd
		this.serviceFactory = serviceFactory
	}

	public Service<S extends Service>(
		type: S,
		cwd?: string | undefined
	): IServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	private async Cli(options?: ICliBootOptions) {
		await this.linkSpruceUtils()

		const cli = await boot({
			cwd: this.cwd,
			graphicsInterface: new TestInterface(),
			...(options ?? {}),
		})

		return cli
	}

	private async linkSpruceUtils() {
		const command = this.Service('command')
		await command.execute(
			`cd ${pathUtil.join(
				__dirname,
				'..',
				'..',
				'..',
				'spruce-skill-utils'
			)} && yarn link`
		)
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

		await this.linkToSpruceUtils()

		return cli
	}

	private async linkToSpruceUtils() {
		const command = this.Service('command')
		await command.execute(`yarn link @sprucelabs/spruce-skill-utils`)
	}

	private async loadCachedSkillAndTrackItsDir(cacheKey: string) {
		const settingsFile = this.getSettingsFilePath()

		const exists = diskUtil.doesFileExist(settingsFile)
		let alreadyInstalled = false
		let settingsObject: Record<string, any> = {}

		try {
			settingsObject = exists ? JSON.parse(diskUtil.readFile(settingsFile)) : {}
		} catch (err) {
			log.warn('Test cache settings file is broken, ignoring...')
		}

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
