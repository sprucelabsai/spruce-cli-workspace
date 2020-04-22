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
import log from '../lib/log'

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
		/** IGNORE: The items built recursively returned an the end */
		items?: ISchemaTemplateItem[]
		/** IGNORE: For tracking recursively to keep from infinite depth */
		definitionsById?: { [id: string]: ISchemaDefinition }
	}): ISchemaTemplateItem[] {
		const { definitions, items = [], definitionsById = {}, namespace } = options

		let newItems = [...items]

		// Keep track of all definitions
		definitions.forEach(def => {
			log.info(`validating_tracking_schema_id: ${def.id}`)
			// Make sure this thing is legit
			Schema.validateDefinition(def)
			// Track
			definitionsById[def.id] = def
		})

		definitions.forEach(definition => {
			const names = this.generateNames(definition)
			log.info(`importing_schema_id: ${definition.id}`)

			// We've already mapped this type
			const matchIdx = items.findIndex(
				item => item.definition.id.toLowerCase() === definition.id.toLowerCase()
			)

			if (matchIdx > -1) {
				log.info(`import_schema_id_stopped_already_complete: ${definition.id}`)
				if (
					!Schema.areDefinitionsTheSame(definition, items[matchIdx].definition)
				) {
					throw new SchemaError({
						code: SchemaErrorCode.DuplicateSchema,
						schemaId: definition.id,
						friendlyMessage: `This can happen if two definitions have the same id. Checkout the 2 schemas (labeled left/right). Try running \`DEBUG=* spruce schema:sync\` to see additional logging. If you still can't figure it out, checkout the docs for more debugging tips: \n\nhttps://developer.spruce.ai/#/schemas/index?id=relationships\n\nLeft: ${JSON.stringify(
							definition,
							null,
							2
						)}\n\nRight: ${JSON.stringify(items[matchIdx].definition, null, 2)}`
					})
				}
				return
			}

			// Add it to the list, then start checking fields for relationships
			newItems.push({
				namespace,
				id: definition.id,
				definition,
				...names
			})

			// Check children
			Object.keys(definition.fields ?? {}).forEach(fieldName => {
				const field = definition.fields?.[fieldName]
				log.info(`importing_field: ${definition.id}:${fieldName}`)

				if (!field) {
					return
				}

				if (field.type === FieldType.Schema) {
					const schemasOrIds = SchemaField.normalizeOptionsToSchemasOrIds(field)
					log.info(`importing_schema_field: ${definition.id}:${fieldName}`)
					const schemaDefinitions: ISchemaDefinition[] = schemasOrIds.map(
						schemaOrId => {
							const id =
								typeof schemaOrId === 'string' ? schemaOrId : schemaOrId.id
							let relatedDefinition: any

							if (typeof schemaOrId === 'string') {
								relatedDefinition = definitionsById[id]
							} else {
								if (!definitionsById[id]) {
									definitionsById[id] = schemaOrId
								}
								relatedDefinition = schemaOrId
							}
							try {
								log.info(
									`validating_schema_field_schema: ${
										definition.id
									}:${fieldName} = ${relatedDefinition?.id ?? '**missing**'}`
								)
								Schema.validateDefinition(relatedDefinition)
							} catch (err) {
								throw new SchemaError({
									code: SchemaErrorCode.InvalidSchemaDefinition,
									schemaId: id ?? '***missing***',
									errors: [],
									originalError: err,
									friendlyMessage: `I was not able to find a valid schema for the fieldName: "${fieldName}" of schemaId: "${definition.id}". Make sure your options (schema, schemaId, schemas, schemaIds) point to a schema was built using \`spruce schema:create\`\n\nRead more: https://developer.spruce.ai/#/schemas/index?id=relationships`
								})
							}
							return relatedDefinition
						}
					)

					// Find schema reference based on sub schema or looping through all definitions
					for (const schemaDefinition of schemaDefinitions) {
						log.info(
							`generating_schema_field_schema_template_items: ${definition.id}:${fieldName} = ${schemaDefinition.id}`
						)
						newItems = this.generateTemplateItems({
							namespace,
							definitions: [schemaDefinition],
							items: newItems,
							definitionsById
						})
					}
				}
			})
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
