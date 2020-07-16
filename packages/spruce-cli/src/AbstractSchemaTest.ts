import pathUtil from 'path'
import AbstractCliTest from './AbstractCliTest'
import { ICli } from './cli'
import diskUtil from './utilities/disk.utility'
import testUtil from './utilities/test.utility'

export default abstract class AbstractSchemaTest extends AbstractCliTest {
	private static installedSkills: Record<
		string,
		{ cwd: string; cli: ICli }
	> = {}

	protected static get schemaTypesFile() {
		return this.resolveHashSprucePath('schemas', 'schemas.types.ts')
	}

	protected static async syncSchemasAndSetCwd(cacheKey?: string) {
		const cli = await this.installSchemasAndSetCwd(cacheKey)
		await cli.getFeature('schema').Action('sync').execute({})

		return cli
	}

	protected static async installSchemasAndSetCwd(cacheKey?: string) {
		if (
			cacheKey &&
			this.installedSkills[cacheKey] &&
			testUtil.isCacheEnabled()
		) {
			this.cwd = this.installedSkills[cacheKey].cwd
			this.cleanCachedSkillDir()

			return this.installedSkills[cacheKey].cli
		}

		let alreadyInstalled = false
		let settingsObject: Record<string, any> = {}
		let settingsFile

		if (cacheKey && testUtil.isCacheEnabled()) {
			// lets see if there is something saved on the disk we can retrieve
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

		const cli = await this.Cli()

		if (!alreadyInstalled) {
			await cli.installFeatures({
				features: [
					{
						code: 'skill',
						options: {
							name: 'testing',
							description: 'this is a great test!',
						},
					},
					{
						code: 'schema',
					},
				],
			})
		}

		if (cacheKey && testUtil.isCacheEnabled()) {
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

		this.cleanCachedSkillDir()

		return cli
	}

	private static cleanCachedSkillDir() {
		const dirs = [
			this.resolveHashSprucePath(),
			this.resolvePath('src', 'schemas'),
		]

		dirs.forEach((dir) => {
			if (diskUtil.doesFileExist(dir)) {
				diskUtil.deleteDir(dir)
				diskUtil.createDir(dir)
			}
		})
	}

	private static resetCachedSkillDir() {
		const path = this.resolvePath()
		diskUtil.deleteDir(path)
		diskUtil.createDir(path)
	}
}
