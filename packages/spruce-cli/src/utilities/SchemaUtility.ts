import AbstractUtility from './AbstractUtility'
import {
	ISchemaDefinition,
	FieldType,
	ISchemaDefinitionFields,
	SchemaError,
	SchemaErrorCode
} from '@sprucelabs/schema'
import { toPascal, toCamel } from './NamesUtility'
import {
	ISchemaTypesTemplateItem,
	ISchemaTemplateNames
} from '@sprucelabs/spruce-templates'

export default class SchemaUtility extends AbstractUtility {
	/** Generate interface and type names based off schema name */
	public generateNames(definition: ISchemaDefinition): ISchemaTemplateNames {
		return {
			pascalName: toPascal(definition.id),
			camelName: toCamel(definition.id),
			readableName: definition.name
		}
	}

	/** All the items you need for a template */
	public generateTemplateItems(options: {
		namespace: string
		/** Array of schema definitions */
		definitions: ISchemaDefinition[]
		/** The items built recursively returned an the end */
		items?: ISchemaTypesTemplateItem[]
		/** For tracking recursively to keep from infinite depth */
		definitionsById?: { [id: string]: ISchemaDefinition }
	}): ISchemaTypesTemplateItem[] {
		const { definitions, items = [], definitionsById = {}, namespace } = options

		let newItems = [...items]

		// Keep track of all definitions
		definitions.forEach(def => {
			definitionsById[def.id] = def
		})

		definitions.forEach(definition => {
			const names = this.generateNames(definition)

			// We've already mapped this type
			const matchIdx = items.findIndex(item => item.definition === definition)

			if (matchIdx > -1) {
				if (definition !== items[matchIdx].definition) {
					throw new SchemaError({
						code: SchemaErrorCode.DuplicateSchema,
						schemaId: definition.id,
						friendlyMessage: 'Found while generating template items'
					})
				}
				return
			}

			// Check children
			Object.values(definition.fields ?? {}).forEach(field => {
				if (field.type === FieldType.Schema) {
					// Find schema reference based on sub schema or looping through all definitions
					const schemaDefinition =
						field.options.schema ||
						definitionsById[field.options.schemaId || 'missing']

					if (!schemaDefinition) {
						throw new SchemaError({
							code: SchemaErrorCode.SchemaNotFound,
							schemaId:
								field.options.schemaId ||
								field.options.schema?.id ||
								'**MISSING ID**',
							friendlyMessage: 'Error while resolving schema fields'
						})
					}
					newItems = this.generateTemplateItems({
						namespace,
						definitions: [schemaDefinition],
						items: newItems,
						definitionsById
					})
				}
			})

			// Was this already added?
			if (newItems.findIndex(item => item.id === definition.id) === -1) {
				newItems.push({
					namespace,
					id: definition.id,
					definition,
					...names
				})
			}
		})

		// Now that everything is mapped, lets change schema fields to id's (vs sub schemas)
		newItems = newItems.map(templateItem => {
			const { definition } = templateItem

			let newFields: ISchemaDefinitionFields | undefined

			Object.keys(definition.fields ?? {}).forEach(name => {
				const field = definition.fields?.[name]

				// If this is a schema field, lets make sure schema id is set correctly
				if (
					field &&
					field.type === FieldType.Schema &&
					!field.options.schemaId
				) {
					if (!newFields) {
						newFields = {}
					}

					// Get the one true id
					const schemaId = field.options.schema
						? field.options.schema.id
						: field.options.schemaId

					// Build new options
					const newOptions = { ...field.options }

					// No schema or schema id options (set again below)
					delete newOptions.schema

					// Setup new field
					newFields[name] = {
						...field,
						options: {
							...newOptions,
							schemaId
						}
					}
				}
			})

			if (newFields) {
				const updatedItem = {
					...templateItem,
					definition: {
						...templateItem.definition,
						fields: {
							...templateItem.definition.fields,
							...newFields
						}
					}
				}
				return updatedItem
			}

			return templateItem
		})

		return newItems
	}
}
