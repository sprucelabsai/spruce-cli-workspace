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
			namePascal: string
			nameConst: string
			description: string
		}[] = []

		await Promise.all(
			matches.map(async file => {
				const definition = await this.services.vm.importDefinition(file)

				//Get variations on name
				const nameCamel = this.utilities.names.toCamel(definition.id)
				const namePascal = this.utilities.names.toPascal(nameCamel)
				const nameConst = this.utilities.names.toConst(nameCamel)

				codes.push({
					namePascal,
					nameConst,
					description:
						definition.description ||
						'*** error definition missing description ***'
				})
			})
		)

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
			namePascal: string
			nameCamel: string
		}[] = []

		await Promise.all(
			matches.map(async file => {
				const definition = await this.services.vm.importDefinition(file)

				//Get variations on name
				const nameCamel = this.utilities.names.toCamel(definition.id)
				const namePascal = this.utilities.names.toPascal(nameCamel)

				errorOptions.push({ namePascal, nameCamel })
			})
		)

		const contents = this.templates.errorOptionsTypes({ options: errorOptions })
		this.writeFile(destinationFile, contents)
	}
}
