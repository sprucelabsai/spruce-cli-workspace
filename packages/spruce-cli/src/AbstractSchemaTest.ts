import AbstractCliTest from './AbstractCliTest'
import { ICli } from './cli'
import { HASH_SPRUCE_DIR } from './constants'
import { FeatureCode } from './FeatureManager'
import diskUtil from './utilities/disk.utility'

export default abstract class AbstractSchemaTest extends AbstractCliTest {
	private static installedSkills: Record<
		string,
		{ cwd: string; cli: ICli }
	> = {}

	protected static async bootCliInstallSchemasAndSetCwd(cacheKey?: string) {
		if (cacheKey && this.installedSkills[cacheKey]) {
			this.cwd = this.installedSkills[cacheKey].cwd
			return this.installedSkills[cacheKey].cli
		}

		let alreadyInstalled = false
		let settingsObject
		let settingsFile

		if (cacheKey) {
			// lets see if there is something saved on the disk we can retrieve
			settingsFile = diskUtil.resolvePath(
				__dirname,
				'..',
				'..',
				'..',
				'..',
				HASH_SPRUCE_DIR,
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

		return cli
	}
}
