/* eslint-disable @typescript-eslint/member-ordering */
import { Command } from 'commander'
import fs from 'fs-extra'
import ErrorCode from '#spruce/errors/errorCode'
import namedTemplateItemDefinition from '#spruce/schemas/local/namedTemplateItem.definition'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SpruceError from '../errors/SpruceError'
import FeatureManager, { FeatureCode } from '../FeatureManager'
import ErrorGenerator from '../generators/ErrorGenerator'
import SchemaGenerator from '../generators/SchemaGenerator'
import { IGeneratedFile } from '../types/cli.types'
import diskUtil from '../utilities/disk.utility'
import namesUtil from '../utilities/names.utility'
import AbstractCommand, { ICommandOptions } from './AbstractCommand'

interface IErrorCommandOptions extends ICommandOptions {
	featureManager: FeatureManager
	generators: {
		error: ErrorGenerator
		schema: SchemaGenerator
	}
}

export default class ErrorCommand extends AbstractCommand {
	public errorGenerator: ErrorGenerator
	public schemaGenerator: SchemaGenerator
	public featureManager: FeatureManager

	public constructor(options: IErrorCommandOptions) {
		super(options)
		this.errorGenerator = options.generators.error
		this.schemaGenerator = options.generators.schema
		this.featureManager = options.featureManager
	}

	public attachCommands(program: Command): void {
		program
			.command('error.create [name]')
			.description('Build a new type of error')
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
				"Where should I lookup for schema's?",
				'.src/schemas'
			)
			.action(this.create)

		program
			.command('error.sync')
			.description('Generates type files on all error builder.')
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
			.option(
				'-f, --force',
				'If cleaning, should I suppress confirmations and warnings',
				false
			)

