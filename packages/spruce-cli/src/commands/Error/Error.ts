import AbstractCommand from '../Abstract'
import { Command } from 'commander'
import namedTemplateItemDefinition from '../../schemas/namedTemplateItem.definition'
import CliError from '../../errors/CliError'
import { CliErrorCode } from '../../errors/types'

export default class ErrorCommand extends AbstractCommand {
	public attachCommands(program: Command): void {
		program
			.command('error:create')
			.description('Define a new type of error')
			.option(
				'-dd, --errorDestinationDir <dir>',
				'Where should I write the definition file?',
				'./src/errors'
			)
			.option(
				'-td --typesDestinationDir <typesDir>',
				'Where should I write the types file that supports the error?',
				'./src/.spruce/errors'
			)
			.action(this.createError.bind(this))
	}

	public async createError(cmd: Command) {
		const form = this.formBuilder(
			namedTemplateItemDefinition,
			{},
			{
				onWillAskQuestion: this.utilities.names.onWillAskQuestionHandler.bind(
					this.utilities.names
				)
			}
		)

		const names = await form.present({
			fields: [
				'readableName',
				'pascalName',
				'camelName',
				'constName',
				'description'
			]
		})

		const errorDestinationDir = cmd.errorDestinationDir as string
		const typesDestinationDir = cmd.typesDestinationDir as string

		const errorFileDestination = this.resolvePath(
			errorDestinationDir,
			'Error.ts'
		)

		const errorDefinitionFileDestination = this.resolvePath(
			errorDestinationDir,
			`${names.camelName}.definition.ts`
		)

		// if there is already a definition file, blow up
		if (this.doesFileExist(errorDefinitionFileDestination)) {
			throw new CliError({
				code: CliErrorCode.Generic,
				friendlyMessage: 'This error already exists!'
			})
		}

		// write the definition
		this.writeFile(
			errorDefinitionFileDestination,
			this.templates.errorDefinition(names)
		)

		// if there is no error file, lets write one
		if (!this.doesFileExist(errorFileDestination)) {
			const errorContents = this.templates.error(names)
			this.writeFile(errorFileDestination, errorContents)
		} else {
			const errorBlock = this.templates.error({
				...names,
				renderClassDefinition: false
			})

			// try and drop in the block right before "default:"
			const currentErrorContents = this.readFile(errorFileDestination)
			const blockMatches = currentErrorContents.search(/\t\t\tdefault:/g)
			if (blockMatches > -1) {
				const newErrorContents =
					currentErrorContents.substring(0, blockMatches) +
					'\n' +
					errorBlock +
					'\n' +
					currentErrorContents.substring(blockMatches)

				this.writeFile(errorFileDestination, newErrorContents)
			} else {
				// could not write to file, output snippet suggestion
				this.warn('Failed to add to Error.ts, here is the block to drop in')
				this.section({ headline: 'Code block example', lines: [errorBlock] })
			}
		}

		//generate error option types based on new file
		this.generators.error.generateTypesFromDefinitionFile(
			errorDefinitionFileDestination,
			this.resolvePath(typesDestinationDir)
		)

		// rebuild the errors codes
		await this.generators.error.rebuildCodesTypesFile({
			lookupDir: this.resolvePath(errorDestinationDir),
			destinationFile: this.resolvePath(typesDestinationDir, 'codes.types.ts')
		})

		// rebuild options union
		await this.generators.error.rebuildOptionsTypesFile({
			lookupDir: this.resolvePath(errorDestinationDir),
			destinationFile: this.resolvePath(typesDestinationDir, 'options.types.ts')
		})

		console.log(names)
		debugger
	}
}
