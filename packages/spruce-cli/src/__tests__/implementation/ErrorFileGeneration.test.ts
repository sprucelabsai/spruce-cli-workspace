/* eslint-disable @typescript-eslint/member-ordering */
import pathUtil from 'path'
import { templates } from '@sprucelabs/spruce-templates'
import { assert, test } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import ErrorGenerator from '../../generators/ErrorGenerator'
import SchemaStore from '../../stores/SchemaStore'
import diskUtil from '../../utilities/disk.utility'

export default class ErrorStoreTest extends AbstractCliTest {
	protected static store: SchemaStore
	protected static async beforeEach() {
		super.beforeEach()
		this.store = this.StoreFactory().Store(
			'schema',
			pathUtil.join(__dirname, '..', '..')
		)
	}

	@test()
	protected static async badDirThrows() {
		const store = this.store
		await assert.doesThrowAsync(
			async () =>
				store.fetchAllTemplateItems({
					localSchemaDir: '/should-no-match-anything-ever',
					fetchRemoteSchemas: false,
					enableVersioning: false,
				}),
			/DIRECTORY_NOT_FOUND:/i
		)
	}

	@test()
	protected static async findsNoItemsInDirWithoutBuilders() {
		const results = await this.fetchTemplateItems('errors_empty')
		assert.isEqual(results.items.length, 0)
	}

	@test()
	protected static async findsItemsInDir() {
		const results = await this.fetchTemplateItems('errors_good')
		assert.isAbove(results.items.length, 0)
	}

	private static async fetchTemplateItems(
		dir: 'errors_good' | 'errors_one_bad' | 'errors_bad' | 'errors_empty'
	) {
		const store = this.store
		const results = await store.fetchSchemaTemplateItems({
			localLookupDir: pathUtil.join(__dirname, '..', 'testDirsAndFiles', dir),
			enableVersioning: false,
			fetchRemoteSchemas: false,
		})
		return results
	}

	@test()
	protected static async findsItemsAndBadInDir() {
		const results = await this.fetchTemplateItems('errors_one_bad')
		assert.isAbove(results.items.length, 0)
		assert.isAbove(results.errors.length, 0)
	}

	@test()
	protected static async goodItemsAreGood() {
		const results = await this.fetchTemplateItems('errors_good')
		const first = results.items[0]

		assert.isObject(first)

		const match = results.items.find((item) => item.namePascal === 'TestOne')
		const match2 = results.items.find((item) => item.namePascal === 'TestTwo')

		assert.isObject(match)
		assert.isObject(match2)
	}

	@test()
	protected static async createsErrorClass() {
		const response = await this.fetchGoodItemsAndGenerateErrorClass()
		assert.isOk(response)
	}

	private static async fetchGoodItemsAndGenerateErrorClass() {
		const results = await this.fetchTemplateItems('errors_good')
		const generator = new ErrorGenerator(templates)
		const filePath = pathUtil.join(this.cwd, 'ErrorTest.ts')
		const response = await generator.generateOrAppendErrorsToClass(
			filePath,
			results.items
		)
		return response
	}

	@test()
	protected static async generatedErrorClassFile() {
		const response = await this.fetchGoodItemsAndGenerateErrorClass()
		assert.doesInclude(response, { name: 'ErrorTest.ts' })
	}

	@test()
	protected static async generatedClassFileErrorCanBeImported() {
		const response = await this.fetchGoodItemsAndGenerateErrorClass()
		const errorClass = response.find((f) => f.name === 'ErrorTest.ts')

		assert.isOk(errorClass)

		const path = errorClass.path

		assert.isString(path)

		const contents = diskUtil.readFile(path)

		assert.doesInclude(contents, /ErrorCode.TestOne/gi)
		assert.doesInclude(contents, /ErrorCode.TestTwo/gi)
	}
}
