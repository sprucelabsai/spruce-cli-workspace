import { Command } from 'commander'
import BaseCommand from '../Base'
import { templates } from '@sprucelabs/spruce-templates'

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
}
