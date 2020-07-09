import { SchemaDefinitionValues, ISchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import namedTemplateItemDefinition from '#spruce/schemas/local/namedTemplateItem.definition'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import { IFeatureAction } from '../../feature.types'

type NamedTemplateItem = SpruceSchemas.Local.NamedTemplateItem.IDefinition

interface ICreateSchemasActionOptionsDefinition extends ISchemaDefinition {
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
		nameReadable: NamedTemplateItem['fields']['nameReadable']
		namePascal: NamedTemplateItem['fields']['namePascal']
		nameCamel: NamedTemplateItem['fields']['nameCamel']
		description: NamedTemplateItem['fields']['description']
	}
}

export default class CreateSchemaAction extends AbstractFeatureAction
	implements IFeatureAction<ICreateSchemasActionOptionsDefinition> {
	public name = 'createSchema'
	public optionsDefinition: ICreateSchemasActionOptionsDefinition = {
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
			nameReadable: namedTemplateItemDefinition.fields.nameReadable,
			namePascal: namedTemplateItemDefinition.fields.namePascal,
			nameCamel: namedTemplateItemDefinition.fields.nameCamel,
			description: namedTemplateItemDefinition.fields.description,
		},
	}

	public async execute(
		options: SchemaDefinitionValues<ICreateSchemasActionOptionsDefinition>
	) {
		console.log(options)
	}
}
