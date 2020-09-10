import { IFieldTemplateItem } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { IFetchedField } from '../stores/SchemaStore'

export default class FieldTemplateItemBuilder {
	public generateTemplateItems(fields: IFetchedField[]) {
		const templateItems: IFieldTemplateItem[] = []
		let generatedImportAsCount = 0

		for (let field of fields) {
			const { registration } = field
			const name = registration.className
			let pkg = registration.package
			let importAs = registration.importAs

			if (field.isLocal) {
				pkg = `#spruce/../fields/${registration.className}`
				importAs = `generated_import_${generatedImportAsCount++}`
			}

			const item: IFieldTemplateItem = {
				namePascal: namesUtil.toPascal(name),
				nameCamel: namesUtil.toCamel(name),
				package: pkg,
				className: registration.className,
				importAs,
				nameReadable: registration.className,
				pascalType: namesUtil.toPascal(registration.type),
				camelType: namesUtil.toCamel(registration.type),
				isLocal: field.isLocal,
				description: registration.description,
				valueTypeMapper: registration.valueTypeMapper,
			}

			generatedImportAsCount++

			templateItems.push(item)
		}

		return templateItems
	}
}
