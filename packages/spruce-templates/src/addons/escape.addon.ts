import handlebars from 'handlebars'

/* escape quotes */
handlebars.registerHelper('escape', function(variable) {
	return variable && variable.replace(/(['])/g, '\\$1')
})
