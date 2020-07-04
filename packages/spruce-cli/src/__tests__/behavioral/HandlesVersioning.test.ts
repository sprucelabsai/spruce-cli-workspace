import { assert, test } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import versionUtil from '../../utilities/version.utility'

export default class HandlesVersioningTest extends AbstractCliTest {
	@test()
	protected static async hasResolvePathFunction() {
		assert.isFunction(versionUtil.resolvePath)
	}

	@test()
	protected static async canResolveLatest() {
		const expected = this.resolveTestPath('services/2020-01-10/index.md')

		const resolved = versionUtil.resolvePath(
			this.resolveTestPath(),
			'services/{{@latest}}/index.md'
		)

		assert.isEqual(resolved, expected)
	}

	@test()
	protected static async canResolveLatestOnDifferentDirectory() {
		const expected = this.resolveTestPath('utilities/2020-02-15/index.md')

		const resolved = versionUtil.resolvePath(
			this.resolveTestPath(),
			'utilities/{{@latest}}/index.md'
		)

		assert.isEqual(resolved, expected)
	}

	@test()
	protected static async canGenerateLatestPath() {
		const date = new Date().toISOString().split('T')[0]
		const expected = this.resolveTestPath(`utilities/${date}/index.md`)

		const resolved = versionUtil.resolveNewLatestPath(
			this.resolveTestPath(),
			'utilities/{{@latest}}/index.md'
		)

		assert.isEqual(resolved, expected)
	}

	@test()
	protected static async canGetLatestVersionBasedOnDir() {
		const resolved = versionUtil.latestVersion(
			this.resolveTestPath('utilities')
		)

		assert.isEqualDeep(resolved, {
			intValue: 20200215,
			stringValue: '2020-02-15',
			constValue: '2020_02_15'
		})
	}
}
