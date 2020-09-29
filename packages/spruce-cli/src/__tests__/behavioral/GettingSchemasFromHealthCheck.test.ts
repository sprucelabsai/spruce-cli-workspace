import { ISchema } from '@sprucelabs/schema'
import * as coreSchemas from '@sprucelabs/spruce-core-schemas'
import {
	CORE_SCHEMA_VERSION,
	versionUtil,
} from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../AbstractSchemaTest'
import { ICli } from '../../cli'

export default class GettingSchemasFromHealthCheckTest extends AbstractSchemaTest {
	@test()
	protected static async getsCoreSchemasFromHealthCheck() {
		const cli = await this.installAndSyncSchemas()

		const cleanedExpected = this.generateExpectedResponse(
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

		const cleanedExpected = this.generateExpectedResponse([
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

	private static sortSchemas(schemas: ISchema[]) {
		return schemas.sort((a, b) => (a.id > b.id ? -1 : 1))
	}

	private static generateExpectedResponse(schemas: ISchema[]) {
		const expected = schemas.map((schema) => ({
			// @ts-ignore
			id: schema.id,
			// @ts-ignore
			name: schema.name,
			version: schema.version ?? CORE_SCHEMA_VERSION.constValue,
			namespace: schema.namespace,
			// @ts-ignore
			description: schema.description,
		}))

		const expectedJSon = JSON.stringify(expected)
		const cleanedExpected = JSON.parse(expectedJSon)
		return this.sortSchemas(cleanedExpected)
	}

	private static async installAndSyncSchemas() {
		const cli = await this.installSchemaFeature('getting-schemas-health-check')
		await cli.getFeature('schema').Action('sync').execute({})
		return cli
	}
}
