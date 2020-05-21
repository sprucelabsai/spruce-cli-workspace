import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const eventTemplateDefinition = buildSchemaDefinition({
	...SpruceSchemas.Local.NamedTemplateItem.definition,
	id: 'eventTemplate',
	name: 'eventTemplate',
	description: 'Used to collect input of an event',
	fields: {
		...SpruceSchemas.Local.NamedTemplateItem.definition.fields,
		slug: {
			type: FieldType.Text,
			isRequired: true,
			label: 'Slug',
			description: 'The event name slugified'
		}
	}
})

export default eventTemplateDefinition
