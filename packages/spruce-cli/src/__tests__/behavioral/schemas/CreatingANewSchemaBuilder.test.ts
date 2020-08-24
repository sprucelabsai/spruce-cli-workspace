import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import {
	IFeatureActionExecuteResponse,
	IFeatureAction,
} from '../../../features/features.types'
import TestInterface from '../../../interfaces/TestInterface'
import testUtil from '../../../utilities/test.utility'

export default class CreatingANewSchemaBuilderTest extends AbstractSchemaTest {
	@test()
	protected static async failsWhenASkillIsNotInstalled() {
		const cli = await this.Cli()
		await assert.doesThrowAsync(
			() =>
				cli.getFeature('schema').Action('create').execute({
					nameReadable: 'Test schema!',
					namePascal: 'AnotherTest',
					nameCamel: 'anotherTest',
					description: 'this is so great!',
				}),
			/SKILL_NOT_INSTALLED/
		)
	}

	@test()
	protected static async canBuildFileWithoutCrashing() {
		const createSchema = await this.syncSchemasAndGetCreateAction(
			'creating-a-new-schema-builder'
		)

		const response = await createSchema.execute({
			nameReadable: 'Test schema!',
			namePascal: 'Test',
			nameCamel: 'test',
			description: 'this is so great!',
		})

		assert.isTruthy(response)

		const expectedDestination = versionUtil.resolveNewLatestPath(
			this.cwd,
			'src',
			'schemas',
			'{{@latest}}',
			'test.builder.ts'
		)

		assert.isEqual(response.files?.[0].path, expectedDestination)
	}

	private static async syncSchemasAndGetCreateAction(cacheKey?: string) {
		const cli = await this.syncSchemas(cacheKey)
		const createSchema = cli.getFeature('schema').Action('create')

		return createSchema
	}

	@test()
	protected static async builderAndDefinitionFileValidates() {
		const response = await this.buildTestSchema()

		const checker = this.Service('typeChecker')

		await checker.check(response.files?.[0].path ?? '')
		await checker.check(this.schemaTypesFile)

		assert.doesInclude(response.files, { name: 'anotherTest.schema.ts' })

		const schemaMatch = testUtil.assertsFileByNameInGeneratedFiles(
			'anotherTest.schema.ts',
			response.files ?? []
		)

		await checker.check(schemaMatch)
	}

	@test()
	protected static async errorsWithBadVersion() {
		const action = await this.syncSchemasAndGetCreateAction(
			'creating-a-new-schema-builder'
		)

		await assert.doesThrowAsync(
			() =>
				action.execute({
					nameReadable: 'Bad schema version!',
					namePascal: 'BadSchemaVersion',
					nameCamel: 'badSchemaVersion',
					version: 'v1',
				}),
			/must be in the form/i
		)
	}

	@test()
	protected static async canBuild2SpecificVersions() {
		const action = await this.syncSchemasAndGetCreateAction(
			'creating-a-new-schema-builder'
		)

		const firstResponse = await action.execute({
			nameReadable: 'First schema!',
			namePascal: 'FirstSchema',
			nameCamel: 'firstSchema',
			version: 'v2020_01_10',
		})

		this.validateSchemaFiles(
			firstResponse,
			'firstSchema.schema.ts',
			'v2020_01_10',
			'IFirstSchema'
		)

		const secondResponse = await action.execute({
			nameReadable: 'Second schema!',
			namePascal: 'secondSchema',
			nameCamel: 'secondSchema',
			version: 'v2020_01_11',
		})

		this.validateSchemaFiles(
			secondResponse,
			'secondSchema.schema.ts',
			'v2020_01_11',
			'ISecondSchema'
		)

		this.validateSchemaFiles(
			secondResponse,
			'firstSchema.schema.ts',
			'v2020_01_10',
			'IFirstSchema'
		)
	}

	@test()
	protected static async asksForVersionOnSecondSchema() {
		const action = await this.syncSchemasAndGetCreateAction(
			'creating-a-new-schema-builder'
		)

		const newVersion = versionUtil.generateVersion()

		// create old version first
		await action.execute({
			nameReadable: 'First schema!',
			namePascal: 'FirstSchema',
			nameCamel: 'firstSchema',
			version: 'v2020_01_01',
		})

		await this.assertAnswersFirstTime(action, newVersion)
		await this.assertAnswersSecondTime(action, newVersion)
	}

	// should ask if we want to use the old version we created above or a New Version
	private static async assertAnswersFirstTime(
		action: IFeatureAction,
		newVersion: { intValue: number; constValue: string; dirValue: string }
	) {
		const createPromise = action.execute({
			nameReadable: 'Second schema!',
			namePascal: 'SecondSchema',
			nameCamel: 'secondSchema',
		})

		await this.wait(1000)
		const last = this.term.invocations[this.term.invocations.length - 1]

		assert.isEqual(last?.command, 'prompt')
		assert.isLength(last?.options?.options?.choices, 2)
		assert.isEqualDeep(last?.options?.options?.choices, [
			{
				value: newVersion.dirValue,
				label: 'New Version',
			},
			{
				value: 'v2020_01_01',
				label: 'v2020_01_01',
			},
		])

		await this.term.sendInput(newVersion.dirValue)
		await createPromise
	}

	// should only have 2 options, none of which one "new version" since that was created in secondAnswers
	private static async assertAnswersSecondTime(
		action: IFeatureAction,
		newVersion: { intValue: number; constValue: string; dirValue: string }
	) {
		const createPromise = action.execute({
			nameReadable: 'Third schema',
			namePascal: 'ThirdSchema',
			nameCamel: 'thirdSchema',
		})

		await this.wait(1000)
		const term = this.term as TestInterface
		const last = term.invocations[term.invocations.length - 1]

		assert.isEqualDeep(last?.options?.options?.choices, [
			{
				value: newVersion.dirValue,
				label: newVersion.dirValue,
			},
			{
				value: 'v2020_01_01',
				label: 'v2020_01_01',
			},
		])

		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		this.term.sendInput(newVersion.dirValue)

		const createResults = await createPromise

		const schemaMatch = testUtil.assertsFileByNameInGeneratedFiles(
			'secondSchema.schema.ts',
			createResults.files ?? []
		)

		assert.doesInclude(schemaMatch, newVersion.dirValue)
	}

	private static validateSchemaFiles(
		response: IFeatureActionExecuteResponse,
		expectedFileName: string,
		expectedVersion: string,
		expectedSchemaInterfaceName: string
	) {
		let firstSchemaMatch = testUtil.assertsFileByNameInGeneratedFiles(
			expectedFileName,
			response.files ?? []
		)

		const errors = response.errors ?? []
		if (errors.length > 0) {
			assert.fail(errors[0].friendlyMessage())
		}

		assert.doesInclude(firstSchemaMatch, expectedVersion)
		const firstContents = diskUtil.readFile(firstSchemaMatch)

		assert.doesInclude(
			firstContents,
			new RegExp(
				'SpruceSchemas.Local.' +
					expectedVersion +
					'.*?' +
					expectedSchemaInterfaceName,
				'gis'
			)
		)
	}

	private static async buildTestSchema() {
		const action = await this.syncSchemasAndGetCreateAction(
			'creating-a-new-schema-builder'
		)

		const response = await action.execute({
			nameReadable: 'Test schema!',
			namePascal: 'AnotherTest',
			nameCamel: 'anotherTest',
			description: 'this is so great!',
		})
		return response
	}
}
