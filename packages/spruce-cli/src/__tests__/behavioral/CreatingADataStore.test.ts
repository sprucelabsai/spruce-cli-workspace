import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import '@sprucelabs/spruce-store-plugin'
import AbstractSkillTest from '../../tests/AbstractSkillTest'
import testUtil from '../../tests/utilities/test.utility'

export default class CreatingDataStoresTest extends AbstractSkillTest {
	protected static skillCacheKey = 'stores'
	@test()
	protected static async hasCreateStoreAction() {
		assert.isFunction(this.Action('store', 'create').execute)
	}

	@test()
	protected static async getsNoStoresBackFromHealthCheck() {
		const health = await this.cli.checkHealth({ isRunningLocally: true })

		assert.isFalsy(health.skill.errors)
		assert.isTruthy(health.store)
		assert.isFalsy(health.store.errors)
		assert.isArray(health.store.stores)
		assert.isLength(health.store.stores, 0)
	}

	@test()
	protected static async generatesValidStoreFile() {
		const results = await this.Action('store', 'create').execute({
			nameReadable: 'Person',
			nameReadablePlural: 'People',
			namePascal: 'Person',
		})

		assert.isFalsy(results.errors)

		const path = testUtil.assertFileByNameInGeneratedFiles(
			'People.store.ts',
			results.files
		)

		await this.Service('typeChecker').check(path)
	}

	@test()
	protected static async getsOneStoresBackFromHealthCheck() {
		const health = await this.cli.checkHealth({ isRunningLocally: true })
		assert.isTruthy(health.store)
		assert.isFalsy(health.store.errors)
		assert.isLength(health.store.stores, 1)
		assert.isEqual(health.store.stores[0].name, 'People')
	}

	@test()
	protected static async canGenerateASecondStoreFile() {
		const results = await this.Action('store', 'create').execute({
			nameReadable: 'Bid',
			nameReadablePlural: 'Bids',
			namePascal: 'Bid',
		})

		assert.isFalsy(results.errors)

		const path = testUtil.assertFileByNameInGeneratedFiles(
			'Bids.store.ts',
			results.files
		)

		await this.Service('typeChecker').check(path)
	}

	@test()
	protected static async getsSecondStoresBackFromHealthCheck() {
		const health = await this.cli.checkHealth({ isRunningLocally: true })
		assert.isTruthy(health.store)
		assert.isFalsy(health.store.errors)
		assert.isLength(health.store.stores, 2)
		assert.isEqual(health.store.stores[0].name, 'Bids')
		assert.isEqual(health.store.stores[1].name, 'People')
	}

	@test()
	protected static async errorsWhenGeneratingAStoreWithTheSameName() {
		const results = await this.Action('store', 'create').execute({
			nameReadable: 'Bid',
			nameReadablePlural: 'Bids',
			namePascal: 'Bid',
		})

		assert.isTruthy(results.errors)
		errorAssertUtil.assertError(results.errors[0], 'STORE_EXISTS')
	}

	@test()
	protected static async storeFactoryAndStoresAreTyped() {
		await this.Action('store', 'create').execute({
			nameReadable: 'Product',
			nameReadablePlural: 'Products',
			namePascal: 'Product',
		})

		const testFile = this.resolveTestPath('store-test.ts.hbs')
		const testContents = diskUtil.readFile(testFile)

		const dest = this.resolvePath('src', 'test.ts')
		diskUtil.writeFile(dest, testContents)

		await this.Service('typeChecker').check(dest)
	}

	@test()
	protected static async doesNotCreateAbstractTestFileBecauseTestIsNotInstalled() {
		assert.isFalse(
			diskUtil.doesFileExist(CreatingDataStoresTest.getAbstractTestPath())
		)
	}

	private static getAbstractTestPath(): string {
		return this.resolvePath('src', 'tests', 'AbstractDataStoreTest.ts')
	}
}
