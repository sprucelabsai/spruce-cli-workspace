import { Command } from 'commander'
import CommandBase from '../Base'

export default class Cli extends CommandBase {
	/** Sets up commands */
	public attachCommands(program: Command) {
		// program
		// 	.command('types:sync:dev')
		// 	.description('For CLI development purposes only.')
		// 	.action(this.syncTypes)
		// program
		// 	.command('types:sync')
		// 	.description('Generates type definitions for everything!')
		// 	.action(this.sync)
		program
			.command('types:sync')
			.description(
				'Generates types file holding all interfaces, types, and enums needed to dev fast'
			)
			.option('-t, --types <types>', 'What should I sync?', 'all')
			.option(
				'-o, --outFile <file>',
				'Where should I write the types file?',
				'./.spruce'
			)
			.action(this.sync)
	}

	/** Create a new skill */
	public async sync() {
		// this.info('TODO: Sync all types')
	}

	/** Fetches the generated events file from API */
	public async syncTypes() {
		// const { text } = await request.get(
		// 	`${config.getApiUrl(config.remote)}/api/2.0/types/events`
		// )
		// fs.writeFileSync(
		// 	`${__dirname}/../../../../src/types/events-generated.ts`,
		// 	text
		// )
	}

	/** Fetchs schemas from the API and builds TS interfaces, writing to cmd.outFile if it's set */
	public async syncSchemas(cmd: Command) {
		debugger

		console.log('in!')
		// const result = await mercury.emit<
		// 	SpruceEvents.core.GetSchemas.IPayload,
		// 	SpruceEvents.core.GetSchemas.IResponseBody
		// >({
		// 	eventName: SpruceEvents.core.GetSchemas.name,
		// 	payload: {}
		// })

		// this.log.debug({ outFile: cmd.outFile })
		// this.log.debug(result.responses[0].payload)

		// // Generate the core schema
		// const template = fs.readFileSync(
		// 	`${__dirname}/../../templates/types/schema.hbs`
		// )

		// const schemas: ISchemaTemplate[] = []

		// Object.keys(result.responses[0].payload.schemas).forEach(slug => {
		// 	result.responses[0].payload.schemas[slug].forEach((s: any) => {
		// 		const parsedSchema = SpruceSchemaParser.parseSchema(s)
		// 		this.log.debug(parsedSchema)
		// 		schemas.push({
		// 			...s,
		// 			slug,
		// 			schemaStr: new SafeString(JSON.stringify(s))
		// 		})
		// 	})
		// })

		// const compiledTemplate = handlebars.compile(template.toString())
		// const definition = compiledTemplate({ schemas })
		// if (cmd.outFile) {
		// 	const filePathToWrite = path.resolve(cmd.outFile)
		// 	await fs.writeFile(filePathToWrite, definition)
		// }
	}
}
