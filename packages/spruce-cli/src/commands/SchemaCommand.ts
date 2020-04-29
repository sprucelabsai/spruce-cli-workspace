import { Command } from 'commander'
import AbstractCommand from './AbstractCommand'
import { templates } from '@sprucelabs/spruce-templates'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '../../.spruce/errors/codes.types'

export default class SchemaCommand extends AbstractCommand {
	/** Sets up commands */
	public attachCommands(program: Command) {
		/** Sync everything */
		program
			.command('schema:sync')
			.description(
				'Sync all schema definitions and fields (also pulls from the cloud)'
			)
			.option(
				'-d, --destinationDir <dir>',
				'Where should I write the types files?',
				'./.spruce/schemas'
			)
			.option(
				'-c, --clean',
				'Where should I clean out the destination dir?',
				false
			)
			.option(
				'-f, --force',
				'If cleaning, should I suppress confirmations and warnings',
				false
			)
			.action(this.sync.bind(this))

		/** Create a new schema definition */
		program
			.command('schema:create [named]')
			.description('Define a new thing!')
			.option(
				'-dd, --definitionDestinationDir <definitionDir>',
				'Where should I write the definition file?',
				'./src/schemas'
			)
			.option(
				'-td --typesDestinationDir <typesDir>',
				'Where should I write the types file that supports the definition?',
				'./.spruce/schemas'
			)
			.action(this.create.bind(this))
	}

	/** Sync all schemas and fields (also pulls from the cloud) */
	public async sync(cmd: Command) {
		const destinationDir = cmd.destinationDir as string
		// Const clean = !!cmd.clean
		const force = !!cmd.force

		// Make sure schema module is installed
		this.startLoading('Installing dependencies')
		await this.utilities.pkg.setupForSchemas()
		this.utilities.tsConfig.setupForSchemas()
		this.startLoading('Fetching schemas and field types')

		// Load schemas
		const {
			items: schemaTemplateItems,
			errors: schemaTemplateErrors
		} = await this.stores.schema.schemaTemplateItems()

		if (schemaTemplateItems.length === 0) {
			this.crit(
				`For some reason I couldn't load any schema definitions, not ever the core ones. Try https://github.com/sprucelabsai/spruce-cli-workspace/issues for some insights`
			)
			return
		}

		// Load fields
		const {
			items: fieldTemplateItems,
			errors: fieldTemplateErrors
		} = await this.stores.schema.fieldTemplateItems()

		this.stopLoading()

		if (schemaTemplateItems.length === 0) {
			this.crit(
				`For some reason I couldn't load any schema fields (like text or number), not ever the core ones. Try https://github.com/sprucelabsai/spruce-cli-workspace/issues for some insights`
			)
			return
		}

		if (schemaTemplateErrors.length > 0 && !force) {
			this.warn(
				`I had trouble loading all your schema definitions, but I think I can continue.`
			)
			let confirm = await this.confirm(
				'Do you to review the errors with me real quick? (Y to review, N to move on)'
			)

			if (confirm) {
				do {
					this.handleError(schemaTemplateErrors[0])
					schemaTemplateErrors.pop()
					await this.confirm(
						schemaTemplateErrors.length === 0 ? 'Done' : 'Next'
					)
				} while (schemaTemplateErrors.length > 0)

				confirm = await this.confirm(
					`Ok, ready for me to try to generate the types for the ${schemaTemplateItems.length} definitions I was able to load?`
				)

				if (!confirm) {
					return
				}
			}
		}

		if (fieldTemplateErrors.length > 0 && !force) {
			this.warn(
				`It looks like you are introducing some fields to the system, but I can't seem to load ${fieldTemplateErrors.length} of them. This may make it impossible to import local definitions (but I might still be able to write core files).`
			)
			let confirm = await this.confirm(
				'Do you want to review the errors with me real quick? (Y to review, N to move on)'
			)

			if (confirm) {
				do {
					this.handleError(fieldTemplateErrors[0])
					fieldTemplateErrors.pop()
					await this.confirm(fieldTemplateErrors.length === 0 ? 'Done' : 'Next')
				} while (fieldTemplateErrors.length > 0)

				confirm = await this.confirm(
					`Ok, you quit to fix the errors above or hit Enter to have me give it my maximum effort!`
				)

				if (!confirm) {
					return
				}
			}
		}

		this.startLoading(
			`Found ${schemaTemplateItems.length} schema definitions and ${fieldTemplateItems.length} field types, writing files in 2 stages.`
		)

		const results = await this.generators.schema.generateSchemaTypes(
			this.resolvePath(destinationDir),
			{
				fieldTemplateItems,
				schemaTemplateItems
			}
		)

		const { resultsByStage } = results
		const errors: SpruceError[] = []

		resultsByStage.forEach(results => {
			errors.push(...results.errors)
		})

		this.stopLoading()
		this.writeLn(`Done running ${resultsByStage.length} stages.`)

		// If the first stage error'ed, we're in trouble
		if (resultsByStage[0].errors.length > 0) {
			this.crit(
				`Warning! Core stage failure. Run \`y global update spruce\` and then try again. If the problem persists, visit https://github.com/sprucelabsai/spruce-cli-workspace/issues`
			)
		} else if (errors.length > 0) {
			this.error(`I hit ${errors.length} errors while generating type files.`)
		}

		if (errors.length > 0) {
			errors.forEach(err => {
				const { options } = err
				if (options.code === ErrorCode.ValueTypeServiceStageError) {
					this.error(`Error mapping stage on stage "${options.stage}"`)
				} else if (options.code === ErrorCode.ValueTypeServiceError) {
					this.error(`Error on schemaId ${options.schemaId}`)
				}
				this.handleError(err)
			})
		}

		this.startLoading('Prettying generated files...')
		await this.pretty()

		// If (clean) {
		// 	const pass =
		// 		force ||
		// 		(await this.confirm(
		// 			`Are you sure you want me delete the contents of ${destinationDir}?`
		// 		))
		// 	if (pass) {
		// 		this.deleteDir(destinationDir)
		// 	}
		// }

		this.stopLoading()

		this.clear()
		this.info(
			`All done 👊.${
				errors.length > 0
					? ` But, I encountered ${errors.length} errors (see above). Lastly,`
					: ''
			} I created ${Object.keys(results.generatedFiles).length} files.`
		)
		this.bar()
		this.info(`1. Schema definitions ${results.generatedFiles.schemaTypes}`)
		this.info(`2. Field definitions ${results.generatedFiles.fieldsTypes}`)
		this.info(`3. Field type enum ${results.generatedFiles.fieldType}`)
		this.info(`4. Field class map ${results.generatedFiles.fieldClassMap}`)
	}

