import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import Cli, { ICliBootOptions, ICli } from '../cli'
import { InstallFeature } from '../features/features.types'
import ServiceFactory, {
	IServiceProvider,
	Service,
	IServiceMap,
} from '../services/ServiceFactory'
import log from '../singletons/log'
import { GraphicsInterface } from '../types/cli.types'
import testUtil from '../utilities/test.utility'

export interface ICachedCli {
	cli: ICli
	cwd: string
}

export interface FeatureFixtureOptions {
	cwd: string
	serviceFactory: ServiceFactory
	ui: GraphicsInterface
	shouldGenerateCacheIfMissing?: boolean
}

export default class FeatureFixture implements IServiceProvider {
	private cwd: string
	private installedSkills: Record<string, ICachedCli> = {}
	private serviceFactory: ServiceFactory
	private static linkedUtils = false
	private static dirsToDelete: string[] = []
	private term: GraphicsInterface
	private generateCacheIfMissing = false

	public constructor(options: FeatureFixtureOptions) {
		this.cwd = options.cwd
		this.serviceFactory = options.serviceFactory
		this.term = options.ui
		this.generateCacheIfMissing = !!options.shouldGenerateCacheIfMissing
	}

	public static deleteOldSkillDirs() {
		for (const dir of this.dirsToDelete) {
			diskUtil.deleteDir(dir)
		}
	}

	public Service<S extends Service>(
		type: S,
		cwd?: string | undefined
	): IServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	public async Cli(options?: ICliBootOptions) {
		await this.linkWorkspacePackages()

		const cli = await Cli.Boot({
			cwd: this.cwd,
			graphicsInterface: this.term,
			...(options ?? {}),
		})

		return cli
	}

	private async linkWorkspacePackages() {
		if (!FeatureFixture.linkedUtils) {
			FeatureFixture.linkedUtils = true

			// const expectedLinkedDir = pathUtil.join(
			// 	os.homedir(),
			// 	'.config',
			// 	'yarn',
			// 	'link',
			// 	'@sprucelabs',
			// 	'spruce-skill-utils'
			// )

			// if (!fsUtil.existsSync(expectedLinkedDir)) {
			// 	const command = this.Service('command')
			// 	try {
			// 		await command.execute(
			// 			`cd ${pathUtil.join(
			// 				__dirname,
			// 				'..',
			// 				'..',
			// 				'..',
			// 				'spruce-skill-utils'
			// 			)} && yarn link`
			// 		)
			// 	} catch (err) {
			// 		if (fsUtil.existsSync(expectedLinkedDir)) {
			// 			log.warn(`Symlink ${expectedLinkedDir} already exists`)
			// 		} else {
			// 			log.warn(
			// 				`Symlink ${expectedLinkedDir} failed, but the check thinks it is missing`
			// 			)
			// 		}
			// 	}
			// }
		}
	}

	public async installFeatures(
		features: InstallFeature[],
		cacheKey?: string,
		bootOptions?: ICliBootOptions
	) {
		if (
			cacheKey &&
			this.installedSkills[cacheKey] &&
			testUtil.isCacheEnabled()
		) {
			return this.installedSkills[cacheKey].cli
		}

		let isCached = false
		if (cacheKey && testUtil.isCacheEnabled()) {
			isCached = this.doesCacheExist(cacheKey)

			if (!isCached && !this.generateCacheIfMissing) {
				throw new Error(
					`Cached skill not found, add\n\n"${cacheKey}":${JSON.stringify(
						features
					)}\n\nto your package.json and run\n\n\`yarn test.cache\``
				)
			}

			await this.copyCachedSkillAndTrackItsDir(cacheKey)
		}

		const cli = await this.Cli(bootOptions)

		if (!isCached) {
			await cli.installFeatures({
				features,
			})
		}

		if (cacheKey && testUtil.isCacheEnabled()) {
			this.cacheCli(cacheKey, cli)
		}

		await this.linkLocalPackages()

		return cli
	}

	public async linkLocalPackages() {
		// const command = this.Service('command')
		// await command.execute(`yarn link @sprucelabs/spruce-skill-utils`)
	}

	private async copyCachedSkillAndTrackItsDir(cacheKey: string) {
		let isCached = this.doesCacheExist(cacheKey)

		if (isCached) {
			let settings = this.loadCacheTracker()
			await diskUtil.copyDir(settings[cacheKey], this.cwd)

			FeatureFixture.dirsToDelete.push(this.cwd)
		} else {
			this.addCwdToCacheTracker(cacheKey)
		}
	}

	private addCwdToCacheTracker(cacheKey: string) {
		let settings = this.loadCacheTracker()

		if (!settings) {
			settings = {}
		}

		if (!settings[cacheKey]) {
			const settingsFile = this.getTestCacheTrackerFilePath()

			settings[cacheKey] = this.cwd
			diskUtil.createDir(pathUtil.dirname(settingsFile))
			diskUtil.writeFile(settingsFile, JSON.stringify(settings, null, 2))
		}
		return settings
	}

	private doesCacheExist(cacheKey: string) {
		let alreadyInstalled = false

		const settings = this.loadCacheTracker()

		if (settings?.[cacheKey]) {
			alreadyInstalled = true
		}
		return alreadyInstalled
	}

	public loadCacheTracker() {
		const settingsFile = this.getTestCacheTrackerFilePath()

		const exists = diskUtil.doesFileExist(settingsFile)
		let settingsObject: Record<string, any> = {}

		try {
			settingsObject = exists ? JSON.parse(diskUtil.readFile(settingsFile)) : {}
		} catch (err) {
			log.warn('Test cache settings file is broken, ignoring...')
		}
		return settingsObject
	}

	public getTestCacheTrackerFilePath() {
		return diskUtil.resolveHashSprucePath(
			__dirname,
			'tmp',
			`cached-skills.json`
		)
	}

	private cacheCli(cacheKey: string, cli: ICli) {
		this.installedSkills[cacheKey] = {
			cwd: this.cwd,
			cli,
		}
	}
}
