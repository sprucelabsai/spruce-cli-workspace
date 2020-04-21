import AbstractUtility from './AbstractUtility'
import {
	ISchemaDefinition,
	FieldType,
	ISchemaDefinitionFields,
	SchemaError,
	SchemaErrorCode,
	SchemaField,
	ISchemaTemplateItem,
	ISchemaTemplateNames
} from '@sprucelabs/schema'
import { toPascal, toCamel } from './NamesUtility'
import Schema from '@sprucelabs/schema'

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
		items?: ISchemaTemplateItem[]
		/** For tracking recursively to keep from infinite depth */
		definitionsById?: { [id: string]: ISchemaDefinition }
	}): ISchemaTemplateItem[] {
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
			Object.keys(definition.fields ?? {}).forEach(fieldName => {
				const field = definition.fields?.[fieldName]

				if (!field) {
					return
				}

				if (field.type === FieldType.Schema) {
					const schemasOrIds = SchemaField.normalizeOptionsToSchemasOrIds(field)

					const schemaDefinitions: ISchemaDefinition[] = schemasOrIds.map(
						schemaOrId => {
							const id =
								typeof schemaOrId === 'string' ? schemaOrId : schemaOrId.id
							let definition: ISchemaDefinition | undefined

							if (typeof schemaOrId === 'string') {
								definition = definitionsById[id]
							} else {
								if (!definitionsById[id]) {
									definitionsById[id] = schemaOrId
								}
								definition = schemaOrId
							}

							Schema.validateDefinition(definition)
							return definition
						}
					)

					// Find schema reference based on sub schema or looping through all definitions
					for (const schemaDefinition of schemaDefinitions) {
						newItems = this.generateTemplateItems({
							namespace,
							definitions: [schemaDefinition],
							items: newItems,
							definitionsById
						})
					}
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

				// If this is a schema field, lets make sure schemaIds is set correctly
				if (field && field.type === FieldType.Schema) {
					const schemaIds = SchemaField.normalizeOptionsToSchemaIds(field)

					if (!newFields) {
						newFields = {}
					}

					// Build new options
					const newOptions = { ...field.options }

					// Everything is normalized as schemaIds
					delete newOptions.schema
					delete newOptions.schemas
					delete newOptions.schemaId

					// Setup new field
					newFields[name] = {
						...field,
						options: {
							...newOptions,
							schemaIds
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
