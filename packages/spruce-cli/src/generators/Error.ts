import path from 'path'
import AbstractGenerator from './Abstract'
import globby from 'globby'
import { ISchemaDefinition } from '@sprucelabs/schema'
import SpruceError from '../errors/Error'
import { ErrorCode } from '../.spruce/errors/codes.types'

export default class ErrorGenerator extends AbstractGenerator {
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
			const definition = this.utilities.vm.importDefinition(file)

			//get variations on name
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
