import { SchemaTemplateItem } from '@sprucelabs/schema'
import handlebars from 'handlebars'

handlebars.registerHelper(
	'isCoreSchemaTemplateItem',
	function (schemaTemplateItem: SchemaTemplateItem) {
		return schemaTemplateItem.isCoreSchema
	}
)
