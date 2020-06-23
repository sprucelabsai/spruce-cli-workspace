import pathUtil from 'path'
import { test, assert } from '@sprucelabs/test'
import BaseCliTest from '../../BaseCliTest'
import { Service } from '../../factories/ServiceFactory'
import { FeatureCode } from '../../FeatureManager'

export default class CreatingANewSchemaBuilderTest extends BaseCliTest {
	@test()
	protected static async canBuildFileWithoutCrashing() {
		const response = await this.createBuilder(this.cwd)
		assert.isOk(response)

		const expectedDestination = pathUtil.join(this.cwd, 'test.builder.ts')
		assert.equal(response.generatedFiles.builder.path, expectedDestination)
	}

	private static async createBuilder(destinationDir: string) {
		const cli = await this.Cli()
		await cli.installFeatures({
			features: [
				{
					code: FeatureCode.Skill,
					options: {
						name: 'test',
						description: 'again'
					}
				},
				{
					code: FeatureCode.Schema
				}
			]
		})
		const response = await cli.createSchema(destinationDir, {
			nameReadable: 'Test schema!',
			nameCamel: 'test',
			description: 'this is so great!'
		})
		return response
	}

	@test.only()
	protected static async builderFileValidatesInstallingInSchemaDirectory() {
		const response = await this.createBuilder(
			pathUtil.join(this.cwd, 'schemas')
		)

		await this.Service(Service.TypeChecker).check(
			response.generatedFiles.builder.path
		)
	}
}
