import { Command } from 'commander'
import BaseCommand from '../Base'
import { templates } from '@sprucelabs/spruce-templates'
import { FieldType } from '@sprucelabs/schema'
import { camelCase } from 'lodash'

function capitalize(s: string) {
	return s.charAt(0).toUpperCase() + s.slice(1)
}

export default class TypesCommand extends BaseCommand {
	/** Sets up commands */
	public attachCommands(program: Command) {
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
				'./src/.spruce'
			)
			.action(this.sync.bind(this))

		program
			.command('definition:create [named]')
			.description('Define a new thing!')
			.option(
				'-d, --destinationDir <dir>',
				'Where should I write the types files?',
				'./src/definitions'
			)
			.action(this.createDefinition.bind(this))
	}

	/** Create a new skill */
	public async sync(cmd: Command) {
		const destinationDir = cmd.destinationDir as string

		this.startLoading('Fetching schemas and field types')

		// load types and namespaces
		const schemaTemplateItems = await this.stores.schema.schemaTemplateItemsWithNamespace()
		const typeMap = await this.stores.schema.fieldTypeMap()

		// fill out template
		const contents = templates.schemaDefinitions({
			schemaTemplateItems,
			typeMap
		})

		this.stopLoading()

		this.info(
			`Found ${schemaTemplateItems.length} schemas, writing definition file...`
		)

		//write it out
		const destination = this.resolvePath(destinationDir, 'schemas.ts')
		this.writeFile(destination, contents)

		this.info(`All done 👊: ${destination}`)
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
		const destination = this.resolvePath(
			cmd.destinationDir as string,
			`${values.camelName}.definition.ts`
		)

		const contents = templates.createDefinition(values)

		this.writeFile(destination, contents)
		this.writeLn(`Definition created at ${destination}`)
	}
}
