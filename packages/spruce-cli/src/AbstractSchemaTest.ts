import AbstractCliTest from './AbstractCliTest'
import { ICliBootOptions } from './cli'

export default abstract class AbstractSchemaTest extends AbstractCliTest {
	protected static get schemaTypesFile() {
		return this.resolveHashSprucePath('schemas', 'schemas.types.ts')
	}

	protected static async syncSchemas(cacheKey?: string) {
		const cli = await this.installSchemaFeature(cacheKey)

		await cli.getFeature('schema').Action('sync').execute({})

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
			{ ...(bootOptions || {}), graphicsInterface: this.term }
		)

		return cli
	}
}
