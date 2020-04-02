import path from 'path'
import AbstractGenerator from './Abstract'
import { ISchemaDefinition } from '@sprucelabs/schema'

export default class SchemaGenerator extends AbstractGenerator {
	/** generate a type file from a definition file */
	public generateTypesFromDefinitionFile(
		sourceFile: string,
		destinationDir: string,
		template: 'definitionTypes' | 'errorTypes' = 'definitionTypes'
	): {
		camelName: string
		pascalName: string
		description: string
		definition: ISchemaDefinition
	} {
		let definition: ISchemaDefinition | undefined

		try {
			definition = this.utilities.vm.importDefinition(sourceFile)
		} catch (err) {
			this.log.crit(`I could not load the error definition file ${sourceFile}`)
			this.log.crit(err)
		}

		if (!definition) {
			throw new Error('Importing error definition failed')
		}

		//get variations on name
		const camelName = this.utilities.names.toCamel(definition.id)
		const pascalName = this.utilities.names.toPascal(definition.id)
		const description = definition.description

		// files
		const newFileName = `${camelName}.types.ts`
		const destination = path.join(destinationDir, newFileName)

		// relative paths
		const relativeToDefinition = path.relative(
			path.dirname(destination),
			sourceFile
		)

		// contents
		const contents = this.templates[template]({
			camelName,
			pascalName,
			description:
				description || `Description missing in schema defined in ${sourceFile}`,
			relativeToDefinition: relativeToDefinition.replace(
				path.extname(relativeToDefinition),
				''
			)
		})

		// does a file exist already, erase it
		this.deleteFile(destination)

		// write
		this.writeFile(destination, contents)

		return {
			camelName,
			pascalName,
			definition,
			description: description || '*definition missing*'
		}
	}
}
