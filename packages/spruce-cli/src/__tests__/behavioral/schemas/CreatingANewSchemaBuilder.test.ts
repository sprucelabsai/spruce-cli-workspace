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
				cli.createSchema({
					nameReadable: 'Test schema!',
					namePascal: 'AnotherTest',
					nameCamel: 'anotherTest',
					description: 'this is so great!'
				}),
			/SKILL_NOT_INSTALLED/
		)
	}

	@test()
	protected static async canBuildFileWithoutCrashing() {
		const cli = await this.bootCliInstallSchemasAndSetCwd(
			'build-without-crashing'
		)
		const response = await cli.createSchema({
			nameReadable: 'Test schema!',
			namePascal: 'Test',
			nameCamel: 'test',
			description: 'this is so great!'
		})

		assert.isOk(response)

		const expectedDestination = versionUtil.resolveNewLatestPath(
			this.cwd,
			'src',
			'schemas',
			'{{@latest}}',
			'test.builder.ts'
		)

		assert.isEqual(response.generatedFiles[0].path, expectedDestination)
	}

	@test()
	protected static async builderFileValidates() {
		const cli = await this.bootCliInstallSchemasAndSetCwd('build-valid-file')
		const response = await cli.createSchema({
			nameReadable: 'Test schema!',
			namePascal: 'AnotherTest',
			nameCamel: 'anotherTest',
			description: 'this is so great!'
		})

		await this.Service(Service.TypeChecker).check(
			response.generatedFiles[0].path
		)
	}
}
