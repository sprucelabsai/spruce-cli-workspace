import { FieldType } from '@sprucelabs/schema'
import { Command } from 'commander'
import slug from 'slug'
import { Feature } from '#spruce/autoloaders/features'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import log from '../lib/log'
import AbstractCommand from './AbstractCommand'

export default class EventCommand extends AbstractCommand {
	public attachCommands(program: Command) {
		program
			.command('event:create [eventName]')
			.description('Create a new event for your skill')
			.option(
				'-d, --destinationDir <dir>',
				'Where should I write the event definition files?',
				'./.spruce/schemas'
			)
			.action(this.createEvent.bind(this))
	}

	public async createEvent(eventName?: string) {
		log.debug('Create an event')
		if (!eventName) {
			eventName = await this.term.prompt({
				type: FieldType.Text,
				label: 'Name your event',
				isRequired: true
			})
		}

		// If they passed a name, show overview
		const nameReadable = eventName
		const nameCamel = this.utilities.names.toCamel(nameReadable)
		const namePascal = this.utilities.names.toPascal(nameCamel)
		const eventSlug = slug(nameCamel, { lower: true })

		const form = this.formBuilder({
			definition: SpruceSchemas.Local.EventTemplate.definition,
			initialValues: {
				nameReadable,
				nameCamel,
				namePascal,
				slug: eventSlug
			},
			onWillAskQuestion: (name, def, val) => {
				if (name === 'nameCamel') {
					// const n:
					// 	| 'nameReadable'
					// 	| 'nameCamel'
					// 	| 'namePascal'
					// 	| 'nameCamelPlural'
					// 	| 'namePascalPlural'
					// 	| 'nameConst'
					// 	| 'description' = name !== 'slug' ? name : 'nameCamel'

					// @ts-ignore
					def = this.utilities.names.onWillAskQuestionHandler(name, def, val)
				}

				return def
			}
		})

		// All the values
		const values = await form.present({
			showOverview: true,
			fields: ['nameReadable', 'nameCamel', 'namePascal', 'description', 'slug']
		})

		// Make sure schema module is installed
		await this.services.feature.install({
			features: [
				{
					feature: Feature.Mercury
				}
			]
		})

		log.debug(values)

		// const definitionDestination = this.resolvePath(
		// 	cmd.definitionDestinationDir as string,
		// 	`${values.nameCamel}.definition.ts`
		// )
		// const typesDestination = this.resolvePath(cmd.typesDestinationDir as string)
		// const definition = templates.definition(values)

		// await this.writeFile(definitionDestination, definition)

		// this.term.info(`Definition created at ${definitionDestination}`)
	}
}
