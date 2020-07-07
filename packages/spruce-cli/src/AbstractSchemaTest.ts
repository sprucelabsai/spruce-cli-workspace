import pathUtil from 'path'
import AbstractCliTest from './AbstractCliTest'
import { ICli } from './cli'
import { FeatureCode } from './features/FeatureManager'
import diskUtil from './utilities/disk.utility'

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
		await cli.syncSchemas()
		return cli
	}

	protected static async installSchemasAndSetCwd(cacheKey?: string) {
		if (cacheKey && this.installedSkills[cacheKey]) {
			this.cwd = this.installedSkills[cacheKey].cwd
			this.cleanCachedSkillDir()

			return this.installedSkills[cacheKey].cli
		}

		let alreadyInstalled = false
		let settingsObject
		let settingsFile

		if (cacheKey) {
			// lets see if there is something saved on the disk we can retrieve
			settingsFile = diskUtil.resolveHashSprucePath(
				pathUtil.join(__dirname, '..'),
				'settings.json'
			)

			if (diskUtil.doesFileExist(settingsFile)) {
				settingsObject = JSON.parse(diskUtil.readFile(settingsFile))
				if (settingsObject?.tests?.tmpDirs?.[cacheKey]) {
					alreadyInstalled = true
					this.cwd = settingsObject.tests.tmpDirs[cacheKey]
				}
			}
		}

		const cli = await this.Cli()

		if (!alreadyInstalled) {
			await cli.installFeatures({
				features: [
					{
						code: FeatureCode.Skill,
						options: {
							name: 'testing',
							description: 'this is a great test!'
						}
					},
					{
						code: FeatureCode.Schema
					}
				]
			})
		}

		if (cacheKey) {
			this.installedSkills[cacheKey] = {
				cwd: this.cwd,
				cli
			}

			if (settingsObject && settingsFile) {
				if (!settingsObject.tests) {
					settingsObject.tests = {}
				}
				if (!settingsObject.tests.tmpDirs) {
					settingsObject.tests.tmpDirs = {}
				}

				if (!settingsObject.tests.tmpDirs[cacheKey]) {
					settingsObject.tests.tmpDirs[cacheKey] = this.cwd
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
			this.resolvePath('src', 'schemas')
		]

		dirs.forEach(dir => {
			if (diskUtil.doesFileExist(dir)) {
				diskUtil.deleteDir(dir)
				diskUtil.createDir(dir)
			}
		})
	}
}
