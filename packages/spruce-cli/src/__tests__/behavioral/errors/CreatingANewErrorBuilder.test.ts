import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractErrorTest from '../../../tests/AbstractErrorTest'
import testUtil from '../../../tests/utilities/test.utility'

export default class CreatingANewErrorBuilderTest extends AbstractErrorTest {
	@test()
	protected static async hasCreateAction() {
		assert.isFunction(this.Action('error', 'create').execute)
	}

	@test()
	protected static async failsWhenNotProvidedName() {
		const createAction = await this.installErrorsAndGetCreateAction()
		const err = await assert.doesThrowAsync(() => createAction.execute({}))
		errorAssertUtil.assertError(err, 'VALIDATION_FAILED')
	}

	protected static async installErrorsAndGetCreateAction() {
		await this.installErrorFeature('errors')
		return this.Action('error', 'create')
	}

	@test()
	protected static async createsValidBuilder() {
		const action = await this.installErrorsAndGetCreateAction()
		const results = await action.execute({
			nameReadable: 'Test failed',
			nameCamel: 'testFailed',
		})

		assert.isFalsy(results.errors)

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			/testFailed.builder/,
			results.files
		)

		await this.Service('typeChecker').check(match)
	}

	@test()
	protected static async buildCreatesValidSchemaAndOptionsFile() {
		const action = await this.installErrorsAndGetCreateAction()
		const results = await action.execute({
			nameReadable: 'Test pass',
			nameCamel: 'testPass',
		})

		assert.isFalsy(results.errors)

		testUtil.assertsFileByNameInGeneratedFiles(
			/testPass\.schema/,
			results.files
		)

		testUtil.assertsFileByNameInGeneratedFiles(/options\.types/, results.files)

		await this.assertValidActionResponseFiles(results)
	}

	@test()
	protected static async buildCreatesValidSchemaAndOptionsFileWhenFetchCoreSchemasFalse() {
		const action = await this.installErrorsAndGetCreateAction()
		const results = await action.execute({
			nameReadable: 'Test pass',
			nameCamel: 'testPass',
			fetchCoreSchemas: false,
		})

		assert.isFalsy(results.errors)

		testUtil.assertsFileByNameInGeneratedFiles(
			/testPass\.schema/,
			results.files
		)

		testUtil.assertsFileByNameInGeneratedFiles(/options\.types/, results.files)

		await this.assertValidActionResponseFiles(results)

		const cli = await this.Cli()
		const health = await cli.checkHealth()

		assert.isFalsy(health.schema?.errors)
		assert.isTruthy(health.schema?.schemas)
		assert.isLength(health.schema.schemas, 0)
	}
}
