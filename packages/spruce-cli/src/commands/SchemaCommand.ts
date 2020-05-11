import { Command } from 'commander'
import path from 'path'
import AbstractCommand from './AbstractCommand'
import { templates } from '@sprucelabs/spruce-templates'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'
import { Feature } from '#spruce/autoloaders/features'
import chalk from 'chalk'

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
		const clean = !!cmd.clean
		const force = !!cmd.force

		await this.services.feature.install({
			features: [
				{
					feature: Feature.Schema
				}
			]
		})
		this.utilities.tsConfig.setupForSchemas()
		this.utilities.terminal.startLoading('Fetching schemas and field types')

		// Load schemas
		const {
			items: schemaTemplateItems,
			errors: schemaTemplateErrors
		} = await this.stores.schema.schemaTemplateItems()

		if (schemaTemplateItems.length === 0) {
			this.utilities.terminal.crit(
				`For some reason I couldn't load any schema definitions, not ever the core ones. Try https://github.com/sprucelabsai/spruce-cli-workspace/issues for some insights`
			)
			return
		}

		// Load fields
		const {
			items: fieldTemplateItems,
			errors: fieldTemplateErrors
		} = await this.stores.schema.fieldTemplateItems()

		this.utilities.terminal.stopLoading()

		if (schemaTemplateItems.length === 0) {
			this.utilities.terminal.crit(
				`For some reason I couldn't load any schema fields (like text or number), not ever the core ones. Try https://github.com/sprucelabsai/spruce-cli-workspace/issues for some insights`
			)
			return
		}

		if (schemaTemplateErrors.length > 0 && !force) {
			this.utilities.terminal.warn(
				`I had trouble loading all your schema definitions, but I think I can continue.`
			)
			let confirm = await this.utilities.terminal.confirm(
				'Do you to review the errors with me real quick? (Y to review, N to move on)'
			)

			if (confirm) {
				do {
					this.utilities.terminal.handleError(schemaTemplateErrors[0])
					schemaTemplateErrors.pop()
					await this.utilities.terminal.confirm(
						schemaTemplateErrors.length === 0 ? 'Done' : 'Next'
					)
				} while (schemaTemplateErrors.length > 0)

				confirm = await this.utilities.terminal.confirm(
					`Ok, ready for me to try to generate the types for the ${schemaTemplateItems.length} definitions I was able to load?`
				)

				if (!confirm) {
					return
				}
			}
		}

		if (fieldTemplateErrors.length > 0 && !force) {
			this.utilities.terminal.warn(
				`It looks like you are introducing some fields to the system, but I can't seem to load ${fieldTemplateErrors.length} of them. This may make it impossible to import local definitions (but I might still be able to write core files).`
			)
			let confirm = await this.utilities.terminal.confirm(
				'Do you want to review the errors with me real quick? (Y to review, N to move on)'
			)

			if (confirm) {
				do {
					this.utilities.terminal.handleError(fieldTemplateErrors[0])
					fieldTemplateErrors.pop()
					await this.utilities.terminal.confirm(
						fieldTemplateErrors.length === 0 ? 'Done' : 'Next'
					)
				} while (fieldTemplateErrors.length > 0)

				confirm = await this.utilities.terminal.confirm(
					`Ok, you quit to fix the errors above or hit Enter to have me give it my maximum effort!`
				)

				if (!confirm) {
					return
				}
			}
		}

		// TODO: clean
		// if (clean) {
		// 	clean =
		// 		force ||
		// 		(await this.confirm(
		// 			`Are you sure you want me delete the contents of ${destinationDir}?`
		// 		))
		// 	console.log('TODO Bring back clear')
		// }

		this.utilities.terminal.startLoading(
			`Found ${schemaTemplateItems.length} schema definitions and ${fieldTemplateItems.length} field types, writing files in 2 stages.`
		)

		const results = await this.generators.schema.generateSchemaTypes(
			this.resolvePath(destinationDir),
			{
				fieldTemplateItems,
				schemaTemplateItems,
				clean
			}
		)

		const { resultsByStage } = results
		const errors: SpruceError[] = []

		resultsByStage.forEach(results => {
			errors.push(...results.errors)
		})

		this.utilities.terminal.stopLoading()
		if (errors.length > 0) {
			this.utilities.terminal.writeLn(
				`Done generating files but hit some errors. 👇`
			)
		} else {
			this.utilities.terminal.writeLn(
				`Done generating files. You can begin using them while they are being prettied.`
			)
		}

		// If the first stage error'ed, we're in trouble
		if (resultsByStage[0].errors.length > 0) {
			this.utilities.terminal.crit(
				`Warning! Core stage failure. Run \`y global update spruce\` and then try again. If the problem persists, visit https://github.com/sprucelabsai/spruce-cli-workspace/issues`
			)
			errors.map(err => this.utilities.terminal.handleError(err))
			return
		} else if (errors.length > 0) {
			this.utilities.terminal.error(
				`I hit ${errors.length} errors while generating type files.`
			)
		}

		if (errors.length > 0) {
			errors.forEach(err => {
				const { options } = err
				if (options.code === ErrorCode.ValueTypeServiceStageError) {
					this.utilities.terminal.error(
						`Error mapping stage on stage "${options.stage}"`
					)
				} else if (options.code === ErrorCode.ValueTypeServiceError) {
					this.utilities.terminal.error(`Error on schemaId ${options.schemaId}`)
				}
				this.utilities.terminal.handleError(err)
			})
		}

		this.utilities.terminal.startLoading('Prettying generated files...')
		const destinationDirPattern = path.join(destinationDir, '**', '*')
		await this.services.lint.fix(destinationDirPattern)

		this.utilities.terminal.stopLoading()

		this.utilities.terminal.clear()
		this.utilities.terminal.info(
			`All done 👊.${
				errors.length > 0
					? ` But, I encountered ${errors.length} errors (see above). Lastly,`
					: ''
			} I created ${Object.keys(results.generatedFiles).length} files.`
		)
		this.utilities.terminal.bar()
		this.utilities.terminal.info(
			`1. ${chalk.bold('Schema definitions')}: ${
				results.generatedFiles.schemaTypes
			}`
		)
		this.utilities.terminal.info(
			`2. ${chalk.bold('Field definitions')}: ${
				results.generatedFiles.fieldsTypes
			}`
		)
		this.utilities.terminal.info(
			`3. ${chalk.bold('Field type enum')}: ${results.generatedFiles.fieldType}`
		)
		this.utilities.terminal.info(
			`4. ${chalk.bold('Field class map')}: ${
				results.generatedFiles.fieldClassMap
			}`
		)
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
			definition: SpruceSchemas.Local.NamedTemplateItem.definition,
			initialValues: {
				readableName,
				camelName,
				pascalName
			},
			// TODO
			// @ts-ignore
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
		this.utilities.terminal.startLoading('Installing dependencies')
		await this.services.feature.install({
			features: [
				{
					feature: Feature.Schema
				}
			]
		})
		this.utilities.terminal.stopLoading()

		// Build paths
		const definitionDestination = this.resolvePath(
			cmd.definitionDestinationDir as string,
			`${values.camelName}.definition.ts`
		)
		const typesDestination = this.resolvePath(cmd.typesDestinationDir as string)
		const definition = templates.definition(values)

		await this.writeFile(definitionDestination, definition)

		this.utilities.terminal.info(
			`Definition created at ${definitionDestination}`
		)

		// TODO don't call one command from another
		try {
			cmd.destinationDir = typesDestination
			await this.sync(cmd)
		} catch (err) {
			this.utilities.terminal.stopLoading()
			this.utilities.terminal.warn(
				'I was not able to sync it with #spruce/schemas/schemas.types'
			)
			this.utilities.terminal.warn(
				"You won't be able to use your new definition until the below error is fixed and you run `spruce schema:sync`"
			)
			this.utilities.terminal.handleError(err)
		}
	}
}
