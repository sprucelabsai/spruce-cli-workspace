import { Command } from 'commander'
import ErrorCode from '#spruce/errors/errorCode'
import namedTemplateItemDefinition from '#spruce/schemas/local/namedTemplateItem.definition'
import SpruceError from '../errors/SpruceError'
import FeatureManager, { FeatureCode } from '../features/FeatureManager'
import SchemaGenerator from '../generators/SchemaGenerator'
import SchemaStore from '../stores/SchemaStore'
import diskUtil from '../utilities/disk.utility'
import namesUtil from '../utilities/names.utility'
import AbstractCommand, { ICommandOptions } from './AbstractCommand'

interface ISchemaCommandOptions extends ICommandOptions {
	featureManager: FeatureManager
	stores: {
		schema: SchemaStore
	}
	generators: {
		schema: SchemaGenerator
	}
}

export default class SchemaCommand extends AbstractCommand {
	private schemaStore: SchemaStore
	private featureManager: FeatureManager
	private schemaGenerator: SchemaGenerator

	public constructor(options: ISchemaCommandOptions) {
		super(options)
		this.schemaStore = options.stores.schema
		this.featureManager = options.featureManager
		this.schemaGenerator = options.generators.schema
	}

	/** Sets up commands */
	public attachCommands(program: Command) {
		/** Create a new schema definition */
		program
			.command('schema.create [name]')
			.description('Define a new thing!')
			.option(
				'-dd, --destinationDir <destinationDir>',
				'Where should I write the builder file?',
				'./src/schemas'
			)
			.option(
				'-a, --addonLookupDir <lookupDir>',
				'Where should I look for addon files?',
				'./src/addons'
			)
			.option(
				'-td --typesDestinationDir <typesDir>',
				'Where should I write the types file that supports the definition?',
				'./.spruce/schemas'
			)
			.action(this.create)

		/** Sync everything */
		program
			.command('schema.sync [lookupDir]')
			.description(
				'Sync all schema definitions and fields (also pulls from the cloud)'
			)
			.option(
				'-l, --lookupDir <lookupDir>',
				'Where should I look for schema builder files?',
				'./src/schemas'
			)
			.option(
				'-a, --addonLookupDir <lookupDir>',
				'Where should I look for addon files?',
				'./src/addons'
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
			.action(this.sync)
	}

	/** Define a new schema */
	public async create(
		name: string | undefined,
		options: {
			destinationDir: string
			addonLookupDir: string
			typesDestinationDir: string
		}
	) {
		const nameReadable = name

		let nameCamel = ''
		let namePascal = ''

		let showOverview = false

		if (nameReadable) {
			showOverview = true
			nameCamel = namesUtil.toCamel(nameReadable)
			namePascal = namesUtil.toPascal(nameCamel)
		}

		const form = this.getFormComponent({
			definition: namedTemplateItemDefinition,
			initialValues: {
				nameReadable,
				nameCamel,
				namePascal
			},
			onWillAskQuestion: namesUtil.onWillAskQuestionHandler.bind(namesUtil)
		})

		// All the values
		const values = await form.present({
			showOverview,
			fields: ['nameReadable', 'nameCamel', 'namePascal', 'description']
		})

		// Make sure schema module is installed
		this.term.startLoading('Installing dependencies')
		await this.featureManager.install({
			features: [
				{
					code: FeatureCode.Schema
				}
			]
		})
		this.term.stopLoading()

		// Build paths
		const resolvedTypesDestination = diskUtil.resolvePath(
			options.typesDestinationDir
		)

		const builderResults = await this.schemaGenerator.generateBuilder(
			options.destinationDir,
			values
		)

		this.term.info(`Definition created at ${builderResults[0].path}`)

		try {
			await this.sync(options.destinationDir, {
				destinationDir: resolvedTypesDestination,
				addonLookupDir: options.addonLookupDir
			})
		} catch (err) {
			this.term.stopLoading()
			this.term.warn(
				'I was not able to sync it with #spruce/schemas/schemas.types'
			)
			this.term.warn(
				"You won't be able to use your new definition until the below error is fixed and you run `spruce schema:sync`"
			)
			this.term.handleError(err)
		}
	}

	/** Sync all schemas and fields (also pulls from the cloud) */
	public async sync(
		lookupDirOption: string | undefined,
		options: {
			destinationDir: string
			lookupDir?: string
			addonLookupDir: string
			clean?: boolean
			force?: boolean
		}
	) {
		const destinationDir = options.destinationDir
		const lookupDir = lookupDirOption || options.lookupDir
		const addonLookupDir = options.addonLookupDir
		const clean = !!options.clean
		const force = !!options.force

		if (!lookupDir) {
			// TODO update this to spruce error
			debugger
			throw new Error('aoeuaoeuaoeu')
		}

		await this.featureManager.install({
			features: [
				{
					code: FeatureCode.Schema
				}
			]
		})

		this.term.startLoading('Fetching schemas and field types')

		// Load schemas
		const {
			items: schemaTemplateItems,
			errors: schemaTemplateErrors
		} = await this.schemaStore.fetchSchemaTemplateItems(
			diskUtil.resolvePath(lookupDir)
		)

		if (schemaTemplateItems.length === 0) {
			this.term.crit(
				`For some reason I couldn't load any schema definitions, not ever the core ones. Try https://github.com/sprucelabsai/spruce-cli-workspace/issues for some insights`
			)
			return
		}

		// Load fields
		const {
			items: fieldTemplateItems,
			errors: fieldTemplateErrors
		} = await this.schemaStore.fetchFieldTemplateItems(
			diskUtil.resolvePath(addonLookupDir)
		)

		this.term.stopLoading()

		if (schemaTemplateItems.length === 0) {
			this.term.crit(
				`For some reason I couldn't load any schema fields (like text or number), not ever the core ones. Try https://github.com/sprucelabsai/spruce-cli-workspace/issues for some insights`
			)
			return
		}

		if (schemaTemplateErrors.length > 0 && !force) {
			this.term.warn(
				`I had trouble loading all your schema definitions, but I think I can continue.`
			)
			let confirm = await this.term.confirm(
				'Do you to review the errors with me real quick? (Y to review, N to move on)'
			)

			if (confirm) {
				confirm = await this.takeUserThroughErrors(
					schemaTemplateErrors,
					schemaTemplateItems.length
				)

				if (!confirm) {
					return
				}
			}
		}

		if (fieldTemplateErrors.length > 0 && !force) {
			this.term.warn(
				`It looks like you are introducing some fields to the system, but I can't seem to load ${fieldTemplateErrors.length} of them. This may make it impossible to import local definitions (but I might still be able to write core files).`
			)
			let confirm = await this.term.confirm(
				'Do you want to review the errors with me real quick? (Y to review, N to move on)'
			)

			if (confirm) {
				confirm = await this.takeUserThroughErrors(
					fieldTemplateErrors,
					fieldTemplateItems.length
				)

				if (!confirm) {
					return
				}
			}
		}

		if (clean) {
			this.term.info('Clean is not available yet for schemas')
			await this.term.wait()
		}
		// 	clean =
		// 		force ||
		// 		(await this.confirm(
		// 			`Are you sure you want me delete the contents of ${destinationDir}?`
		// 		))
		// 	console.log('TODO Bring back clear')
		// }

		this.term.startLoading(
			`Found ${schemaTemplateItems.length} schema definitions and ${fieldTemplateItems.length} field types, writing files in 2 stages.`
		)

		const results = await this.schemaGenerator.generateSchemaTypes(
			diskUtil.resolvePath(destinationDir),
			// @ts-ignore
			{
				fieldTemplateItems,
				schemaTemplateItems,
				clean
			}
		)

		const { resultsByStage } = results
		const errors: SpruceError[] = []

		// @ts-ignore
		resultsByStage.forEach(results => {
			errors.push(...results.errors)
		})

		this.term.stopLoading()
		if (errors.length > 0) {
			this.term.writeLn(`Done generating files but hit some errors. 👇`)
		} else {
			this.term.writeLn(
				`Done generating files. You can begin using them while they are being prettied.`
			)
		}

		// If the first stage error'ed, we're in trouble
		if (resultsByStage[0].errors.length > 0) {
			this.term.crit(
				`Warning! Core stage failure. Run \`y global update spruce\` and then try again. If the problem persists, visit https://github.com/sprucelabsai/spruce-cli-workspace/issues`
			)
			errors.map(err => this.term.handleError(err))
			return
		} else if (errors.length > 0) {
			this.term.error(
				`I hit ${errors.length} errors while generating type files.`
			)
		}

		if (errors.length > 0) {
			errors.forEach(err => {
				const { options } = err
				if (options.code === ErrorCode.ValueTypeServiceStageError) {
					this.term.error(`Error mapping stage on stage "${options.stage}"`)
				} else if (options.code === ErrorCode.ValueTypeServiceError) {
					this.term.error(`Error on schemaId ${options.schemaId}`)
				}
				this.term.handleError(err)
			})
		}

		this.term.clear()
		// this.term.createdFileSummary({
		// 	createdFiles: [
		// 		{
		// 			name: 'Schema definitions',
		// 			path: generatedFiles.schemaTypes
		// 		},
		// 		{ name: 'Field definitions', path: generatedFiles.fieldsTypes },
		// 		{
		// 			name: 'Field type enum',
		// 			path: generatedFiles.fieldType
		// 		},
		// 		{
		// 			name: 'Field class map',
		// 			path: generatedFiles.fieldClassMap
		// 		},
		// 		...generatedFiles.normalizedDefinitions.map(n => ({
		// 			name: `${n.id} definition`,
		// 			path: n.path
		// 		}))
		// 	]
		// })

		this.term.startLoading(
			'Prettying generated files (you can use them now)...'
		)
		await this.LintService().fix(
			diskUtil.resolvePath(destinationDir, '**/*.ts')
		)

		this.term.stopLoading()
	}

	private async takeUserThroughErrors(
		errors: SpruceError[],
		totalItems: number
	) {
		let confirm = false
		do {
			this.term.handleError(errors[0])
			errors.pop()
			confirm = await this.term.confirm(
				errors.length === 0 ? 'Done' : 'Next error'
			)
			if (!confirm) {
				break
			}
		} while (errors.length > 0)
		confirm = await this.term.confirm(
			`Ok, ready for me to try to generate the types for the ${totalItems} definitions I was able to load?`
		)
		return confirm
	}
}
