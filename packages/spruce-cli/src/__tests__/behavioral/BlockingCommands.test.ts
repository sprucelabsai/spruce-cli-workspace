import { test, assert } from '@sprucelabs/test'
import Cli from '../../cli'
import AbstractSkillTest from '../../tests/AbstractSkillTest'
import MockProgramFactory from '../../tests/MockProgramFactory'

export default class OverridingCommandsInPackageJsonTest extends AbstractSkillTest {
	protected static skillCacheKey = 'node'

	@test()
	protected static async blockedCommandsThrow() {
		const pkg = this.Service('pkg')
		pkg.set({
			path: ['skill', 'blockedCommands'],
			value: { 'sync.schemas': `Stop now!` },
		})

		const cli = await Cli.Boot({
			program: MockProgramFactory.Program(),
			cwd: this.cwd,
		})

		//@ts-ignore
		const attacher = cli.getAttacher()
		assert.isTruthy(attacher)

		assert.isEqualDeep(attacher.blockedCommands, {
			'sync.schemas': 'Stop now!',
		})
	}
}
