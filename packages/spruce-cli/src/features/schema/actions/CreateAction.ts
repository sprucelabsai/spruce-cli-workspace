import {
	SchemaDefinitionValues,
	buildSchemaDefinition,
} from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import namedTemplateItemDefinition from '#spruce/schemas/local/namedTemplateItem.definition'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import SchemaGenerator from '../../../generators/SchemaGenerator'
import diskUtil from '../../../utilities/disk.utility'
import namesUtil from '../../../utilities/names.utility'
import { IFeatureAction } from '../../features.types'
import {
	ISyncSchemaActionDefinition,
	syncSchemasActionOptionsDefinition,
} from './SyncAction'

const createSchemaActionDefinition = buildSchemaDefinition({
	id: 'createSchemaAction',
	name: 'Create schema',
	description: 'Create the builder to a fresh new schema!',
	fields: {
		destinationDir: {
			type: FieldType.Text,
			label: 'Destination directory',
			hint: "Where I'll save the new schema builder.",
			defaultValue: 'src/schemas',
			isRequired: true,
		},
		addonsLookupDir: syncSchemasActionOptionsDefinition.fields.addonsLookupDir,
		lookupDir: syncSchemasActionOptionsDefinition.fields.lookupDir,
		typesDestinationDir:
			syncSchemasActionOptionsDefinition.fields.typesDestinationDir,
		nameReadable: namedTemplateItemDefinition.fields.nameReadable,
		namePascal: namedTemplateItemDefinition.fields.namePascal,
		nameCamel: namedTemplateItemDefinition.fields.nameCamel,
		description: namedTemplateItemDefinition.fields.description,
	},
})

type ICreateSchemaActionDefinition = typeof createSchemaActionDefinition

export default class CreateAction extends AbstractFeatureAction<
	ICreateSchemaActionDefinition
> {
	public name = 'create'
	public optionsDefinition = createSchemaActionDefinition

	public async execute(
		options: SchemaDefinitionValues<ICreateSchemaActionDefinition>
	) {
		const normalizedOptions = this.validateAndNormalizeOptions(
			options
		) as SchemaDefinitionValues<ICreateSchemaActionDefinition>

		const {
			destinationDir,
			nameCamel,
			namePascal,
			nameReadable,
			...rest
		} = normalizedOptions

		const resolvedDestination = diskUtil.resolvePath(this.cwd, destinationDir)

		const generator = new SchemaGenerator(this.templates)
		const results = await generator.generateBuilder(resolvedDestination, {
			...rest,
			nameCamel,
			nameReadable: nameReadable ?? nameCamel,
			namePascal: namePascal ?? namesUtil.toPascal(nameCamel),
		})

		const syncAction = this.Action('sync') as IFeatureAction<
			ISyncSchemaActionDefinition
		>
		const syncResults = await syncAction.execute({
			...rest,
		})

		return { files: [...results, ...(syncResults.files ?? [])] }
	}
}
