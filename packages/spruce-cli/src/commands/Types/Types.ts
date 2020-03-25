import { Command } from 'commander'
import fs from 'fs-extra'
import { ISpruceSchema, Parser } from '@sprucelabs/spruce-types'
import handlebars, { SafeString } from 'handlebars'
import request from 'superagent'
import path from 'path'
import mercury from '../../utilities/mercury'
import config from '../../utilities/Config'
import CommandBase from '../../CommandBase'
import { SpruceEvents } from '../../types/events-generated'

interface ISchemaTemplate extends ISpruceSchema {
	/** The slug this schema belongs to */
	slug: string

	/** JSON.stringify version of the schema */
	schemaStr: string
}

export default class Cli extends CommandBase {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('types:sync:dev')
			.description('For CLI development purposes only.')
			.action(this.syncTypes)
		program
			.command('types:sync')
			.description('Generates type definitions for everything!')
			.action(this.sync)
		program
			.command('types:sync-schemas')
			.description('Generates interface definitions based on schemas')
			.option('-o --outFile <file>')
			.action(this.syncSchemas)
	}

	/** Create a new skill */
	public async sync() {
		this.info('TODO: Sync all types')
	}

	/** Fetches the generated events file from API */
	public async syncTypes() {
		const { text } = await request.get(
			`${config.getApiUrl(config.remote)}/api/2.0/types/events`
		)

		fs.writeFileSync(
			`${__dirname}/../../../../src/types/events-generated.ts`,
			text
		)
	}

	/** Fetchs schemas from the API and builds TS interfaces, writing to cmd.outFile if it's set */
	public async syncSchemas(cmd: Command) {
		const result = await mercury.emit<
			SpruceEvents.core.GetSchemas.IPayload,
			SpruceEvents.core.GetSchemas.IResponseBody
		>({
			eventName: SpruceEvents.core.GetSchemas.name,
			payload: {}
		})

		this.log.debug({ outFile: cmd.outFile })
		this.log.debug(result.responses[0].payload)

		// Generate the core schema
		const template = fs.readFileSync(
			`${__dirname}/../../templates/types/schema.hbs`
		)

		const schemas: ISchemaTemplate[] = []

		Object.keys(result.responses[0].payload.schemas).forEach(slug => {
			result.responses[0].payload.schemas[slug].forEach((s: any) => {
				const parsedSchema = Parser.parseSchema(s)
				this.log.debug(parsedSchema)
				schemas.push({
					...s,
					slug,
					schemaStr: new SafeString(JSON.stringify(s))
				})
			})
		})

		const compiledTemplate = handlebars.compile(template.toString())
		const definition = compiledTemplate({ schemas })
		if (cmd.outFile) {
			const filePathToWrite = path.resolve(cmd.outFile)
			await fs.writeFile(filePathToWrite, definition)
		}
	}
}
