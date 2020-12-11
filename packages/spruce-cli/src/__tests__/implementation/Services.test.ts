import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { assert, test } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class ServicesTests extends AbstractCliTest {
	@test()
	protected static async typeCheckerValidatesGoodFile() {
		const tc = this.Service('typeChecker')
		tc.cwd = this.cliRoot

		await tc.check(this.resolveTestPath('validFile.ts'))
	}

	@test()
	protected static async tscFailsOnBadFile() {
		const destination = pathUtil.join(this.cwd, 'temp.ts')
		diskUtil.writeFile(destination, 'const test = what')

		const tc = this.Service('typeChecker')
		tc.cwd = this.cliRoot

		await assert.doesThrowAsync(() => tc.check(destination), /what/gi)
	}
}
