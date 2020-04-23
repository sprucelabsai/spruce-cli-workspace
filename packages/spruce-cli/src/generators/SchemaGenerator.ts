import path from 'path'
import AbstractGenerator from './AbstractGenerator'
import { ISchemaDefinition } from '@sprucelabs/schema'

export default class SchemaGenerator extends AbstractGenerator {
	/** Generate a type file from a definition file */
	public async generateTypesFromDefinitionFile(
		sourceFile: string,
		destinationDir: string,
		template: 'errorTypes' = 'errorTypes'
	): Promise<{
		camelName: string
		pascalName: string
		description: string
		readableName: string
		definition: ISchemaDefinition
	}> {
		const definition = await this.services.vm.importDefinition(sourceFile)

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

		// TODO what should the namespace be? slug pulled from somewhere
		const schemaTemplateItems = await this.stores.schema.schemaTemplateItems()

		// Contents
		const contents = this.templates[template]({
			schemaTemplateItems,
			definition,
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
