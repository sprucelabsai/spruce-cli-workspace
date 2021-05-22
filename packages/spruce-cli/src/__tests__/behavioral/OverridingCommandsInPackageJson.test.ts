import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import Cli from '../../cli'
import AbstractSkillTest from '../../tests/AbstractSkillTest'
import MockProgramFactory from '../../tests/MockProgramFactory'

export default class OverridingCommandsInPackageJsonTest extends AbstractSkillTest {
	protected static skillCacheKey = 'schemas'

	@test()
	protected static async overridesAreLoadedIntoAttacher() {
		this.overrideOptions()

		const cli = await Cli.Boot({
			program: MockProgramFactory.Program(),
			cwd: this.cwd,
		})

		//@ts-ignore
		const attacher = cli.getAttacher()
		assert.isTruthy(attacher)

		assert.isEqualDeep(attacher.optionOverrides, {
			'sync.schemas': {
				fetchCoreSchemas: 'false',
			},
		})
	}

	@test()
	protected static async runningCommandHonorsOverrides() {
		const cliPath = this.resolvePath(__dirname, '..', '..', 'index.js')

		await this.Service('command').execute(`node ${cliPath} sync.schemas`)

		const personPath = this.resolveHashSprucePath(
			'schemas',
			'spruce',
			'v2020_07_22',
			'person.schema.ts'
		)

		assert.isFalse(diskUtil.doesFileExist(personPath))
	}

	private static overrideOptions() {
		const pkg = this.Service('pkg')
		pkg.set({
			path: ['skill', 'commandOverrides', 'sync.schemas'],
			value: '--fetchCoreSchemas false',
		})
	}
}
