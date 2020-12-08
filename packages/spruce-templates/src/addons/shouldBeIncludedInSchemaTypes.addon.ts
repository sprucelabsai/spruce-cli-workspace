import { SchemaTemplateItem } from '@sprucelabs/schema'
import handlebars from 'handlebars'

handlebars.registerHelper(
	'shouldBeIncludedInSchemaTypes',
	function (schemaTemplateItem: SchemaTemplateItem) {
		return (
			!schemaTemplateItem.isCoreSchema &&
			schemaTemplateItem.namespace !== 'MercuryTypes'
		)
	}
)
