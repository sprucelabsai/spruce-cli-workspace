import { SchemaDefinitionValues, ISchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import namedTemplateItemDefinition from '#spruce/schemas/local/namedTemplateItem.definition'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import SchemaGenerator from '../../../generators/SchemaGenerator'
import diskUtil from '../../../utilities/disk.utility'
import namesUtil from '../../../utilities/names.utility'
import { IFeatureAction } from '../../features.types'
import {
	ISyncSchemaOptionsDefinition,
	syncSchemasActionOptionsDefinition,
} from './SyncAction'

type NamedTemplateItem = SpruceSchemas.Local.NamedTemplateItem.IDefinition

export interface ICreateSchemaActionDefinition extends ISchemaDefinition {
	id: 'createSchemaOption'
	name: 'Create schema options'
	fields: {
		destinationDir: {
			type: FieldType.Text
			label: 'Destination directory'
			defaultValue: 'src/schemas'
			isRequired: true
		}
		addonsLookupDir: {
			type: FieldType.Text
			label: 'Id'
			isRequired: true
			defaultValue: 'src/addons'
		}
		lookupDir: {
			type: FieldType.Text
			label: 'Id'
			isRequired: true
			defaultValue: 'src/schemas'
		}
		typesDestinationDir: ISyncSchemaOptionsDefinition['fields']['typesDestinationDir']
		nameReadable: NamedTemplateItem['fields']['nameReadable']
		namePascal: NamedTemplateItem['fields']['namePascal']
		nameCamel: NamedTemplateItem['fields']['nameCamel']
		description: NamedTemplateItem['fields']['description']
	}
}

export default class CreateAction extends AbstractFeatureAction<
	ICreateSchemaActionDefinition
> {
	public name = 'create'
	public optionsDefinition: ICreateSchemaActionDefinition = {
		id: 'createSchemaOption',
		name: 'Create schema options',
		fields: {
			destinationDir: {
				type: FieldType.Text,
				label: 'Destination directory',
				defaultValue: 'src/schemas',
				isRequired: true,
			},
			addonsLookupDir: {
				type: FieldType.Text,
				label: 'Id',
				isRequired: true,
				defaultValue: 'src/addons',
			},
			lookupDir: {
				type: FieldType.Text,
				label: 'Id',
				isRequired: true,
				defaultValue: 'src/schemas',
			},
			typesDestinationDir:
				syncSchemasActionOptionsDefinition.fields.typesDestinationDir,
			nameReadable: namedTemplateItemDefinition.fields.nameReadable,
			namePascal: namedTemplateItemDefinition.fields.namePascal,
			nameCamel: namedTemplateItemDefinition.fields.nameCamel,
			description: namedTemplateItemDefinition.fields.description,
		},
	}

	public async execute(
		options: SchemaDefinitionValues<ICreateSchemaActionDefinition>
	) {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const {
			destinationDir,
			nameCamel,
			namePascal: namePascalOptions,
			nameReadable: nameReadableOptions,
			...rest
		} = normalizedOptions

		const resolvedDestination = diskUtil.resolvePath(this.cwd, destinationDir)

		const generator = new SchemaGenerator(this.templates)
		const results = await generator.generateBuilder(resolvedDestination, {
			...rest,
			nameCamel,
			nameReadable: nameReadableOptions ?? nameCamel,
			namePascal: namePascalOptions ?? namesUtil.toPascal(nameCamel),
		})

		const syncAction = this.Action('sync') as IFeatureAction<
			ISyncSchemaOptionsDefinition
		>
		const syncResults = await syncAction.execute({
			...rest,
		})

		return { files: [...results, ...(syncResults.files ?? [])] }
	}
}
