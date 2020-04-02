import AbstractCommand from '../Abstract'
import { Command } from 'commander'
import namedTemplateItemDefinition from '../../schemas/namedTemplateItem.definition'
import path from 'path'
import globby from 'globby'
import SpruceError from '../../errors/Error'
import { ErrorCode } from '../../.spruce/errors/codes.types'

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
			.action(this.create.bind(this))

		program
			.command('error:sync')
			.description('Generates type files on all error definitions.')
			.option(
				'-l, --lookupDir <dir>',
				'Where should I look for definitions files (*.definition.ts)?',
				'./src/errors'
			)
			.option(
				'-d, --destinationDir <dir>',
				'Where should I write the definitions file?',
				'./src/.spruce/errors'
			)
			.action(this.sync.bind(this))
	}

	// TODO allow passing of name
	public async create(cmd: Command) {
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
			throw new SpruceError({
				code: ErrorCode.Generic,
				friendlyMessage: 'This error already exists!'
			})
		}

		// write the definition
		await this.writeFile(
			errorDefinitionFileDestination,
			this.templates.errorDefinition(names)
		)

		// if there is no error file, lets write one
		if (!this.doesFileExist(errorFileDestination)) {
			const errorContents = this.templates.error(names)
			await this.writeFile(errorFileDestination, errorContents)
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

				await this.writeFile(errorFileDestination, newErrorContents)
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

		this.section({
			headline: 'Success!',
			lines: [`Error class ${errorFileDestination}`]
		})
	}

	public async sync(cmd: Command) {
		const lookupDir = cmd.lookupDir as string
		const destinationDir = cmd.destinationDir as string
		const search = path.join(
			this.resolvePath(lookupDir),
			'**',
			'*.definition.ts'
		)

		const matches = await globby(search)

		// lets clear out the current error dir
		// this.deleteFile()
		await Promise.all(
			matches.map(async filePath => {
				// does this file contain buildErrorDefinition?
				const currentContents = this.readFile(filePath)
				if (currentContents.search(/buildErrorDefinition\({/) === -1) {
					this.log.debug(`Skipping ${filePath}`)
					return
				}

				//generate error option types based on new file
				const {
					pascalName,
					camelName
				} = this.generators.schema.generateTypesFromDefinitionFile(
					filePath,
					this.resolvePath(destinationDir),
					'definitionTypes'
				)

				// tell them how to use it
				this.headline(`${pascalName} examples:`)

				this.writeLn('')
				this.codeSample(this.templates.schemaExample({ pascalName, camelName }))

				this.writeLn('')
				this.writeLn('')
			})
		)

		// rebuild the errors codes
		await this.generators.error.rebuildCodesTypesFile({
			lookupDir: this.resolvePath(lookupDir),
			destinationFile: this.resolvePath(destinationDir, 'codes.types.ts')
		})

		// rebuild error options
		await this.generators.error.rebuildOptionsTypesFile({
			lookupDir: this.resolvePath(lookupDir),
			destinationFile: this.resolvePath(destinationDir, 'options.types.ts')
		})
	}
}
