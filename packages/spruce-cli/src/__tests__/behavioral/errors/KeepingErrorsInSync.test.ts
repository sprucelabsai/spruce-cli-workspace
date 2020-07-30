import { assert, test } from '@sprucelabs/test'
import AbstractErrorTest from '../../../AbstractErrorTest'
import diskUtil from '../../../utilities/disk.utility'
import testUtil from '../../../utilities/test.utility'

export default class KeepingErrorsInSyncTest extends AbstractErrorTest {
	@test()
	protected static async hasSyncErrorAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('error').Action('sync').execute)
	}

	@test()
	protected static async errorsStayInSyncWhenSchemasAreDeleted() {
		const cli = await this.installErrorFeature('options-in-sync')

		const createAction = cli.getFeature('error').Action('create')

		const results = await createAction.execute({
			nameCamel: 'testError',
		})

		const optionsMatch = testUtil.assertsFileByNameInGeneratedFiles(
			/^options\.types/,
			results.files ?? []
		)

		await this.Service('typeChecker').check(optionsMatch)

		const typesMatch = testUtil.assertsFileByNameInGeneratedFiles(
			/^errors\.types/,
			results.files ?? []
		)

		// should contain our test error
		let optionsContent = diskUtil.readFile(optionsMatch)
		assert.doesInclude(optionsContent, /SpruceErrors\.Local\.ITestError/)

		let typesContent = diskUtil.readFile(typesMatch)
		assert.doesInclude(typesContent, /SpruceErrors\.Local.*?ITestError/gis)

		// delete our testError
		const builderMatch = testUtil.assertsFileByNameInGeneratedFiles(
			/testError\.builder/,
			results.files ?? []
		)

		diskUtil.deleteFile(builderMatch)

		// resync
		await cli.getFeature('error').Action('sync').execute({})

		// #spruce/errors should not exist
		assert.isFalse(diskUtil.doesFileExist(this.resolveHashSprucePath('errors')))

		// build 2 errors
		const testError1 = await createAction.execute({
			nameCamel: 'testError1',
		})

		const testError1SchemaMatch = testUtil.assertsFileByNameInGeneratedFiles(
			'testError1.schema',
			testError1.files ?? []
		)

		const testError1BuilderMatch = testUtil.assertsFileByNameInGeneratedFiles(
			'testError1.builder',
			testError1.files ?? []
		)
		await createAction.execute({ nameCamel: 'testError2' })

		// #spruce/errors should exist
		assert.isTrue(diskUtil.doesFileExist(this.resolveHashSprucePath('errors')))

		typesContent = diskUtil.readFile(this.errorTypesFile)

		// types should include both
		assert.doesInclude(typesContent, /SpruceErrors\.Local.*?TestError1/gis)
		assert.doesInclude(typesContent, /SpruceErrors\.Local.*?TestError2/gis)

		// definition file for testError1
		assert.isTrue(diskUtil.doesFileExist(testError1SchemaMatch))

		// delete builder 1
		diskUtil.deleteFile(testError1BuilderMatch)
		assert.isFalse(diskUtil.doesFileExist(testError1BuilderMatch))

		// sync
		await cli.getFeature('error').Action('sync').execute({})

		// types should no longer include test error 1
		typesContent = diskUtil.readFile(this.errorTypesFile)
		assert.doesNotInclude(typesContent, /SpruceErrors\.Local.*?TestError1/)

		// the definition file should be gone now
		assert.isFalse(diskUtil.doesFileExist(testError1SchemaMatch))
	}

	@test()
	protected static async canHandleNestedSchemas() {
		const cli = await this.installErrorFeature('options-in-sync')
		const source = this.resolveTestPath('error_nested_schemas')
		const destination = this.resolvePath('src/errors')

		await diskUtil.copyDir(source, destination)

		const results = await cli.getFeature('error').Action('sync').execute({})
		const match = testUtil.assertsFileByNameInGeneratedFiles(
			/errors\.types/,
			results.files ?? []
		)

		await this.Service('typeChecker').check(match)
	}
}
