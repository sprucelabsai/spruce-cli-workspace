/* eslint-disable @typescript-eslint/member-ordering */
import pathUtil from 'path'
import { templates } from '@sprucelabs/spruce-templates'
import { assert, test } from '@sprucelabs/test'
import BaseCliTest from '../../BaseCliTest'
import ErrorGenerator from '../../generators/ErrorGenerator'
import ErrorStore from '../../stores/ErrorStore'
import diskUtil from '../../utilities/disk.utility'

export default class ErrorStoreTest extends BaseCliTest {
	protected static store: ErrorStore
	protected static async beforeEach() {
		super.beforeEach()
		this.store = new ErrorStore(pathUtil.join(__dirname, '..', '..'))
	}

	@test('Can create store')
	protected static canCreateStore() {
		const store = this.store
		assert.isOk(store)
	}

	@test('Store fetchErrorTemplateItems method')
	protected static hasFetchErrorTemplateTimesMethod() {
		const store = this.store
		assert.isFunction(store.fetchErrorTemplateItems)
	}

	@test('looking up bad directory throws error')
	protected static async badLookupNoItems() {
		const store = this.store
		await assert.throws(
			async () =>
				store.fetchErrorTemplateItems('/should-no-match-anything-ever'),
			/DIRECTORY_NOT_FOUND:/i
		)
	}

	@test('finds no items in directory without error builders')
	protected static async findsNoItemsInDirWithoutBuilders() {
		const store = this.store
		const results = await store.fetchErrorTemplateItems(
			pathUtil.join(__dirname, 'testDirsAndFiles', 'errors_empty')
		)
		assert.equal(results.items.length, 0)
	}

	@test('finds items')
	protected static async findsItemsInDir() {
		const results = await this.fetchTemplateItems('errors_good')
		assert.isAbove(results.items.length, 0)
	}

	private static async fetchTemplateItems(
		dir: 'errors_good' | 'errors_one_bad' | 'errors_bad'
	) {
		const store = this.store
		const results = await store.fetchErrorTemplateItems(
			pathUtil.join(__dirname, 'testDirsAndFiles', dir)
		)
		return results
	}

	@test('finds items and bad items')
	protected static async findsItemsAndBadInDir() {
		const results = await this.fetchTemplateItems('errors_one_bad')
		assert.isAbove(results.items.length, 0)
		assert.isAbove(results.errors.length, 0)
	}

	@test('good items are good')
	protected static async goodItemsAreGood() {
		const results = await this.fetchTemplateItems('errors_good')
		const first = results.items[0]

		assert.isObject(first)

		const match = results.items.find(item => item.namePascal === 'TestOne')
		const match2 = results.items.find(item => item.namePascal === 'TestTwo')

		assert.isObject(match)
		assert.isObject(match2)
	}

	@test('generate does not error')
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

	@test('generated right amount of files')
	protected static async generatedRightAmountOfFiles() {
		const response = await this.fetchGoodItemsAndGenerateErrorClass()
		assert.isString(response.generatedFiles.errorClass?.name)
		assert.isUndefined(response.updatedFiles.errorClass)
	}

	@test('generated file imports as expected')
	protected static async generatedFileErrorCanBeImported() {
		const response = await this.fetchGoodItemsAndGenerateErrorClass()
		const path = response.generatedFiles.errorClass?.path

		assert.isString(path)

		const contents = diskUtil.readFile(path)

		assert.match(contents, /ErrorCode.TestOne/gi)
		assert.match(contents, /ErrorCode.TestTwo/gi)
	}
}
