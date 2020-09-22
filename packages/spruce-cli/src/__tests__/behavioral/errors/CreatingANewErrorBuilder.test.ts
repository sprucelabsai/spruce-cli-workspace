import { test, assert } from '@sprucelabs/test'
import AbstractErrorTest from '../../../AbstractErrorTest'
import testUtil from '../../../utilities/test.utility'

export default class CreatingANewErrorBuilderTest extends AbstractErrorTest {
	@test()
	protected static async hasCreateAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('error').Action('create').execute)
	}

	@test()
	protected static async failsWhenSkillNotInstalled() {
		const cli = await this.Cli()
		await assert.doesThrowAsync(
			() => cli.getFeature('error').Action('create').execute({}),
			/SKILL_NOT_INSTALLED/
		)
	}

	@test()
	protected static async failsWhenNotProvidedName() {
		const createAction = await this.installErrorsAndGetCreateAction()
		await assert.doesThrowAsync(
			() => createAction.execute({}),
			/nameCamel is required/gis
		)
	}

	protected static async installErrorsAndGetCreateAction() {
		const cli = await this.installErrorFeature('error-builder')
		return cli.getFeature('error').Action('create')
	}

	@test()
	protected static async createsValidBuilder() {
		const action = await this.installErrorsAndGetCreateAction()
		const results = await action.execute({
			nameReadable: 'Test failed',
			nameCamel: 'testFailed',
		})

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			/testFailed.builder/,
			results.files ?? []
		)

		await this.Service('typeChecker').check(match)
	}

	@test()
	protected static async buildCreatesValidDefinitionAndOptionsFile() {
		const action = await this.installErrorsAndGetCreateAction()
		const results = await action.execute({
			nameReadable: 'Test pass',
			nameCamel: 'testPass',
		})

		testUtil.assertsFileByNameInGeneratedFiles(
			/testPass\.schema/,
			results.files ?? []
		)

		testUtil.assertsFileByNameInGeneratedFiles(
			/options\.types/,
			results.files ?? []
		)

		const typeChecker = this.Service('typeChecker')
		for (const file of results.files ?? []) {
			await typeChecker.check(file.path)
		}
	}
}
