import path from 'path'
import AbstractGenerator from './Abstract'
import globby from 'globby'
import { ISchemaDefinition } from '@sprucelabs/schema'

export default class ErrorGenerator extends AbstractGenerator {
	/** take a definition file and generate options type */
	public generateTypesFromDefinitionFile(
		sourceFile: string,
		destinationDir: string
	): {
		destination: string
		camelName: string
		pascalName: string
		contents: string
	} {
		let definition: ISchemaDefinition | undefined

		try {
			definition = this.utilities.vm.importDefinition(sourceFile)
		} catch (err) {
			this.log.crit('I could not load the error definition file')
			this.log.crit(err)
		}

		if (!definition) {
			throw new Error('Importing error definition failed')
		}

		//get variations on name
		const camelName = this.utilities.names.toCamel(definition.id)
		const pascalName = this.utilities.names.toPascal(definition.name)
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
		const contents = this.templates.errorTypes({
			camelName,
			pascalName,
			description: description ?? `description missing, add to ${sourceFile}`,
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

	/** rebuilds the codes */
	public async rebuildCodesTypesFile(options: {
		lookupDir: string
		destinationFile: string
	}) {
		const { lookupDir, destinationFile } = options

		// find all definition files in the lookup dir
		const search = path.join(lookupDir, '*.definition.ts')
		const matches = await globby(search)

		const codes: {
			pascalName: string
			constName: string
			description: string
		}[] = []

		matches.forEach(file => {
			const pathStr = path.dirname(file)
			const filename = file.substr(pathStr.length + 1)
			const nameParts = filename.split('.')

			//get variations on name
			const camelName = this.utilities.names.toCamel(nameParts[0])
			const pascalName = this.utilities.names.toPascal(camelName)
			const constName = this.utilities.names.toConst(camelName)

			codes.push({ pascalName, constName, description: 'coming soon' })
		})

		const contents = this.templates.errorCodesTypes({ codes })
		this.writeFile(destinationFile, contents)
	}

	/** rebuilds the options  */
	public async rebuildOptionsTypesFile(options: {
		lookupDir: string
		destinationFile: string
	}) {
		const { lookupDir, destinationFile } = options

		// find all definition files in the lookup dir
		const search = path.join(lookupDir, '*.definition.ts')
		const matches = await globby(search)

		const errorOptions: {
			pascalName: string
			camelName: string
		}[] = []

		matches.forEach(file => {
			const pathStr = path.dirname(file)
			const filename = file.substr(pathStr.length + 1)
			const nameParts = filename.split('.')

			//get variations on name
			const camelName = this.utilities.names.toCamel(nameParts[0])
			const pascalName = this.utilities.names.toPascal(camelName)

			errorOptions.push({ pascalName, camelName })
		})

		const contents = this.templates.errorOptionsTypes({ options: errorOptions })
		this.writeFile(destinationFile, contents)
	}
}
