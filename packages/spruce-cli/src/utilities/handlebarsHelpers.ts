import handlebars from 'handlebars'
import _ from 'lodash'

handlebars.registerHelper('startCase', val => {
	return _.startCase(val)
})
