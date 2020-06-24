import { test, assert } from '@sprucelabs/test'
import { Service } from '../../../factories/ServiceFactory'
import versionUtil from '../../../utilities/version.utility'
import BaseSchemaTest from './BaseSchemaTest'

export default class CreatingANewSchemaBuilderTest extends BaseSchemaTest {
	@test()
	protected static async failsWhenASkillIsNotInstalled() {
		const cli = await this.Cli()
		assert.throws(
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
		const cli = await this.bootCliInstallSchemasAndSetCwd()
		const response = await cli.createSchema({
			nameReadable: 'Test schema!',
			namePascal: 'Test',
			nameCamel: 'test',
			description: 'this is so great!'
		})

		assert.isOk(response)

		const expectedDestination = versionUtil.resolveNewLatestPath(
			this.cwd,
			'services',
			'{{@latest}}',
			'test.builder.ts'
		)
		assert.equal(response.generatedFiles[0].path, expectedDestination)
	}

	@test()
	protected static async builderFileValidatesInstallingInSchemaDirectory() {
		const cli = await this.bootCliInstallSchemasAndSetCwd()
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