	/** Define a new schema */
	public async create(name: string | undefined, cmd: Command) {
		const readableName = name

		let camelName = ''
		let pascalName = ''

		let showOverview = false

		// If they passed a name, show overview
		if (readableName) {
			showOverview = true
			camelName = this.utilities.names.toCamel(readableName)
			pascalName = this.utilities.names.toPascal(camelName)
		}

		const form = this.formBuilder({
			definition: SpruceSchemas.local.NamedTemplateItem.definition,
			initialValues: {
				readableName,
				camelName,
				pascalName
			},
			onWillAskQuestion: this.utilities.names.onWillAskQuestionHandler.bind(
				this.utilities.names
			)
		})

		// All the values
		const values = await form.present({
			showOverview,
			fields: ['readableName', 'camelName', 'pascalName', 'description']
		})

		// Make sure schema module is installed
		this.startLoading('Installing dependencies')
		await this.utilities.pkg.setupForSchemas()
		this.stopLoading()

		// Build paths
		const definitionDestination = this.resolvePath(
			cmd.definitionDestinationDir as string,
			`${values.camelName}.definition.ts`
		)
		const typesDestination = this.resolvePath(cmd.typesDestinationDir as string)
		const definition = templates.definition(values)

		await this.writeFile(definitionDestination, definition)

		this.info(`Definition created at ${definitionDestination}`)

		// TODO don't call one command from another
		try {
			cmd.destinationDir = typesDestination
			await this.sync(cmd)
		} catch (err) {
			this.stopLoading()
			this.warn('I was not able to sync it with #spruce/schemas/schemas.types')
			this.warn(
				"You won't be able to use your new definition until the below error is fixed and you run `spruce schema:sync`"
			)
			this.handleError(err)
		}
	}
}
