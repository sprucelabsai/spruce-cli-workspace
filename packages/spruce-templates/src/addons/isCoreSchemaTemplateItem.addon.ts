import { ISchemaTemplateItem } from '@sprucelabs/schema'
import { CORE_NAMESPACE } from '@sprucelabs/spruce-skill-utils'
import handlebars from 'handlebars'

handlebars.registerHelper('isCoreSchemaTemplateItem', function (
	schemaTemplateItem: ISchemaTemplateItem
) {
	return schemaTemplateItem.namespace === CORE_NAMESPACE
})
