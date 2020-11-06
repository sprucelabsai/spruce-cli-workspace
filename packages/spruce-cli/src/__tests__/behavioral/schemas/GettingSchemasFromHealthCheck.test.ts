import { ISchema } from '@sprucelabs/schema'
import * as coreSchemas from '@sprucelabs/spruce-core-schemas'
import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { ICli } from '../../../cli'
import AbstractSchemaTest from '../../../test/AbstractSchemaTest'

export default class GettingSchemasFromHealthCheckTest extends AbstractSchemaTest {
	@test()
	protected static async getsCoreSchemasFromHealthCheck() {
		const cli = await this.installAndSyncSchemas()

		const cleanedExpected = this.generateExpectedHealthSchemas(
			Object.values(coreSchemas)
		)

		await this.assertExpectedSchemas(cli, cleanedExpected)
	}

	private static async assertExpectedSchemas(cli: ICli, expected: ISchema[]) {
		const health = await cli.checkHealth()
		assert.isFalsy(health.skill.errors)
		assert.isTruthy(health.schema)
		assert.isEqual(health.schema.status, 'passed')

		assert.isEqualDeep(this.sortSchemas(health.schema.schemas), expected)
	}

	@test()
	protected static async getsCoreAndLocalSchemasFromHealthCheck() {
		const cli = await this.installAndSyncSchemas()
		const createSchema = cli.getFeature('schema').Action('create')

		await createSchema.execute({
			nameReadable: 'Test schema!',
			namePascal: 'Test',
			nameCamel: 'test',
			description: 'this is so great!',
		})

		const cleanedExpected = this.generateExpectedHealthSchemas([
			...Object.values(coreSchemas),
			{
				id: 'test',
				name: 'Test schema!',
				version: versionUtil.generateVersion().constValue,
				namespace: 'Testing',
				description: 'this is so great!',
			},
		])

		await this.assertExpectedSchemas(cli, cleanedExpected)
	}

	private static async installAndSyncSchemas() {
		const cli = await this.installSchemaFeature('schemas')
		await cli.getFeature('schema').Action('sync').execute({})
		return cli
	}
}