import handlebars from 'handlebars'
import { startCase } from 'lodash'
/* Start case (cap first letter, lower rest) */
handlebars.registerHelper('startCase', val => {
	return startCase(val)
})
