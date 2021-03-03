import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import { CliInterface } from '../../cli'
import AbstractCliTest from '../../tests/AbstractCliTest'
import '@sprucelabs/spruce-store-plugin'
import testUtil from '../../tests/utilities/test.utility'

export default class CreatingDataStoresTest extends AbstractCliTest {
	private static skill1Dir: string
	private static cli: CliInterface

	protected static async beforeAll() {
		await super.beforeAll()
		this.cwd = this.skill1Dir = this.freshTmpDir()
		this.cli = await this.FeatureFixture().installCachedFeatures('stores')
	}

	protected static async beforeEach() {
		await super.beforeEach()
		this.cwd = this.skill1Dir
	}

	@test()
	protected static async hasCreateStoreAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('store').Action('create').execute)
	}

	@test()
	protected static async getsNoStoresBackFromHealthCheck() {
		const health = await this.cli.checkHealth({ isRunningLocally: true })
		assert.isFalsy(health.skill.errors)
		assert.isTruthy(health.store)
		assert.isArray(health.store.stores)
		assert.isLength(health.store.stores, 0)
	}

	@test()
	protected static async generatesValidStoreFile() {
		const results = await this.cli
			.getFeature('store')
			.Action('create')
			.execute({
				nameReadable: 'People',
				nameCamel: 'people',
			})

		assert.isFalsy(results.errors)

		const path = testUtil.assertsFileByNameInGeneratedFiles(
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
		const results = await this.cli
			.getFeature('store')
			.Action('create')
			.execute({
				nameReadable: 'Bids',
				nameCamel: 'bids',
			})

		assert.isFalsy(results.errors)

		const path = testUtil.assertsFileByNameInGeneratedFiles(
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
		const results = await this.cli
			.getFeature('store')
			.Action('create')
			.execute({
				nameReadable: 'Bids',
				nameCamel: 'bids',
			})

		assert.isTruthy(results.errors)
		errorAssertUtil.assertError(results.errors[0], 'STORE_EXISTS')
	}
}
