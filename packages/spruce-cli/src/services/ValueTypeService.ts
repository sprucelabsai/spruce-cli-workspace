import path from 'path'
import { TemplateRenderAs } from '@sprucelabs/schema'
import { templates, importExtractor } from '@sprucelabs/spruce-templates'
import fs from 'fs-extra'
import ErrorCode from '#spruce/errors/errorCode'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import SpruceError from '../errors/SpruceError'
import { IValueTypesOptions } from '../generators/ValueTypeGenerator'
import ImportService from './ImportService'

export interface IAllValueTypeOptions extends IValueTypesOptions {}

export default class ValueTypeService extends ImportService {
	private tmpFileCount = 0

	public generateKey(renderAs: TemplateRenderAs, definition: FieldDefinition) {
		return templates.generateFieldKey(renderAs, definition)
	}

	public async allValueTypes(
		options: IAllValueTypeOptions
	): Promise<{ valueTypes: Record<string, string>; errors: SpruceError[] }> {
		const { fieldTemplateItems, schemaTemplateItems } = options

		// We'll track errors here
		const errors: SpruceError[] = []

		// Field type enum
		let code =
			templates.fieldType({
				fieldTemplateItems
			}) + '\n\n'

		// Imports
		const imports = importExtractor(fieldTemplateItems)
		code +=
			imports
				.map(i => `import * as ${i.importAs} from '${i.package}'`)
				.join('\n') + '\n'

		code +=
			"import { IFieldTemplateDetails, ISchemaTemplateItem, TemplateRenderAs } from '@sprucelabs/schema'\n"

		code += "import FieldType from '#spruce/schemas/fields/fieldTypeEnum'\n"

		// Universals
		code += `

			const templateItems = ${JSON.stringify(schemaTemplateItems)}
			const language = 'ts'
			const globalNamespace = 'SpruceSchemas'

			export const valueTypes: Record<string, IFieldTemplateDetails['valueType']> = {}

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
								errors.push(
									new SpruceError({
										code: ErrorCode.ValueTypeServiceError,
										schemaId: definition.id,
										friendlyMessage: `Field ${fieldName} in schema ${definition.id} is marked as type ${type}, but no field exists to handle that type.`
									})
								)
								return
							}
							valueTypes[key] = true

							code += `

							// Rendering ${definition.id}:${fieldName} as ${renderAs} ${
								fieldTemplateItem.namePascal
							}
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
			`valueType-${this.tmpFileCount++}.tmp.ts`
		)
		fs.writeFileSync(tmpFilePath, code)

		const response = await this.importAll<any>(tmpFilePath)

		return { valueTypes: response.valueTypes as Record<string, string>, errors }
	}
}
