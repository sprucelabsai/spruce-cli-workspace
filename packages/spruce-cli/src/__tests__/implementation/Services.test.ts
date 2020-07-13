import pathUtil from 'path'
import { assert, test } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import { Service } from '../../factories/ServiceFactory'
import diskUtil from '../../utilities/disk.utility'

export default class ServicesTests extends AbstractCliTest {
	@test()
	protected static async typeCheckerValidatesGoodFile() {
		const tc = this.Service(Service.TypeChecker)
		tc.cwd = this.cliRoot

		await tc.check(this.resolveTestPath('validFile.ts'))
	}

	@test()
	protected static async tscFailsOnBadFile() {
		const destination = pathUtil.join(this.cwd, 'temp.ts')
		diskUtil.writeFile(destination, 'const test = what')

		const tc = this.Service(Service.TypeChecker)
		tc.cwd = this.cliRoot

		await assert.doesThrowAsync(() => tc.check(destination), /what/gi)
	}
}
