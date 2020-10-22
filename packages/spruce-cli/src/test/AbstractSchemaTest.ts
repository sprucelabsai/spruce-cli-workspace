import { ISchema } from '@sprucelabs/schema'
import {
	CORE_SCHEMA_VERSION,
	SchemaHealthCheckItem,
} from '@sprucelabs/spruce-skill-utils'
import { ICliBootOptions } from '../cli'
import AbstractCliTest from './AbstractCliTest'

export default abstract class AbstractSchemaTest extends AbstractCliTest {
	protected static get schemaTypesFile() {
		return this.resolveHashSprucePath('schemas', 'schemas.types.ts')
	}

	protected static get coreSchemaTypesFile() {
		return this.resolveHashSprucePath('schemas', 'core.schemas.types.ts')
	}

	protected static async syncSchemas(cacheKey?: string, syncOptions = {}) {
		const cli = await this.installSchemaFeature(cacheKey)

		await cli.getFeature('schema').Action('sync').execute(syncOptions)

		return cli
	}

	protected static generateExpectedHealthSchemas(schemas: ISchema[]) {
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

		return this.sortSchemas(cleanedExpected) as SchemaHealthCheckItem['schemas']
	}

	protected static sortSchemas(schemas: ISchema[]) {
		return schemas.sort((a, b) => (a.id > b.id ? -1 : 1))
	}

	protected static async installSchemaFeature(
		cacheKey: string,
		bootOptions?: ICliBootOptions
	) {
		const fixture = this.FeatureFixture()

		const cli = await fixture.installFeatures(
			[
				{
					code: 'skill',
					options: {
						name: 'testing',
						description: 'this is a great test!',
					},
				},
				{
					code: 'schema',
				},
			],
			cacheKey,
			{ ...(bootOptions || {}), graphicsInterface: this.ui }
		)

		return cli
	}
}
