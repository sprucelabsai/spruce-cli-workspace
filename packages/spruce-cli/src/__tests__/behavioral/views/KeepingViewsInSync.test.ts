import { test, assert } from '@sprucelabs/test'
import SyncAction from '../../../features/view/actions/SyncAction'
import AbstractSkillTest from '../../../tests/AbstractSkillTest'
import testUtil from '../../../tests/utilities/test.utility'

export default class KeepingViewsInSyncTest extends AbstractSkillTest {
	protected static skillCacheKey = 'views'
	private static action: SyncAction

	protected static async beforeEach() {
		await super.beforeEach()
		this.action = this.Action('view', 'sync')
	}

	@test()
	protected static async hasSyncAction() {
		assert.isFunction(this.action.execute)
	}

	@test()
	protected static async syncingWithNoViewsGeneratesNothing() {
		const results = await this.action.execute({})
		assert.isFalsy(results.errors)
		assert.isFalsy(results.files)
	}

	@test()
	protected static async createsValidCombinedEventsFileWhenCreatingANewSvc() {
		const results = await this.Action('view', 'create').execute({
			viewType: 'skillView',
			isRoot: true,
		})

		const match = testUtil.assertFileByPathInGeneratedFiles(
			`views/views.ts`,
			results.files
		)

		await this.Service('typeChecker').check(match)
	}
}
