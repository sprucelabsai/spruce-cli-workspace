import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { assert, test } from '@sprucelabs/test'
import AbstractErrorTest from '../../../AbstractErrorTest'
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
			nameReadable: 'Test error',
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
		assert.doesInclude(
			optionsContent,
			/SpruceErrors\.TestingErrors\.ITestError/
		)

		let typesContent = diskUtil.readFile(typesMatch)
		assert.doesInclude(
			typesContent,
			/SpruceErrors\.TestingErrors.*?ITestError/gis
		)

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
			nameReadable: 'Test error 1',
		})

		const testError1SchemaMatch = testUtil.assertsFileByNameInGeneratedFiles(
			'testError1.schema',
			testError1.files ?? []
		)

		const testError1BuilderMatch = testUtil.assertsFileByNameInGeneratedFiles(
			'testError1.builder',
			testError1.files ?? []
		)

		await createAction.execute({
			nameCamel: 'testError2',
			nameReadable: 'Test error 2',
		})

		// #spruce/errors should exist
		assert.isTrue(diskUtil.doesFileExist(this.resolveHashSprucePath('errors')))

		typesContent = diskUtil.readFile(this.errorTypesFile)

		// types should include both
		assert.doesInclude(
			typesContent,
			/SpruceErrors\.TestingErrors.*?TestError1/gis
		)
		assert.doesInclude(
			typesContent,
			/SpruceErrors\.TestingErrors.*?TestError2/gis
		)

		// definition file for testError1
		assert.isTrue(diskUtil.doesFileExist(testError1SchemaMatch))

		// delete builder 1
		diskUtil.deleteFile(testError1BuilderMatch)
		assert.isFalse(diskUtil.doesFileExist(testError1BuilderMatch))

		// sync
		await cli.getFeature('error').Action('sync').execute({})

		// types should no longer include test error 1
		typesContent = diskUtil.readFile(this.errorTypesFile)
		assert.doesNotInclude(
			typesContent,
			/SpruceErrors\.TestingErrors.*?TestError1/
		)

		// the definition file should be gone now
		assert.isFalse(diskUtil.doesFileExist(testError1SchemaMatch))
	}

	@test()
	protected static async canHandleNestedSchemasWithoutAddingThemToOptions() {
		const cli = await this.installErrorFeature('options-in-sync')
		const source = this.resolveTestPath('nested_error_schemas')
		const destination = this.resolvePath('src/errors')

		await diskUtil.copyDir(source, destination)

		const results = await cli.getFeature('error').Action('sync').execute({})
		const errorTypesFile = testUtil.assertsFileByNameInGeneratedFiles(
			/errors\.types/,
			results.files ?? []
		)

		const typeChecker = this.Service('typeChecker')
		await typeChecker.check(errorTypesFile)

		const errorOptionsFile = testUtil.assertsFileByNameInGeneratedFiles(
			/options\.types/,
			results.files ?? []
		)

		const contents = diskUtil.readFile(errorOptionsFile)
		assert.doesNotInclude(contents, 'INestedSchema')

		const errorClassFile = testUtil.assertsFileByNameInGeneratedFiles(
			'SpruceError.ts',
			results.files ?? []
		)
		let classContents = diskUtil.readFile(errorClassFile)
		assert.doesNotInclude(classContents, /NESTED_SCHEMA/)

		const createAction = cli.getFeature('error').Action('create')
		await createAction.execute({
			nameCamel: 'testError2',
			nameReadable: 'Test error 2',
		})

		const syncResults = await cli.getFeature('error').Action('sync').execute({})

		classContents = diskUtil.readFile(errorClassFile)
		assert.doesNotInclude(classContents, /NESTED_SCHEMA/)

		for (const generated of syncResults.files ?? []) {
			await typeChecker.check(generated.path)
		}

		const parentSchema = testUtil.assertsFileByNameInGeneratedFiles(
			'good.schema.ts',
			syncResults.files ?? []
		)

		const parentSchemaContents = diskUtil.readFile(parentSchema)

		assert.doesNotInclude(parentSchemaContents, this.cwd)
	}
}
