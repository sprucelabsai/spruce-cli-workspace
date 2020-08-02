import pathUtil from 'path'
import AbstractSpruceTest, { assert, test } from '@sprucelabs/test'
import versionUtil, { formatDate } from '../../version.utility'

export default class HandlesVersioningTest extends AbstractSpruceTest {
	@test()
	protected static async hasResolvePathFunction() {
		assert.isFunction(versionUtil.resolvePath)
	}

	@test()
	protected static async canResolveLatest() {
		const expected = this.resolveTestPath('services/v2020_01_10/index.md')

		const resolved = versionUtil.resolvePath(
			this.resolveTestPath(),
			'services/{{@latest}}/index.md'
		)

		assert.isEqual(resolved, expected)
	}

	@test()
	protected static async canResolveLatestOnDifferentDirectory() {
		const expected = this.resolveTestPath('utilities/v2020_02_15/index.md')

		const resolved = versionUtil.resolvePath(
			this.resolveTestPath(),
			'utilities/{{@latest}}/index.md'
		)

		assert.isEqual(resolved, expected)
	}

	@test()
	protected static async canGenerateLatestPath() {
		const date = formatDate(new Date())
		const expected = this.resolveTestPath(`utilities/v${date}/index.md`)

		const resolved = versionUtil.resolveNewLatestPath(
			this.resolveTestPath(),
			'utilities/{{@latest}}/index.md'
		)

		assert.isEqual(resolved, expected)
	}

	@test()
	protected static async canGetLatestVersionBasedOnDir() {
		const resolved = versionUtil.latestVersionAtPath(
			this.resolveTestPath('utilities')
		)

		assert.isEqualDeep(resolved, {
			intValue: 20200215,
			dirValue: 'v2020_02_15',
			constValue: 'v2020_02_15',
		})
	}

	protected static resolveTestPath(...pathAfterTestDirsAndFiles: string[]) {
		return pathUtil.join(
			__dirname,
			'..',
			'testDirsAndFiles',
			...pathAfterTestDirsAndFiles
		)
	}
}
