import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import createSchemaActionSchema from '#spruce/schemas/local/v2020_07_22/createSchemaAction.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SchemaGenerator from '../../../generators/SchemaGenerator'
import diskUtil from '../../../utilities/disk.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureAction } from '../../features.types'

export default class CreateAction extends AbstractFeatureAction<
	SpruceSchemas.Local.v2020_07_22.ICreateSchemaActionSchema
> {
	public name = 'create'
	public optionsSchema = createSchemaActionSchema

	public async execute(
		options: SpruceSchemas.Local.v2020_07_22.ICreateSchemaAction
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

		const generator = new SchemaGenerator(this.templates)
		const results = await generator.generateBuilder(resolvedDestination, {
			...rest,
			nameCamel,
			enableVersioning: enableVersioning ?? undefined,
			version: resolvedVersion,
			nameReadable: nameReadable ?? nameCamel,
			namePascal: namePascal ?? namesUtil.toPascal(nameCamel),
		})

		const syncAction = this.Action('sync') as IFeatureAction<
			SpruceSchemas.Local.v2020_07_22.ISyncSchemasActionSchema
		>

		if (syncAfterCreate) {
			const syncResults = await syncAction.execute({
				...rest,
			})

			results.push(...(syncResults.files ?? []))
		}

		return { files: results }
	}
}
