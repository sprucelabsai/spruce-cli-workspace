import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractErrorTest from '../../../AbstractErrorTest'
import testUtil from '../../../utilities/test.utility'

export default class KeepsErrorClassInSyncTest extends AbstractErrorTest {
	@test()
	protected static async errorFileShouldBeCreatedAndPassed() {
		const cli = await this.installErrorFeature('error-file-in-sync')
		const createAction = cli.getFeature('error').Action('create')

		const results = await createAction.execute({
			nameCamel: 'testError',
		})

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			/SpruceError/,
			results.files ?? []
		)

		assert.doesInclude(results.files ?? [], {
			name: 'SpruceError.ts',
			action: 'generated',
		})

		await this.Service('typeChecker').check(match)
	}

	@test()
	protected static async errorFileShouldBeUpdated() {
		const cli = await this.installErrorFeature('error-file-in-sync')
		const createAction = cli.getFeature('error').Action('create')
		await createAction.execute({ nameCamel: 'testError1' })
		const results = await createAction.execute({ nameCamel: 'testError2' })

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			/SpruceError/,
			results.files ?? []
		)
		const contents = diskUtil.readFile(match)

		assert.doesInclude(contents, "'TEST_ERROR_1'")
		assert.doesInclude(contents, "'TEST_ERROR_2'")

		await this.Service('typeChecker').check(match)
	}
}
