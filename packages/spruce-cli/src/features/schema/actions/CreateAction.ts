import AbstractSpruceError from '@sprucelabs/error'
import { normalizeSchemaValues } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import createSchemaActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/createSchemaOptions.schema'
import syncSchemasActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncSchemasOptions.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'

type OptionsSchema =
	SpruceSchemas.SpruceCli.v2020_07_22.CreateSchemaOptionsSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.CreateSchemaOptions
export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'create'
	public optionsSchema = createSchemaActionSchema

	public async execute(options: Options) {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const {
			schemaBuilderDestinationDir,
			nameCamel,
			namePascal,
			nameReadable,
			syncAfterCreate,
			enableVersioning,
			version,
			...rest
		} = normalizedOptions

		const resolvedDestination = diskUtil.resolvePath(
			this.cwd,
			schemaBuilderDestinationDir
		)

		let resolvedVersion: string | undefined

		if (enableVersioning) {
			resolvedVersion = await this.resolveVersion(version, resolvedDestination)
		}

		const generator = this.Writer('schema')
		const results = await generator.writeBuilder(resolvedDestination, {
			...rest,
			nameCamel,
			enableVersioning: enableVersioning ?? undefined,
			version: resolvedVersion,
			nameReadable: nameReadable ?? nameCamel,
			namePascal: namePascal ?? namesUtil.toPascal(nameCamel),
		})

		const syncAction =
			this.Action<SpruceSchemas.SpruceCli.v2020_07_22.SyncSchemasOptionsSchema>(
				'sync'
			)

		let errors: AbstractSpruceError<any>[] | undefined

		if (syncAfterCreate) {
			const syncOptions = normalizeSchemaValues(syncSchemasActionSchema, rest, {
				includePrivateFields: true,
			})
			const syncResults = await syncAction.execute(syncOptions)

			results.push(...(syncResults.files ?? []))
			if (syncResults.errors) {
				errors = syncResults.errors
			}
		}

		return { files: results, errors }
	}
}
