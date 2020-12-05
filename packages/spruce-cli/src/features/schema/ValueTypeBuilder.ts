import { FieldTemplateItem, SchemaTemplateItem } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { ValueTypes } from '@sprucelabs/spruce-templates'
import SchemaGenerator from '../../generators/SchemaGenerator'
import ImportService from '../../services/ImportService'

export default class ValueTypeBuilder {
	private schemaGenerator: SchemaGenerator
	private importService: ImportService

	public constructor(
		schemaGenerator: SchemaGenerator,
		importService: ImportService
	) {
		this.schemaGenerator = schemaGenerator
		this.importService = importService
	}

	public async generateValueTypes(options: {
		resolvedDestination: string
		fieldTemplateItems: FieldTemplateItem[]
		schemaTemplateItems: SchemaTemplateItem[]
		globalNamespace?: string
	}) {
		const {
			resolvedDestination,
			fieldTemplateItems,
			schemaTemplateItems,
			globalNamespace,
		} = options

		if (schemaTemplateItems.length === 0) {
			return {}
		}

		const valueTypeResults = await this.schemaGenerator.generateValueTypes(
			resolvedDestination,
			{
				fieldTemplateItems,
				schemaTemplateItems,
				globalNamespace,
			}
		)

		const valueTypes: ValueTypes = await this.importService.importDefault(
			valueTypeResults[0].path
		)

		diskUtil.deleteFile(valueTypeResults[0].path)

		return valueTypes
	}
}
