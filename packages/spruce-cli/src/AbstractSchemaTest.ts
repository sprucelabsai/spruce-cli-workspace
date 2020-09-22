import AbstractCliTest from './AbstractCliTest'
import { ICliBootOptions } from './cli'

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

	protected static async installSchemaFeature(
		cacheKey?: string,
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
