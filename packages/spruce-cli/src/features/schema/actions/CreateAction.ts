import { normalizeSchemaValues } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import createSchemaActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/createSchemaAction.schema'
import syncSchemasActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncSchemasAction.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureAction } from '../../features.types'

export default class CreateAction extends AbstractFeatureAction<
	SpruceSchemas.SpruceCli.v2020_07_22.ICreateSchemaActionSchema
> {
	public name = 'create'
	public optionsSchema = createSchemaActionSchema

	public async execute(
		options: SpruceSchemas.SpruceCli.v2020_07_22.ICreateSchemaAction
	) {
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

		const generator = this.Generator('schema')
		const results = await generator.generateBuilder(resolvedDestination, {
			...rest,
			nameCamel,
			enableVersioning: enableVersioning ?? undefined,
			version: resolvedVersion,
			nameReadable: nameReadable ?? nameCamel,
			namePascal: namePascal ?? namesUtil.toPascal(nameCamel),
		})

		const syncAction = this.Action('sync') as IFeatureAction<
			SpruceSchemas.SpruceCli.v2020_07_22.ISyncSchemasActionSchema
		>

		if (syncAfterCreate) {
			const syncOptions = normalizeSchemaValues(syncSchemasActionSchema, rest, {
				includePrivateFields: true,
			})
			const syncResults = await syncAction.execute(syncOptions)

			results.push(...(syncResults.files ?? []))
		}

		return { files: results }
	}
}
