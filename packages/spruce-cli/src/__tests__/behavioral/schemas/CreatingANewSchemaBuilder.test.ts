import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import { Service } from '../../../factories/ServiceFactory'
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
		const createSchema = await this.getCreateSchemaActionAndSetCwd(
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

	private static async getCreateSchemaActionAndSetCwd(cacheKey?: string) {
		const cli = await this.syncSchemas(cacheKey)
		const createSchema = cli.getFeature('schema').Action('create')

		return createSchema
	}

	@test()
	protected static async builderFileValidates() {
		const response = await this.buildTestSchema()

		const checker = this.Service(Service.TypeChecker)

		await checker.check(response.files?.[0].path ?? '')
		await checker.check(this.schemaTypesFile)

		assert.doesInclude(response.files, { name: 'anotherTest.definition.ts' })
	}

	private static async buildTestSchema() {
		const action = await this.getCreateSchemaActionAndSetCwd(
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