			.action(this.sync)
	}

	public create = async (
		name: string | undefined,
		options: {
			errorDestinationDir: string
			typesDestinationDir: string
			schemaLookupDir: string
		}
	) => {
		const errorDestinationDir = options.errorDestinationDir
		// const typesDestinationDir = options.typesDestinationDir
		// const schemaLookupDir = options.schemaLookupDir

		const nameReadable = name
		const initialValues: Partial<SpruceSchemas.Local.INamedTemplateItem> = {
			nameReadable: name
		}
		let showOverview = false

		if (nameReadable) {
			showOverview = true
			initialValues.nameCamel = namesUtil.toCamel(nameReadable)
			initialValues.namePascal = namesUtil.toPascal(initialValues.nameCamel)
			initialValues.nameConst = namesUtil.toConst(initialValues.nameCamel)
		}

		const form = this.getFormComponent({
			definition: namedTemplateItemDefinition,
			initialValues,
			onWillAskQuestion: namesUtil.onWillAskQuestionHandler.bind(namesUtil)
		})

		const names = await form.present({
			showOverview,
			fields: [
				'nameReadable',
				'namePascal',
				'nameCamel',
				'nameConst',
				'description'
			]
		})

		const resolvedErrorFileDestination = diskUtil.resolvePath(
			this.cwd,
			errorDestinationDir,
			'SpruceError.ts'
		)

		const resolvedErrorBuilderDestination = diskUtil.resolvePath(
			this.cwd,
			errorDestinationDir,
			`${names.nameCamel}.builder.ts`
		)

		if (diskUtil.doesFileExist(resolvedErrorBuilderDestination)) {
			throw new SpruceError({
				code: ErrorCode.Generic,
				friendlyMessage: 'This error already exists!'
			})
		}

		await this.featureManager.install({
			features: [
				{
					code: FeatureCode.Error
				}
			]
		})

		const createdFiles: IGeneratedFile[] = []
		// const updatedFiles: ICreatedFile[] = []

		const {
			generatedFiles: builderGeneratedFiles
		} = await this.errorGenerator.generateBuilder(
			resolvedErrorBuilderDestination,
			names
		)

		const errorDefinition = await this.SchemaService().importDefinition(
			builderGeneratedFiles.errorBuilder.path
		)

		const {
			generatedFiles: classGeneratedFiles,
			updatedFiles: classUpdatedFiles
		} = await this.errorGenerator.generateOrAppendErrorsToClass(
			resolvedErrorFileDestination,
			[{ ...names, definition: errorDefinition }]
		)

		if (classGeneratedFiles.errorClass) {
			createdFiles.push(classGeneratedFiles.errorClass)
		}

		if (classUpdatedFiles.errorClass) {
			createdFiles.push(classUpdatedFiles.errorClass)
		}

		createdFiles.push(...Object.values(builderGeneratedFiles))

		// //Generate error option types based on new file
		// const {
		// 	namePascal,
		// 	definition,
		// 	nameCamel,
		// 	generatedFiles,
		// 	updatedFiles
		// } = await this.schemaGenerator.generateTypesFromDefinitionFile({
		// 	sourceFile: resolvedErrorBuilderDestination,
		// 	destinationDir: diskUtil.resolvePath(this.cwd, typesDestinationDir),
		// 	template: 'errorTypes',
		// 	schemaLookupDir
		// })

		// createdFiles.push({ name: 'Error types', path: generatedFiles.schemaTypes })

		// // Rebuild the errors codes
		// const {
		// 	generatedFiles: typesGenerated
		// } = await this.generators.error.rebuildErrorCodeType({
		// 	lookupDir: diskUtil.resolvePath(this.cwd, errorDestinationDir),
		// 	destinationFile: diskUtil.resolvePath(
		// 		this.cwd,
		// 		typesDestinationDir,
		// 		'codes.types.ts'
		// 	)
		// })

		// createdFiles.push({
		// 	name: 'Error codes (updated)',
		// 	path: typesGenerated.codesTypes
		// })

		// // Rebuild options union
		// const {
		// 	generatedFiles: optionsGenerated
		// } = await this.generators.error.rebuildOptionsTypesFile({
		// 	lookupDir: diskUtil.resolvePath(this.cwd, errorDestinationDir),
		// 	destinationFile: diskUtil.resolvePath(
		// 		this.cwd,
		// 		typesDestinationDir,
		// 		'options.types.ts'
		// 	)
		// })

		// createdFiles.push({ name: 'Options', path: optionsGenerated.optionsTypes })

		// this.term.clear()
		// this.term.createdFileSummary({ createdFiles })

		// // Give an example
		// this.term.headline(`${names.namePascal} examples:`)
		// this.term.writeLn('')
		// this.term.codeSample(
		// 	this.templates.errorExample({
		// 		namePascal,
		// 		nameCamel,
		// 		definition
		// 	})
		// )

		// this.term.startLoading(
		// 	'Prettying generated files (you can use them now)...'
		// )

		// await this.services.lint.fix(resolvedErrorBuilderDestination)

		// this.term.stopLoading()
	}

	public sync = async (cmd: Command) => {
		// const lookupDir = cmd.lookupDir as string
		const typesDestinationDir = cmd.typesDestinationDir as string
		// const errorDestinationDir = cmd.errorDestinationDir as string
		// const schemaLookupDir = cmd.schemaLookupDir as string
		const clean = !!cmd.clean
		const force = !!cmd.force

		// const search = path.join(
		// 	diskUtil.resolvePath(this.cwd, lookupDir),
		// 	'**',
		// 	'*.builder.ts'
		// )

		// const resolvedMatches = await globby(search)
		// const allErrors: {
		// 	namePascal: string
		// 	description: string
		// 	nameReadable: string
		// }[] = []

		// Make sure error module is installed
		// await this.featureManager.install({
		// 	features: [{ feature: FeatureCode.Error }]
		// })

		if (clean) {
			const shouldClean =
				force ||
				(await this.term.confirm(
					`Are you sure you want to delete the contents of ${typesDestinationDir}?`
				))
			shouldClean && fs.removeSync(typesDestinationDir)
		}

		// TODO types.generation

		// Write error class if it does not exist
		// const errorFileDestination = diskUtil.resolvePath(
		// 	this.cwd,
		// 	errorDestinationDir,
		// 	'SpruceError.ts'
		// )

		// if (!this.doesFileExist(errorFileDestination)) {
		// 	const errorContents = this.templates.error({ errors: allErrors })
		// 	await this.writeFile(errorFileDestination, errorContents)
		// }

		// // Rebuild the errors codes
		// await this.generators.error.rebuildErrorCodeType({
		// 	lookupDir: diskUtil.resolvePath(this.cwd, lookupDir),
		// 	destinationFile: diskUtil.resolvePath(
		// 		this.cwd,
		// 		typesDestinationDir,
		// 		'codes.types.ts'
		// 	)
		// })

		// // Rebuild error options
		// await this.generators.error.rebuildOptionsTypesFile({
		// 	lookupDir: diskUtil.resolvePath(this.cwd, lookupDir),
		// 	destinationFile: diskUtil.resolvePath(
		// 		this.cwd,
		// 		typesDestinationDir,
		// 		'options.types.ts'
		// 	)
		// })
		// this.term.startLoading(
		// 	'Prettying generated files... you can start using the now.'
		// )

		// await this.services.lint.fix(
		// 	diskUtil.resolvePath(this.cwd, typesDestinationDir, '**/*.ts')
		// )
	}
}
