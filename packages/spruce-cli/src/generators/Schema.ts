import path from 'path'
import AbstractGenerator from './Abstract'
import { ISchemaDefinition } from '@sprucelabs/schema'

export default class SchemaGenerator extends AbstractGenerator {
	/** Generate a type file from a definition file */
	public generateTypesFromDefinitionFile(
		sourceFile: string,
		destinationDir: string,
		template: 'definitionTypes' | 'errorTypes' = 'definitionTypes'
	): {
		camelName: string
		pascalName: string
		description: string
		readableName: string
		definition: ISchemaDefinition
	} {
		const definition = this.services.vm.importDefinition(sourceFile)

		//Get variations on name
		const {
			camelName,
			pascalName,
			readableName
		} = this.utilities.schema.generateNames(definition)
		const description = definition.description

		// Files
		const newFileName = `${camelName}.types.ts`
		const destination = path.join(destinationDir, newFileName)

		// Relative paths
		const relativeToDefinition = path.relative(
			path.dirname(destination),
			sourceFile
		)

		// Contents
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

		// Does a file exist already, erase it
		this.deleteFile(destination)

		// Write
		this.writeFile(destination, contents)

		return {
			camelName,
			pascalName,
			definition,
			description: description || '*definition missing*',
			readableName
		}
	}
}
