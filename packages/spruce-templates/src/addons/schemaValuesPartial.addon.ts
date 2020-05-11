import path from 'path'
import fs from 'fs-extra'
import handlebars from 'handlebars'

const templatePath = path.join(__dirname, '..', 'templates', 'typescript')

const schemaValuesPartial: string = fs
	.readFileSync(path.join(templatePath, 'schemas/partials/schemaValues.hbs'))
	.toString()

handlebars.registerPartial('schemaValues', schemaValuesPartial)
