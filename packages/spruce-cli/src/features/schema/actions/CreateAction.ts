import { SchemaValues, buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import NamedTemplateItemSchema from '#spruce/schemas/local/v2020_07_22/namedTemplateItem.schema'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import SchemaGenerator from '../../../generators/SchemaGenerator'
import diskUtil from '../../../utilities/disk.utility'
import namesUtil from '../../../utilities/names.utility'
import versionUtil from '../../../utilities/version.utility'
import { IFeatureAction } from '../../features.types'
import {
	ISyncSchemasActionDefinition,
	syncSchemasActionOptionsDefinition,
} from './SyncAction'

const createSchemaActionDefinition = buildSchema({
	id: 'createSchemaAction',
	name: 'Create schema',
	description: 'Create the builder to a fresh new schema!',
	fields: {
		...syncSchemasActionOptionsDefinition.fields,
		schemaBuilderDestinationDir: {
			type: FieldType.Text,
			label: 'Schema builder destination directory',
			hint: "Where I'll save the new schema builder.",
			defaultValue: 'src/schemas',
		},
		builderFunction: {
			type: FieldType.Text,
			label: 'Builder function',
			hint: 'The function that builds this schema',
			defaultValue: 'buildSchema',
			isPrivate: true,
		},
		syncAfterCreate: {
			type: FieldType.Boolean,
			label: 'Sync after creation',
			hint:
				'This will ensure types and schemas are in sync after you create your builder.',
			isPrivate: true,
			defaultValue: true,
		},
		version: {
			type: FieldType.Text,
			label: 'Version',
			hint: 'Set a version yourself instead of letting me generate one for you',
		},
		nameReadable: NamedTemplateItemSchema.fields.nameReadable,
		namePascal: NamedTemplateItemSchema.fields.namePascal,
		nameCamel: NamedTemplateItemSchema.fields.nameCamel,
		description: NamedTemplateItemSchema.fields.description,
	},
})

export type ICreateSchemaActionDefinition = typeof createSchemaActionDefinition

export default class CreateAction extends AbstractFeatureAction<
	ICreateSchemaActionDefinition
> {
	public name = 'create'
	public optionsSchema = createSchemaActionDefinition

	public async execute(options: SchemaValues<ICreateSchemaActionDefinition>) {
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
			ISyncSchemasActionDefinition
		>

		if (syncAfterCreate) {
			const syncResults = await syncAction.execute({
				...rest,
			})

			results.push(...(syncResults.files ?? []))
		}

		return { files: results }
	}

	private async resolveVersion(
		version: string | null | undefined,
		resolvedDestination: string
	) {
		let resolvedVersion = versionUtil.normalizeVersion(version ?? undefined)

		if (!version) {
			resolvedVersion = await this.askForVersion(
				resolvedDestination,
				resolvedVersion
			)
		}
		versionUtil.assertValidVersion(resolvedVersion)

		return versionUtil.generateVersion(resolvedVersion).dirValue
	}

	private async askForVersion(
		resolvedDestination: string,
		fallbackVersion: string
	) {
		const versions = diskUtil.doesDirExist(resolvedDestination)
			? versionUtil.getAllVersions(resolvedDestination)
			: []
		const todaysVersion = versionUtil.generateVersion()

		let version = fallbackVersion
		const alreadyHasToday = !!versions.find(
			(version) => version.dirValue === todaysVersion.dirValue
		)
		const choices = []

		if (!alreadyHasToday) {
			choices.push({
				label: 'New Version',
				value: todaysVersion.dirValue,
			})
		}

		choices.push(
			...versions
				.sort((a, b) => {
					return a.intValue > b.intValue ? -1 : 1
				})
				.map((version) => ({
					value: version.dirValue,
					label: version.dirValue,
				}))
		)

		if (versions.length > 0) {
			version = await this.term.prompt({
				type: FieldType.Select,
				label: 'Version',
				hint: 'Confirm which version you want to use?',
				isRequired: true,
				options: {
					choices,
				},
			})
		}
		return version
	}
}
