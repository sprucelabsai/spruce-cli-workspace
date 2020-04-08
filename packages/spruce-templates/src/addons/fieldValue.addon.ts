import handlebars from 'handlebars'
import { FieldDefinition } from '@sprucelabs/schema'

/** Drop in the value of a field which quotes if needed */
handlebars.registerHelper('fieldValue', function(
	fieldDefinition: FieldDefinition,
	value: any
) {
	if (value) {
		// TODO finish this
		console.log(fieldDefinition, value)
		throw new Error('field value not yet implemented')
	}

	return value
})
