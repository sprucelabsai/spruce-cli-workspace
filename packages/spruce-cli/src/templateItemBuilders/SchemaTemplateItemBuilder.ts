import {
	ISchemaDefinition,
	ISchemaDefinitionFields,
	SchemaError,
	ErrorCode as SchemaErrorCode,
	ISchemaTemplateItem,
	default as Schema
} from '@sprucelabs/schema'
import SchemaField from '@sprucelabs/schema/build/fields/SchemaField'
import FieldType from '#spruce/schemas/fields/fieldType'
import log from '../singletons/log'
import schemaUtil from '../utilities/schema.utility'

export default class SchemaTemplateItemBuilder {
	public accumulateTemplateItems(options: {
		namespace: string
		definitions: ISchemaDefinition[]
		/** The items built recursively returned an the end. Pass it any items already processed. */
		items?: ISchemaTemplateItem[]
		/** For tracking recursively to keep from infinite depth. */
		definitionsById?: { [id: string]: ISchemaDefinition }
		depth?: number
	}): ISchemaTemplateItem[] {
		const {
			definitions,
			items = [],
			definitionsById = {},
			namespace,
			depth = 0
		} = options

		if (depth > 3) {
			return items
		}

		let newItems = [...items]
		const newDefinitions: ISchemaDefinition[] = []
		const alreadyImported = function(definition: ISchemaDefinition) {
			// Find a match
			const match = newItems.find(
				item => item.definition.id.toLowerCase() === definition.id.toLowerCase()
			)

			// If we found a match but it does not match that we already imported, throw an error
			if (
				match &&
				!Schema.areDefinitionsTheSame(match.definition, definition)
			) {
				throw new SchemaError({
					code: SchemaErrorCode.DuplicateSchema,
					schemaId: definition.id,
					friendlyMessage: `This can happen if two definitions have the same id. Checkout the 2 schemas (labeled left/right). Try running \`DEBUG=* spruce schema:sync\` to see additional logging. If you still can't figure it out, checkout the docs for more debugging tips: \n\nhttps://developer.spruce.ai/#/schemas/index?id=relationships\n\nLeft: ${JSON.stringify(
						definition,
						null,
						2
					)}\n\nRight: ${JSON.stringify(match.definition, null, 2)}`
				})
			}

			return !!match
		}

		// Keep track of all definitions (and make sure two with the same id weren't passed)
		definitions.forEach(def => {
			// Make sure this thing is legit
			Schema.validateDefinition(def)

			// Make sure we haven't imported this definition before
			const id = def.id.toLowerCase()

			if (alreadyImported(def)) {
				log.info(`skipping_processing_schema_id: ${def.id}`)
			} else if (
				definitionsById[id] &&
				!Schema.areDefinitionsTheSame(def, definitionsById[id])
			) {
				throw new SchemaError({
					code: SchemaErrorCode.DuplicateSchema,
					schemaId: def.id,
					friendlyMessage: `This can happen if two definitions have the same id. Checkout the 2 schemas (labeled left/right). Try running \`DEBUG=* spruce schema:sync\` to see additional logging. If you still can't figure it out, checkout the docs for more debugging tips: \n\nhttps://developer.spruce.ai/#/schemas/index?id=relationships\n\nLeft: ${JSON.stringify(
						def,
						null,
						2
					)}\n\nRight: ${JSON.stringify(definitionsById[id], null, 2)}`
				})
			} else {
				// This is a new definition, so we want to load it
				newDefinitions.push(def)
				definitionsById[def.id.toLowerCase()] = def
				log.info(`processing_schema_id: ${def.id}`)
			}
		})

		newDefinitions.forEach(definition => {
			const names = schemaUtil.generateNamesForDefinition(definition)
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

			// Check children
			Object.keys(definition.fields ?? {}).forEach(fieldName => {
				const field = definition.fields?.[fieldName]
				log.info(`importing_field: ${definition.id}:${fieldName}`)

				// This is only for lint
				if (!field) {
					return
				}

				if (field.type === FieldType.Schema) {
					let schemasOrIds: (string | ISchemaDefinition)[] | undefined
					try {
						schemasOrIds = SchemaField.fieldDefinitionToSchemasOrIds(field)
					} catch (err) {
						throw new SchemaError({
							code: SchemaErrorCode.InvalidFieldOptions,
							schemaId: definition.id,
							fieldName,
							originalError: err,
							options: field.options,
							friendlyMessage: `${definition.id}.${fieldName} is pointing to a bad schema. This can happen if the schema id's are wrong or you are pointing directly to another definition with a circular dependency.`
						})
					}
					log.info(`detected_schema_field: ${definition.id}:${fieldName}`)
					const schemaDefinitions: ISchemaDefinition[] = schemasOrIds.map(
						schemaOrId => {
							const id = (typeof schemaOrId === 'string'
								? schemaOrId
								: schemaOrId.id
							).toLowerCase()
							let relatedDefinition: any

							if (typeof schemaOrId === 'string') {
								relatedDefinition = definitionsById[id]
							} else {
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
									// FriendlyMessage: `I found a schema that was not valid for the fieldName: "${fieldName}" of schemaId: "${definition.id}". Make sure your options (schema, schemaId, schemas, schemaIds) point to a schema that was built using \`spruce schema:create\`\n\nRead any additional errors below and even more at: https://developer.spruce.ai/#/schemas/index?id=relationships`
									friendlyMessage: `Error in schemaId: "${
										definition.id
									}". The field "${fieldName}" is pointing to a schema id ('${id}') that I couldn't find. Make sure the options point to a schema . The options I received are: \n\n${JSON.stringify(
										field.options,
										null,
										2
									)}\n\nThe schema's I have found are: \n\n${Object.keys(
										definitionsById
									).join(
										'\n'
									)}\nIf the above list is missing a schema definition you expect, make sure `
								})
							}
							return relatedDefinition
						}
					)

					// Find schema reference based on sub schema or looping through all definitions
					for (const schemaDefinition of schemaDefinitions) {
						if (schemaDefinition.id !== definition.id) {
							log.info(
								`importing_schema_field_schema: ${definition.id}:${fieldName} = ${schemaDefinition.id}`
							)
							newItems = this.accumulateTemplateItems({
								namespace,
								definitions: [schemaDefinition],
								items: newItems,
								definitionsById,
								depth: depth + 1
							})
						} else {
							log.info(
								`skipping_importing_schema_field_schema_references_self: ${definition.id}:${fieldName} = ${schemaDefinition.id}`
							)
						}
					}
				}
			})

			// Drop in this definition AFTER all fields are imported because we need them first
			// Only if it has not been added by some deeper relationship
			if (!alreadyImported(definition)) {
				log.info(`finished_importing_schema: ${definition.id}`)

				newItems.push({
					namespace,
					id: definition.id,
					definition,
					...names
				})
			} else {
				log.info(`skipped_finishing_import_schema: ${definition.id}`)
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
					const schemaIds = SchemaField.fieldDefinitionToSchemaIds(field)

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
