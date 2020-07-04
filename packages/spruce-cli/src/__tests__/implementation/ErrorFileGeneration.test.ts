/* eslint-disable @typescript-eslint/member-ordering */
import pathUtil from 'path'
import { templates } from '@sprucelabs/spruce-templates'
import { assert, test } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import ErrorGenerator from '../../generators/ErrorGenerator'
import ErrorStore from '../../stores/ErrorStore'
import diskUtil from '../../utilities/disk.utility'

export default class ErrorStoreTest extends AbstractCliTest {
	protected static store: ErrorStore
	protected static async beforeEach() {
		super.beforeEach()
		this.store = new ErrorStore(
			pathUtil.join(__dirname, '..', '..'),
			this.ServiceFactory()
		)
	}

	@test()
	protected static hasFetchErrorTemplateTimesMethod() {
		const store = this.store
		assert.isFunction(store.fetchErrorTemplateItems)
	}

	@test()
	protected static async badDirThrows() {
		const store = this.store
		await assert.doesThrowAsync(
			async () =>
				store.fetchErrorTemplateItems('/should-no-match-anything-ever'),
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
		const results = await store.fetchErrorTemplateItems(
			pathUtil.join(__dirname, '..', 'testDirsAndFiles', dir)
		)
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

		const match = results.items.find(item => item.namePascal === 'TestOne')
		const match2 = results.items.find(item => item.namePascal === 'TestTwo')

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
		assert.doesInclude(response, { 'generatedFiles[].name': 'Error subclass' })
	}

	@test()
	protected static async generatedClassFileErrorCanBeImported() {
		const response = await this.fetchGoodItemsAndGenerateErrorClass()
		const errorClass = response.generatedFiles.find(
			f => f.name.search('Error') > -1
		)

		assert.isOk(errorClass)

		const path = errorClass.path

		assert.isString(path)

		const contents = diskUtil.readFile(path)

		assert.doesInclude(contents, /ErrorCode.TestOne/gi)
		assert.doesInclude(contents, /ErrorCode.TestTwo/gi)
	}
}
