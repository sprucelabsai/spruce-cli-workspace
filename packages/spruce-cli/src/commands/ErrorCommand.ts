import path from 'path'
import { Command } from 'commander'
import fs from 'fs-extra'
import globby from 'globby'
import { Feature } from '#spruce/autoloaders/features'
import { ErrorCode } from '#spruce/errors/codes.types'
import SpruceError from '../errors/SpruceError'
import log from '../lib/log'
import namedTemplateItemDefinition from '../schemas/namedTemplateItem.definition'
import AbstractCommand from './AbstractCommand'

export default class ErrorCommand extends AbstractCommand {
	public attachCommands(program: Command): void {
		program
			.command('error:create [name]')
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
			.option(
				'-sl --schemaLookupDir <schemaLookupDir>',
				'Where should I write the types file that supports the error?',
				'.src/schemas'
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
			.option(
				'-sl --schemaLookupDir <schemaLookupDir>',
				'Where should I write the types file that supports the error?',
				'.src/schemas'
			)
			.option(
				'-c, --clean',
				'Clean output directory before generating errors, deleting old files.'
			)

			.action(this.sync.bind(this))
	}

	// TODO allow passing of name
	public async create(name: string | undefined, cmd: Command) {
		const errorDestinationDir = cmd.errorDestinationDir as string
		const typesDestinationDir = cmd.typesDestinationDir as string
		const schemaLookupDir = cmd.schemaLookupDir as string

		const form = this.formBuilder({
			definition: namedTemplateItemDefinition,
			initialValues: {
				nameReadable: name
			},
			onWillAskQuestion: this.utilities.names.onWillAskQuestionHandler.bind(
				this.utilities.names
			)
		})

		const names = await form.present({
			fields: [
				'nameReadable',
				'namePascal',
				'nameCamel',
				'nameConst',
				'description'
			]
		})

		const errorFileDestination = this.resolvePath(
			errorDestinationDir,
			'SpruceError.ts'
		)

		const errorDefinitionFileDestination = this.resolvePath(
			errorDestinationDir,
			`${names.nameCamel}.definition.ts`
		)

		// If there is already a definition file, blow up
		if (this.doesFileExist(errorDefinitionFileDestination)) {
			throw new SpruceError({
				code: ErrorCode.Generic,
				friendlyMessage: 'This error already exists!'
			})
		}

		// Make sure error module is installed
		await this.services.feature.install({
			features: [
				{
					feature: Feature.Error
				}
			]
		})

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
				this.term.warn(
					'Failed to add to Error.ts, here is the block to drop in'
				)
				this.term.section({
					headline: 'Code block example',
					lines: [errorBlock]
				})
			}
		}

		//Generate error option types based on new file
		const {
			namePascal,
			definition,
			nameCamel
		} = await this.generators.schema.generateTypesFromDefinitionFile({
			sourceFile: errorDefinitionFileDestination,
			destinationDir: this.resolvePath(typesDestinationDir),
			template: 'errorTypes',
			schemaLookupDir
		})

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
		this.term.headline(`${names.namePascal} examples:`)

		this.term.writeLn('')
		this.term.codeSample(
			this.templates.errorExample({
				namePascal,
				nameCamel,
				definition
			})
		)
	}

	public async sync(cmd: Command) {
		const lookupDir = cmd.lookupDir as string
		const typesDestinationDir = cmd.typesDestinationDir as string
		const errorDestinationDir = cmd.errorDestinationDir as string
		const schemaLookupDir = cmd.schemaLookupDir as string

		const search = path.join(
			this.resolvePath(lookupDir),
			'**',
			'*.definition.ts'
		)

		const matches = await globby(search)
		const allErrors: {
			namePascal: string
			description: string
			nameReadable: string
		}[] = []

		// Make sure error module is installed
		await this.services.feature.install({
			features: [{ feature: Feature.Error }]
		})

		if (cmd.clean) {
			fs.removeSync(`.spruce/errors`)
		}

		// Lets clear out the current error dir
		await Promise.all(
			matches.map(async filePath => {
				// Does this file contain buildErrorDefinition?
				const currentContents = this.readFile(filePath)

				// TODO remove this check
				if (currentContents.search(/buildErrorDefinition\({/) === -1) {
					log.debug(`Skipping ${filePath}`)
					return
				}

				//Generate error option types based on new file
				const {
					namePascal,
					nameCamel,
					definition,
					description,
					nameReadable
				} = await this.generators.schema.generateTypesFromDefinitionFile({
					sourceFile: filePath,
					destinationDir: this.resolvePath(typesDestinationDir),
					schemaLookupDir,
					template: 'errorTypes'
				})

				// Tell them how to use it
				this.term.headline(`${namePascal}Error examples:`)

				this.term.writeLn('')
				this.term.codeSample(
					this.templates.errorExample({ namePascal, nameCamel, definition })
				)

				this.term.writeLn('')
				this.term.writeLn('')

				// Track all errors
				allErrors.push({ namePascal, nameReadable, description })
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

		this.term.info('All done! 👊')
	}
}
