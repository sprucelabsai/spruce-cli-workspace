import path from 'path'
import fs from 'fs-extra'
import handlebars from 'handlebars'

const templatePath = path.join(__dirname, '..', 'templates', 'typescript')

const schemaDefinitionPartial: string = fs
	.readFileSync(
		path.join(templatePath, 'schemas/partials/schemaDefinition.hbs')
	)
	.toString()

handlebars.registerPartial('schemaDefinition', schemaDefinitionPartial)
