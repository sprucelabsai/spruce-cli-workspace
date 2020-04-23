import AbstractService from './AbstractService'
import {
	TemplateRenderAs,
	IFieldTemplateItem,
	FieldDefinition,
	ISchemaTemplateItem
} from '@sprucelabs/schema'
import path from 'path'
import fs from 'fs-extra'
import { templates, importExtractor } from '@sprucelabs/spruce-templates'
import md5 from 'md5'

export interface IValueTypeGetterOptions {
	schemaTemplateItems: ISchemaTemplateItem[]
	fieldTemplateItems: IFieldTemplateItem[]
}

export default class ValueTypeService extends AbstractService {
	public generateKey(renderAs: TemplateRenderAs, definition: FieldDefinition) {
		return md5(`${renderAs}.${JSON.stringify(definition)}`)
	}
	public async allValueTypes(
		options: IValueTypeGetterOptions
	): Promise<Record<string, string>> {
		const { fieldTemplateItems, schemaTemplateItems } = options

		// Field type enum
		let code =
			templates.fieldType({
				fieldTemplateItems
			}) + '\n\n'

		// Imports
		const imports = importExtractor(fieldTemplateItems)
		code += imports
			.map(i => `import * as ${i.importAs} from '${i.package}'`)
			.join('\n')

		// Universals
		code += `

			const templateItems = ${JSON.stringify(schemaTemplateItems)}
			const language = 'ts'
			const globalNamespace = 'SpruceSchemas'

			export const valueTypes = {}

			let definition
			let renderAs
			let importAs

		`
		const rendersAs = Object.values(TemplateRenderAs)
		const valueTypes: Record<string, any> = {}

		// Value types for every unique field options in every schema
		schemaTemplateItems.forEach(async schemaTemplateItem => {
			const { definition } = schemaTemplateItem
			// Loop through and getValueType for each field
			const fields = definition.fields
			const fieldNames = Object.keys(fields ?? {})

			// Each field
			for (const fieldName of fieldNames) {
				// Each render as
				for (const renderAs of rendersAs) {
					// Pull out field definition
					const fieldDefinition = definition.fields?.[fieldName]
					if (fieldDefinition) {
						const key = this.generateKey(renderAs, fieldDefinition).replace(
							/(['])/g,
							'\\$1'
						)
						if (!valueTypes[key]) {
							const { type } = fieldDefinition
							const fieldTemplateItem = fieldTemplateItems.find(
								item => item.camelType === type
							)

							if (!fieldTemplateItem) {
								throw new Error('unknown')
							}
							valueTypes[key] = true

							code += `

							// Value type for ${fieldTemplateItem.pascalName}
							definition = ${JSON.stringify(fieldDefinition)}
							renderAs = '${renderAs}'
							importAs = '${fieldTemplateItem.importAs}'

							valueTypes['${key}'] = ${fieldTemplateItem.importAs}.${
								fieldTemplateItem.isLocal
									? 'default'
									: fieldTemplateItem.className
							}.templateDetails({
								language,
								templateItems,
								globalNamespace,
								definition,
								renderAs,
								importAs
							}).valueType

							`
						}
					}
				}
			}
		})

		const tmpFilePath = path.join(
			this.cwd,
			'.spruce',
			'schemas',
			'.valueType.tmp.ts'
		)
		fs.writeFileSync(tmpFilePath, code)

		const response = await this.utilities.child.importAll<any>(tmpFilePath)
		// TODO lots of validation
		return response.valueTypes as Record<string, string>
	}
}
