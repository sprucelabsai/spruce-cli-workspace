import handlebars from 'handlebars'

handlebars.registerHelper('valueTypeGeneratorType', function (
	namePascal: string,
	valueTypeGeneratorType: string,
	renderAs: 'typeOnly' | 'asGeneric'
) {
	debugger
	const [generic, typeVariables] = valueTypeGeneratorType.split('<')

	console.log(generic, typeVariables, namePascal, renderAs)
})
