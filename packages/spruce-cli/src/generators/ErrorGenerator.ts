import path from 'path'
import AbstractGenerator from './AbstractGenerator'
import globby from 'globby'

export default class ErrorGenerator extends AbstractGenerator {
	/** Rebuilds the codes */
	public async rebuildCodesTypesFile(options: {
		lookupDir: string
		destinationFile: string
	}) {
		const { lookupDir, destinationFile } = options

		// Find all definition files in the lookup dir
		const search = path.join(lookupDir, '*.definition.ts')
		const matches = await globby(search)

		const codes: {
			pascalName: string
			constName: string
			description: string
		}[] = []

		matches.forEach(file => {
			const definition = this.services.vm.importDefinition(file)

			//Get variations on name
			const camelName = this.utilities.names.toCamel(definition.id)
			const pascalName = this.utilities.names.toPascal(camelName)
			const constName = this.utilities.names.toConst(camelName)

			codes.push({
				pascalName,
				constName,
				description:
					definition.description ||
					'*** error definition missing description ***'
			})
		})

		const contents = this.templates.errorCodesTypes({ codes })
		this.writeFile(destinationFile, contents)
	}

	/** Rebuilds the options  */
	public async rebuildOptionsTypesFile(options: {
		lookupDir: string
		destinationFile: string
	}) {
		const { lookupDir, destinationFile } = options

		// Find all definition files in the lookup dir
		const search = path.join(lookupDir, '*.definition.ts')
		const matches = await globby(search)

		const errorOptions: {
			pascalName: string
			camelName: string
		}[] = []

		matches.forEach(file => {
			const definition = this.services.vm.importDefinition(file)

			//Get variations on name
			const camelName = this.utilities.names.toCamel(definition.id)
			const pascalName = this.utilities.names.toPascal(camelName)

			errorOptions.push({ pascalName, camelName })
		})

		const contents = this.templates.errorOptionsTypes({ options: errorOptions })
		this.writeFile(destinationFile, contents)
	}
}
