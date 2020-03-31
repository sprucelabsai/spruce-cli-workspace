import { Command } from 'commander'
import AbstractCommand from '../Abstract'
import { templates } from '@sprucelabs/spruce-templates'
import { FieldType } from '@sprucelabs/schema'
import { camelCase } from 'lodash'
import globby from 'globby'
import path from 'path'

function capitalize(s: string) {
	return s.charAt(0).toUpperCase() + s.slice(1)
}

export default class TypesCommand extends AbstractCommand {
	/** Sets up commands */
	public attachCommands(program: Command) {
		/** sync everything */
		program
			.command('types:sync')
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
				'./src/.spruce/types'
			)
			.action(this.sync.bind(this))

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
				'./src/.spruce/types'
			)
			.action(this.createDefinition.bind(this))

		/** generate schema definition types files */
		program
			.command('schema:generateTypes')
			.description('Generates type files on all definition files.')
			.option(
				'-l, --lookupDir <dir>',
				'Where should I look for definitions files (*.definition.ts)?',
				'./src'
			)
			.option(
				'-d, --destinationDir <dir>',
				'Where should I write the definitions file?',
				'./src/.spruce/types'
			)
			.action(this.regenerateDefinitionTypes.bind(this))
	}

	/** Create a new skill */
	public async sync(cmd: Command) {
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

	public async regenerateDefinitionTypes(cmd: Command) {
		const lookupDir = cmd.lookupDir as string
		const destinationDir = cmd.destinationDir as string
		const search = path.join(lookupDir, '**', '*.definition.ts')

		const matches = await globby(search)

		matches.forEach(filePath => {
			// names
			const pathStr = path.dirname(filePath)
			const filename = filePath.substr(pathStr.length + 1)
			const nameParts = filename.split('.')
			const camelName = nameParts[0]
			const pascalName = capitalize(camelName)

			// files
			const newFileName = `${camelName}.types.ts`
			const destination = path.join(destinationDir, newFileName)

			// relative paths
			const relativeToDefinition = path.relative(
				path.dirname(destination),
				filePath
			)

			// contents
			const contents = templates.createDefinitionTypes({
				camelName,
				pascalName,
				relativeToDefinition: relativeToDefinition.replace(
					path.extname(relativeToDefinition),
					''
				)
			})

			// does a file exist already, erase it
			this.deleteFile(destination)

			// write
			this.writeFile(destination, contents)

			// tell them how to use it
			this.headline(`Imported ${pascalName}. Examples:`)

			this.writeLn(
				`Importing your definition:  import ${camelName}Definition from '${relativeToDefinition}'`
			)

			this.writeLn(
				`Importing interfaces: import { I${pascalName}, I${pascalName}Instance } from '#spruce/schemas/${camelName}.types'`
			)

			this.writeLn(
				`Creating schema: const ${camelName} = new Schema(${camelName}Definition, values)`
			)

			this.writeLn(`${camelName}.set('fieldName', newValue);`)
			this.writeLn(`const value ${camelName}.get('fieldName');`)
			this.writeLn(`${camelName}.validate()`)

			this.bar()
		})
	}

	public async createDefinition(name: string | undefined, cmd: Command) {
		const readableName = name
		let camelName = ''
		let pascalName = ''

		let showOverview = false

		// if they passed a name, show overview
		if (readableName) {
			showOverview = true
			camelName = camelCase(readableName)
			pascalName = capitalize(camelName)
		}

		const form = this.formBuilder(
			{
				id: 'definition-file',
				name: 'Definition creator',
				fields: {
					readableName: {
						type: FieldType.Text,
						isRequired: true,
						label: readableName
							? 'Name'
							: 'What is the name of the thing you wish to define? e.g. Horse, Battle of the Year Event'
					},
					camelName: {
						type: FieldType.Text,
						isRequired: true,
						label: readableName
							? 'camelCaseName'
							: 'camelCaseName. e.g. horse, battleOfTheYearEvent'
					},
					pascalName: {
						type: FieldType.Text,
						isRequired: true,
						label: readableName
							? 'PascalCaseName'
							: 'PascalCaseName. e.g. Horse, BattleOfTheYearEvent'
					},
					description: {
						type: FieldType.Text,
						isRequired: true,
						label: readableName
							? 'Description'
							: 'Describe this thing. e.g. Another mammal that wears shoes, An international breakdance competition.'
					}
				}
			},
			{
				readableName,
				camelName,
				pascalName
			},
			{
				onWillAskQuestion: (name, fieldDefinition, values) => {
					switch (name) {
						case 'camelName':
							if (!values.camelName) {
								fieldDefinition.defaultValue = camelCase(values.readableName)
							}
							break
						case 'pascalName':
							if (!values.pascalName) {
								fieldDefinition.defaultValue = capitalize(
									camelCase(values.readableName)
								)
							}
							break
					}
					return fieldDefinition
				}
			}
		)

		const values = await form.present({ showOverview })
		const definitionDestination = this.resolvePath(
			cmd.definitionDestinationDir as string,
			`${values.camelName}.definition.ts`
		)
		const typesDestination = this.resolvePath(
			cmd.typesDestinationDir as string,
			`${values.camelName}.types.ts`
		)

		// relative paths
		const relativeToDefinition = path.relative(
			path.dirname(typesDestination),
			definitionDestination
		)

		const definition = templates.createDefinition(values)
		const types = templates.createDefinitionTypes({
			...values,
			relativeToDefinition: relativeToDefinition.replace(
				path.extname(relativeToDefinition),
				''
			)
		})

		this.writeFile(definitionDestination, definition)
		this.writeFile(typesDestination, types)

		this.writeLn(`Definition created at ${definitionDestination}`)
		this.writeLn(`Definition types created at ${typesDestination}`)
	}
}
