import path from 'path'
import AbstractGenerator from './Abstract'

export default class SchemaGenerator extends AbstractGenerator {
	/** generate a type file from a definition file */
	public generateTypesFromDefinition(
		definitionFile: string,
		destinationDir: string
	): {
		destination: string
		camelName: string
		pascalName: string
		contents: string
	} {
		// names
		//strip out file name from path
		const pathStr = path.dirname(definitionFile)
		const filename = definitionFile.substr(pathStr.length + 1)
		const nameParts = filename.split('.')

		//get variations on name
		const camelName = this.utilities.names.toCamel(nameParts[0])
		const pascalName = this.utilities.names.toPascal(camelName)

		// files
		const newFileName = `${camelName}.types.ts`
		const destination = path.join(destinationDir, newFileName)

		// relative paths
		const relativeToDefinition = path.relative(
			path.dirname(destination),
			definitionFile
		)

		// contents
		const contents = this.templates.definitionTypes({
			camelName,
			pascalName,
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
			destination,
			contents,
			camelName,
			pascalName
		}
	}
}
