import handlebars from 'handlebars'
import { startCase } from 'lodash'
/* start case (cap first letter, lower rest) */
handlebars.registerHelper('startCase', val => {
	return startCase(val)
})
