import handlebars from 'handlebars'
import { camelCase } from 'lodash'

/* Start case (cap first letter, lower rest) */
handlebars.registerHelper('camelCase', val => {
	return camelCase(val)
})
