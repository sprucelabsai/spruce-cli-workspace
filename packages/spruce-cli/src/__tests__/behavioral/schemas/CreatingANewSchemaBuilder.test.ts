import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import { Service } from '../../../factories/ServiceFactory'
import { IFeatureActionExecuteResponse } from '../../../features/features.types'
import diskUtil from '../../../utilities/disk.utility'
import testUtil from '../../../utilities/test.utility'
import versionUtil from '../../../utilities/version.utility'

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

		assert.isOk(response)

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

		const checker = this.Service(Service.TypeChecker)

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
	protected static async errorsWithBad() {
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
			/invalid/i
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
