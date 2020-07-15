import AbstractSpruceError from '@sprucelabs/error'
import SpruceError from '@sprucelabs/schema/build/errors/SpruceError'
import { test, assert } from '@sprucelabs/test'
import { IFailedToImportErrorOptions } from '#spruce/errors/failedToImport.types'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import diskUtil from '../../../utilities/disk.utility'

export default class HandlesBadLocalSchemasGracefullyTest extends AbstractSchemaTest {
	protected static async beforeEach() {
		super.beforeEach()
	}

	private static moveSchemasIntoPlace() {
		const source = this.resolveTestPath('builders_one_bad')
		const destination = this.resolvePath('src/schemas')

		diskUtil.createDir(destination)
		diskUtil.copyDir(source, destination)
	}

	@test()
	protected static async storeSkipsBadLocalSchemas() {
		await this.syncSchemasAndSetCwd('bad-local-tests')
		this.moveSchemasIntoPlace()

		const store = this.Store('schema')
		const results = await store.fetchAllTemplateItems()

		assert.isAbove(results.schemas.items.length, 1)
		assert.isLength(results.schemas.errors, 1)

		const expectedError = results.schemas.errors.pop() as AbstractSpruceError<
			IFailedToImportErrorOptions
		>

		assert.doesInclude(expectedError?.options.file, 'bad.builder')
	}
}
