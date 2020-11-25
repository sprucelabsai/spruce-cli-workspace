import { SchemaTemplateItem } from '@sprucelabs/schema'
import { CORE_NAMESPACE } from '@sprucelabs/spruce-skill-utils'
import handlebars from 'handlebars'

handlebars.registerHelper('isCoreSchemaTemplateItem', function (
	schemaTemplateItem: SchemaTemplateItem
) {
	return schemaTemplateItem.namespace === CORE_NAMESPACE
})
