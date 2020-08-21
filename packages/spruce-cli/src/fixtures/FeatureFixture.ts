import os from 'os'
import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import fsUtil from 'fs-extra'
import { ICliBootOptions, ICli, boot } from '../cli'
import { InstallFeature } from '../features/features.types'
import ServiceFactory, {
	IServiceProvider,
	Service,
	IServiceMap,
} from '../services/ServiceFactory'
import log from '../singletons/log'
import { IGraphicsInterface } from '../types/cli.types'
import testUtil from '../utilities/test.utility'

export interface ICachedCli {
	cli: ICli
	cwd: string
}

export default class FeatureFixture implements IServiceProvider {
	private cwd: string
	private installedSkills: Record<string, ICachedCli> = {}
	private serviceFactory: ServiceFactory
	private static linkedUtils = false
	private static dirsToDelete: string[] = []
	private term: IGraphicsInterface

	public constructor(
		cwd: string,
		serviceFactory: ServiceFactory,
		term: IGraphicsInterface
	) {
		this.cwd = cwd
		this.serviceFactory = serviceFactory
		this.term = term
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

		const cli = await boot({
			cwd: this.cwd,
			graphicsInterface: this.term,
			...(options ?? {}),
		})

		return cli
	}

	private async linkWorkspacePackages() {
		if (!FeatureFixture.linkedUtils) {
			FeatureFixture.linkedUtils = true

			const expectedLinkedDir = pathUtil.join(
				os.homedir(),
				'.config',
				'yarn',
				'link',
				'@sprucelabs',
				'spruce-skill-utils'
			)
			if (!fsUtil.existsSync(expectedLinkedDir)) {
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
		}
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
			alreadyInstalled = await this.copyCachedSkillAndTrackItsDir(cacheKey)
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

		await this.linkLocalPackages()

		return cli
	}

	public async linkLocalPackages() {
		const command = this.Service('command')
		await command.execute(`yarn link @sprucelabs/spruce-skill-utils`)
	}

	private async copyCachedSkillAndTrackItsDir(cacheKey: string) {
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

			FeatureFixture.dirsToDelete.push(this.cwd)
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
			diskUtil.resolvePath(this.resolveHashSprucePath(), 'tmp'),
			diskUtil.resolvePath(this.resolveHashSprucePath(), 'schemas'),
			diskUtil.resolvePath(this.resolveHashSprucePath(), 'errors'),
			diskUtil.resolvePath(this.resolveHashSprucePath(), 'events'),
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
