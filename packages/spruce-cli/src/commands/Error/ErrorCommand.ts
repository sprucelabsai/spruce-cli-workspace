import AbstractCommand from '../AbstractCommand'
import { Command } from 'commander'
import namedTemplateItemDefinition from '../../schemas/namedTemplateItem.definition'
import path from 'path'
import globby from 'globby'
import SpruceError from '../../errors/SpruceError'
import { ErrorCode } from '../../../.spruce/errors/codes.types'

export default class ErrorCommand extends AbstractCommand {
	public attachCommands(program: Command): void {
		program
			.command('error:create')
			.description('Define a new type of error')
			.option(
				'-dd, --errorDestinationDir <errorDestinationDir>',
				'Where should I write the definition and Error class file?',
				'./src/errors'
			)
			.option(
				'-td --typesDestinationDir <typesDestinationDir>',
				'Where should I write the types file that supports the error?',
				'./.spruce/errors'
			)
			.action(this.create.bind(this))

		program
			.command('error:sync')
			.description('Generates type files on all error definitions.')
			.option(
				'-l, --lookupDir <lookupDir>',
				'Where should I look for definitions files (*.definition.ts)?',
				'./src/errors'
			)
			.option(
				'-d, --destinationDir <dir>',
				'Where should I write the definitions file?',
				'./.spruce/errors'
			)
			.option(
				'-td, --typesDestinationDir <typesDestinationDir>',
				'Where should I write the definitions file?',
				'./.spruce/errors'
			)
			.option(
				'-dd, --errorDestinationDir <errorDestinationDir>',
				'Where should I write the Error class file?',
				'./src/errors'
			)

			.action(this.sync.bind(this))
	}

	// TODO allow passing of name
	public async create(cmd: Command) {
		const form = this.formBuilder({
			definition: namedTemplateItemDefinition,
			onWillAskQuestion: this.utilities.names.onWillAskQuestionHandler.bind(
				this.utilities.names
			)
		})

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
			'SpruceError.ts'
		)

		const errorDefinitionFileDestination = this.resolvePath(
			errorDestinationDir,
			`${names.camelName}.definition.ts`
		)

		// If there is already a definition file, blow up
		if (this.doesFileExist(errorDefinitionFileDestination)) {
			throw new SpruceError({
				code: ErrorCode.Generic,
				friendlyMessage: 'This error already exists!'
			})
		}

		// Make sure error module is installed
		this.startLoading()
		await this.utilities.package.install('@sprucelabs/error')
		this.stopLoading()

		// Write the definition
		await this.writeFile(
			errorDefinitionFileDestination,
			this.templates.errorDefinition(names)
		)

		// If there is no error file, lets write one
		if (!this.doesFileExist(errorFileDestination)) {
			const errorContents = this.templates.error({ errors: [names] })
			await this.writeFile(errorFileDestination, errorContents)
		} else {
			const errorBlock = this.templates.error({
				errors: [names],
				renderClassDefinition: false
			})

			// Try and drop in the block right before "default:"
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
				// Could not write to file, output snippet suggestion
				this.warn('Failed to add to Error.ts, here is the block to drop in')
				this.section({ headline: 'Code block example', lines: [errorBlock] })
			}
		}

		//Generate error option types based on new file
		const {
			pascalName,
			definition,
			camelName
		} = this.generators.schema.generateTypesFromDefinitionFile(
			errorDefinitionFileDestination,
			this.resolvePath(typesDestinationDir),
			'errorTypes'
		)

		// Rebuild the errors codes
		await this.generators.error.rebuildCodesTypesFile({
			lookupDir: this.resolvePath(errorDestinationDir),
			destinationFile: this.resolvePath(typesDestinationDir, 'codes.types.ts')
		})

		// Rebuild options union
		await this.generators.error.rebuildOptionsTypesFile({
			lookupDir: this.resolvePath(errorDestinationDir),
			destinationFile: this.resolvePath(typesDestinationDir, 'options.types.ts')
		})

		// Give an example
		this.headline(`${names.pascalName} examples:`)

		this.writeLn('')
		this.codeSample(
			this.templates.errorExample({
				pascalName,
				camelName,
				definition
			})
		)
	}

	public async sync(cmd: Command) {
		const lookupDir = cmd.lookupDir as string
		const typesDestinationDir = cmd.typesDestinationDir as string
		const errorDestinationDir = cmd.errorDestinationDir as string

		const search = path.join(
			this.resolvePath(lookupDir),
			'**',
			'*.definition.ts'
		)

		const matches = await globby(search)
		const allErrors: {
			pascalName: string
			description: string
			readableName: string
		}[] = []

		// Make sure error module is installed
		this.startLoading()
		await this.utilities.package.install('@sprucelabs/error')
		this.stopLoading()

		// Lets clear out the current error dir
		// this.deleteFile()
		await Promise.all(
			matches.map(async filePath => {
				// Does this file contain buildErrorDefinition?
				const currentContents = this.readFile(filePath)

				// TODO remove this check
				if (currentContents.search(/buildErrorDefinition\({/) === -1) {
					this.log.debug(`Skipping ${filePath}`)
					return
				}

				//Generate error option types based on new file
				const {
					pascalName,
					camelName,
					definition,
					description,
					readableName
				} = this.generators.schema.generateTypesFromDefinitionFile(
					filePath,
					this.resolvePath(typesDestinationDir),
					'errorTypes'
				)

				// Tell them how to use it
				this.headline(`${pascalName}Error examples:`)

				this.writeLn('')
				this.codeSample(
					this.templates.errorExample({ pascalName, camelName, definition })
				)

				this.writeLn('')
				this.writeLn('')

				// Track all errors
				allErrors.push({ pascalName, readableName, description })
			})
		)

		// Write error class if it does not exist
		const errorFileDestination = this.resolvePath(
			errorDestinationDir,
			'SpruceError.ts'
		)

		if (!this.doesFileExist(errorFileDestination)) {
			const errorContents = this.templates.error({ errors: allErrors })
			await this.writeFile(errorFileDestination, errorContents)
		}

		// Rebuild the errors codes
		await this.generators.error.rebuildCodesTypesFile({
			lookupDir: this.resolvePath(lookupDir),
			destinationFile: this.resolvePath(typesDestinationDir, 'codes.types.ts')
		})

		// Rebuild error options
		await this.generators.error.rebuildOptionsTypesFile({
			lookupDir: this.resolvePath(lookupDir),
			destinationFile: this.resolvePath(typesDestinationDir, 'options.types.ts')
		})
	}
}
