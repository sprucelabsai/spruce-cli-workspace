import handlebars from 'handlebars'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import log from '../singletons/log'

/** Drop in the value of a field which quotes if needed */
handlebars.registerHelper(
	'fieldValue',
	function (fieldDefinition: FieldDefinition, value: any) {
		if (value) {
			// TODO finish this
			log.debug(fieldDefinition, value)
			throw new Error('field value not yet implemented')
		}

		return value
	}
)
