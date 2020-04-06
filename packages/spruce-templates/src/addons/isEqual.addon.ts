import handlebars from 'handlebars'

/* Quick way to do an equals check against 2 values */
handlebars.registerHelper('isEqual', function(arg1, arg2, options) {
	//@ts-ignore // TODO how should this work in a typed environment?
	return arg1 == arg2 ? options.fn(this) : options.inverse(this)
})
