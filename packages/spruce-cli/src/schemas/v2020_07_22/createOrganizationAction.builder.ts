import { buildSchema } from '@sprucelabs/schema'
import namedTemplateItemBuilder from './namedTemplateItem.builder'

export default buildSchema({
	id: 'createOrganizationAction',
	name: 'create organization action',
	description: '',
	fields: {
		nameReadable: {
			...namedTemplateItemBuilder.fields.nameReadable,
			label: 'Name',
		},
		nameKebab: {
			...namedTemplateItemBuilder.fields.nameKebab,
			label: 'Slug',
		},
	},
})
