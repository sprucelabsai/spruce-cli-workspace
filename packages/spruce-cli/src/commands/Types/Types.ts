import { Command } from 'commander'
import CommandBase from '../Base'
import { templates } from '@sprucelabs/spruce-templates'

export default class Cli extends CommandBase {
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
		const schemaTemplateItems = await this.store.schema.schemaTemplateItemsWithNamespace()
		const typeMap = await this.store.schema.fieldTypeMap()

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

	// /** Fetches the generated events file from API */
	// public async syncTypes() {
	// 	// const { text } = await request.get(
	// 	// 	`${config.getApiUrl(config.remote)}/api/2.0/types/events`
	// 	// )
	// 	// fs.writeFileSync(
	// 	// 	`${__dirname}/../../../../src/types/events-generated.ts`,
	// 	// 	text
	// 	// )
	// }

	// /** Fetchs schemas from the API and builds TS interfaces, writing to cmd.outFile if it's set */
	// public async syncSchemas(cmd: Command) {
	// 	debugger

	// 	console.log('in!')
	// 	// const result = await mercury.emit<
	// 	// 	SpruceEvents.core.GetSchemas.IPayload,
	// 	// 	SpruceEvents.core.GetSchemas.IResponseBody
	// 	// >({
	// 	// 	eventName: SpruceEvents.core.GetSchemas.name,
	// 	// 	payload: {}
	// 	// })

	// 	// this.log.debug({ outFile: cmd.outFile })
	// 	// this.log.debug(result.responses[0].payload)

	// 	// // Generate the core schema
	// 	// const template = fs.readFileSync(
	// 	// 	`${__dirname}/../../templates/types/schema.hbs`
	// 	// )

	// 	// const schemas: ISchemaTemplate[] = []

	// 	// Object.keys(result.responses[0].payload.schemas).forEach(slug => {
	// 	// 	result.responses[0].payload.schemas[slug].forEach((s: any) => {
	// 	// 		const parsedSchema = SpruceSchemaParser.parseSchema(s)
	// 	// 		this.log.debug(parsedSchema)
	// 	// 		schemas.push({
	// 	// 			...s,
	// 	// 			slug,
	// 	// 			schemaStr: new SafeString(JSON.stringify(s))
	// 	// 		})
	// 	// 	})
	// 	// })

	// 	// const compiledTemplate = handlebars.compile(template.toString())
	// 	// const definition = compiledTemplate({ schemas })
	// 	// if (cmd.outFile) {
	// 	// 	const filePathToWrite = path.resolve(cmd.outFile)
	// 	// 	await fs.writeFile(filePathToWrite, definition)
	// 	// }
	// }
}
