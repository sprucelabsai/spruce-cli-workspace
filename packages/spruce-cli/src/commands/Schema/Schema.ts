import { Command } from 'commander'
import AbstractCommand from '../Abstract'
import { templates } from '@sprucelabs/spruce-templates'
import globby from 'globby'
import path from 'path'
import namedTemplateItemDefinition from '../../schemas/namedTemplateItem.definition'

export default class SchemaCommand extends AbstractCommand {
	/** Sets up commands */
	public attachCommands(program: Command) {
		/** sync everything */
		program
			.command('schema:pull')
			.description(
				'Generates types file holding all interfaces, types, and enums needed to dev fast'
			)
			.option(
				'-t, --types <types>',
				'What should I sync? all|schemas|events',
				'all'
			)
			.option(
				'-d, --destinationDir <dir>',
				'Where should I write the types files?',
				'./src/.spruce/schemas'
			)
			.action(this.pull.bind(this))

		/** create a new schema definition */
		program
			.command('schema:create [named]')
			.description('Define a new thing!')
			.option(
				'-dd, --definitionDestinationDir <dir>',
				'Where should I write the definition file?',
				'./src/schemas'
			)
			.option(
				'-td --typesDestinationDir <typesDir>',
				'Where should I write the types file that supports the definition?',
				'./src/.spruce/schemas'
			)
			.action(this.create.bind(this))

		/** generate schema definition types files */
		program
			.command('schema:sync')
			.description('Generates type files on all definition files.')
			.option(
				'-l, --lookupDir <dir>',
				'Where should I look for definitions files (*.definition.ts)?',
				'./src'
			)
			.option(
				'-d, --destinationDir <dir>',
				'Where should I write the definitions file?',
				'./src/.spruce/schemas'
			)
			.action(this.sync.bind(this))
	}

	/** Pull schemas from server */
	public async pull(cmd: Command) {
		const destinationDir = cmd.destinationDir as string

		this.startLoading('Fetching schemas and field types')

		// load types and namespaces
		const schemaTemplateItems = await this.stores.schema.schemaTemplateItemsWithNamespace()
		const typeMap = await this.stores.schema.fieldTypeMap()

		// fill out template
		const contents = templates.schemaTypes({
			schemaTemplateItems,
			typeMap
		})

		this.stopLoading()

		this.info(
			`Found ${schemaTemplateItems.length} schemas, writing definition file...`
		)

		//write it out
		const destination = this.resolvePath(destinationDir, 'core.types.ts')
		this.writeFile(destination, contents)

		this.info(`All done 👊: ${destination}`)
	}

	/** generate types and other files based definitions */
	public async sync(cmd: Command) {
		const lookupDir = cmd.lookupDir as string
		const destinationDir = cmd.destinationDir as string
		const search = path.join(lookupDir, '**', '*.definition.ts')

		const matches = await globby(search)

		matches.forEach(filePath => {
			// does this file contain buildSchemaDefinition?
			const currentContents = this.readFile(filePath)
			if (currentContents.search(/buildSchemaDefinition\({/) === -1) {
				this.log.debug(`Skipping ${filePath}`)
				return
			}

			// write to the destination
			const {
				pascalName,
				camelName
			} = this.generators.schema.generateTypesFromDefinition(
				filePath,
				this.resolvePath(destinationDir)
			)

			// tell them how to use it
			this.headline(`Imported ${pascalName} Examples:`)

			this.codeSample(
				`// Importing your definition
				import ${camelName}Definition from '../.spruce/schemas/${camelName}.types.ts'
				
				// Importing interfaces
				import { I${pascalName}, I${pascalName}Instance } from '#spruce/schemas/${camelName}.types'
				
				// Create an instance of a schema based on a definition
				const ${camelName} = new Schema(${camelName}Definition, values)
				
				${camelName}.set('fieldName', newValue);
				const value = ${camelName}.get('fieldName');

				// ensure validity
				${camelName}.validate() // throws SchemaFieldValidationError
				`
			)

			this.bar()
		})
	}

	public async create(name: string | undefined, cmd: Command) {
		const readableName = name

		let camelName = ''
		let pascalName = ''

		let showOverview = false

		// if they passed a name, show overview
		if (readableName) {
			showOverview = true
			camelName = this.utilities.names.toCamel(readableName)
			pascalName = this.utilities.names.toPascal(camelName)
		}

		const form = this.formBuilder(
			namedTemplateItemDefinition,
			{
				readableName,
				camelName,
				pascalName
			},
			{
				onWillAskQuestion: this.utilities.names.onWillAskQuestionHandler.bind(
					this.utilities.names
				)
			}
		)

		// all the values
		const values = await form.present({
			showOverview,
			fields: ['readableName', 'camelName', 'pascalName', 'description']
		})

		// build paths
		const definitionDestination = this.resolvePath(
			cmd.definitionDestinationDir as string,
			`${values.camelName}.definition.ts`
		)
		const typesDestination = this.resolvePath(
			cmd.typesDestinationDir as string,
			`${values.camelName}.types.ts`
		)

		const definition = templates.definition(values)

		this.writeFile(definitionDestination, definition)

		// generate types
		this.generators.schema.generateTypesFromDefinition(
			definitionDestination,
			typesDestination
		)

		this.writeLn(`Definition created at ${definitionDestination}`)
		this.writeLn(`Definition types created at ${typesDestination}`)
	}
}
