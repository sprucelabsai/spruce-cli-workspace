import { Command } from 'commander'
import AbstractCommand from './AbstractCommand'
import { templates } from '@sprucelabs/spruce-templates'
import { SpruceSchemas } from '../../.spruce/schemas/schemas.types'

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

		// Make sure schema module is installed
		this.startLoading('Installing dependencies')
		await this.utilities.pkg.setupForSchemas()
		this.utilities.tsConfig.setupForSchemas()
		this.startLoading('Fetching schemas and field types')

		// Load types and namespaces
		const schemaTemplateItems = await this.stores.schema.schemaTemplateItems()
		const fieldTemplateItems = await this.stores.schema.fieldTemplateItems()

		// Field Types
		const fieldTypesContent = templates.fieldsTypes({
			fieldTemplateItems
		})

		// Field type enum
		const fieldTypeContent = templates.fieldType({
			fieldTemplateItems
		})

		// Build the FieldClassMap to pass to schemasTypes
		const valueTypes = await this.services.valueType.allValueTypes({
			schemaTemplateItems,
			fieldTemplateItems
		})

		// Schema types
		const schemaTypesContents = templates.schemasTypes({
			schemaTemplateItems,
			fieldTemplateItems,
			valueTypeGenerator: (renderAs, definition) => {
				const key = this.services.valueType.generateKey(renderAs, definition)
				const valueType = valueTypes[key]
				if (!valueType) {
					throw new Error(`failed to find ${renderAs} for ${key}`)
				}
				return valueType
			}
		})

		this.stopLoading()

		this.info(
			`Found ${schemaTemplateItems.length} schema definitions and ${fieldTemplateItems.length} field types, writing files`
		)

		if (clean) {
			const pass =
				force ||
				(await this.confirm(
					`Are you sure you want me delete the contents of ${destinationDir}?`
				))
			if (pass) {
				this.deleteDir(destinationDir)
			}
		}

		// Write out field types
		const fieldTypesDestination = this.resolvePath(
			destinationDir,
			'fields',
			'fields.types.ts'
		)

		await this.writeFile(fieldTypesDestination, fieldTypesContent)

		// Write out field type enum
		const fieldTypeDestination = this.resolvePath(
			destinationDir,
			'fields',
			'fieldType.ts'
		)

		await this.writeFile(fieldTypeDestination, fieldTypeContent)

		//Write out schema types
		const schemaTypesDestination = this.resolvePath(
			destinationDir,
			'schemas.types.ts'
		)
		await this.writeFile(schemaTypesDestination, schemaTypesContents)

		await this.pretty()

		this.clear()
		this.info(`All done 👊. I created 3 files.`)
		this.bar()
		this.info(`1. Schema definitions ${schemaTypesDestination}`)
		this.info(`2. Field definitions ${fieldTypesDestination}`)
		this.info(`3. Field type enum ${fieldTypeDestination}`)
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
