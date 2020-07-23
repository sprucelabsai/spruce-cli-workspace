import { assert, test } from '@sprucelabs/test'
import AbstractErrorTest from '../../../AbstractErrorTest'
import { Service } from '../../../factories/ServiceFactory'
import testUtil from '../../../utilities/test.utility'

export default class KeepsErrorsInSyncTest extends AbstractErrorTest {
	@test()
	protected static async hasSyncErrorAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('error').Action('sync').execute)
	}

	@test()
	protected static async syncsErrorOptions() {
		const cli = await this.installErrorFeature('options-in-sync')
		const results = await cli.getFeature('error').Action('create').execute({
			nameCamel: 'testError',
		})

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			/^options\.types/,
			results.files ?? []
		)

		await this.Service(Service.TypeChecker).check(match)
	}
}
