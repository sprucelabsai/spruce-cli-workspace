import { ISchemaDefinition } from '@sprucelabs/schema'
import { ISchemaTemplateItem } from '@sprucelabs/schema'
import { SchemaField } from '@sprucelabs/schema'
import handlebars from 'handlebars'
import { camelCase, uniq } from 'lodash'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

handlebars.registerHelper('importRelatedDefinitions', function (
	definition: ISchemaDefinition,
	options
) {
	if (!definition) {
		throw new Error(
			'importRelatedDefinitions needs a ISchemaDefinition as the first arg'
		)
	}

	const {
		data: { root },
	} = options

	const schemaTemplateItems: ISchemaTemplateItem[] | undefined =
		root?.schemaTemplateItems

	if (!schemaTemplateItems) {
		throw new Error(
			'importRelatedDefinitions needs schemaTemplateItems passed to parent template'
		)
	}

	const fields = Object.values(definition.fields ?? {})
	const imports: string[] = []

	fields.forEach((field) => {
		if (field.type === FieldType.Schema) {
			const related = SchemaField.mapFieldDefinitionToSchemaIdsWithVersion(
				field
			)
			related.forEach((idWithVersion) => {
				const matched = schemaTemplateItems.find(
					(t) =>
						t.id === idWithVersion.id &&
						t.definition.version === idWithVersion.version
				)
				if (matched) {
					imports.push(
						`import ${matched.nameCamel}Definition${
							matched.namespace
						} from '#spruce/schemas/${camelCase(matched.namespace)}/${
							matched.nameCamel
						}.definition'`
					)
				}
			})
		}
	})

	return uniq(imports).join('\n')
})
