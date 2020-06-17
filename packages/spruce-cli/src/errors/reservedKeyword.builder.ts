import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'

const reservedKeywordDefinition = buildErrorDefinition({
	id: 'reservedKeyword',
	name: 'Reserved Javascript Keyword',
	description: 'A reserved js keyword was used',
	fields: {
		keyword: {
			type: FieldType.Text,
			label: 'The invalid keyword',
			isRequired: true
		}
	}
})

export default reservedKeywordDefinition
