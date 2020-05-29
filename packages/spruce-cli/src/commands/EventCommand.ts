import { FieldType } from '@sprucelabs/schema'
import { templates } from '@sprucelabs/spruce-templates'
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
				'./src/events/v1'
			)
			.action(this.createEvent.bind(this))

		program
			.command('event:sync [lookupDir]')
			.description('Generates event types based on event definitions')
			.option(
				'-l, --lookupDir <lookupDir>',
				'Where should I look for definitions files (*.definition.ts)?',
				'./src/events'
			)
			.option(
				'-d, --destinationDir <dir>',
				'Where should I write the event definition files?',
				'./.spruce/events'
			)
			.option('-f, --force', 'Continue even if there is an error', false)
			.action(this.sync.bind(this))
	}

	public async createEvent(eventName: string | undefined, cmd: Command) {
		log.debug('Create an event')
		if (!eventName) {
			eventName = await this.term.prompt({
				type: FieldType.Text,
				label: 'Name your event',
				isRequired: true
			})
		}

		const destinationDir = cmd.destinationDir as string

		// If they passed a name, show overview
		const nameReadable = eventName
		const nameCamel = this.utilities.names.toCamel(nameReadable)
		const namePascal = this.utilities.names.toPascal(nameCamel)
		const eventSlug = slug(nameReadable, { lower: true })

		const form = this.formBuilder({
			definition: SpruceSchemas.Local.EventTemplate.definition,
			initialValues: {
				nameReadable,
				nameCamel,
				namePascal,
				slug: eventSlug
			},
			onWillAskQuestion: (name, def, val) => {
				if (name !== 'slug') {
					def = this.utilities.names.onWillAskQuestionHandler(
						name as keyof SpruceSchemas.Local.INamedTemplateItem,
						def,
						val
					)
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

		const definitionDirectoryDestination = this.resolvePath(
			destinationDir,
			eventSlug
		)
		const emitPayloadDefinitionDestination = this.resolvePath(
			definitionDirectoryDestination,
			eventSlug,
			`${eventSlug}.emitPayload.definition.ts`
		)
		const responsePayloadDefinitionDestination = this.resolvePath(
			definitionDirectoryDestination,
			eventSlug,
			`${eventSlug}.responsePayload.definition.ts`
		)

		const emitPayloadDefinition = templates.definition({
			...values,
			nameCamel: `${values.nameCamel}EmitPayload`,
			description: `Emit Payload: ${values.description}`
		})
		const responsePayloadDefinition = templates.definition({
			...values,
			nameCamel: `${values.nameCamel}ResponsePayload`,
			description: `Response Payload: ${values.description}`
		})

		await this.writeFile(
			emitPayloadDefinitionDestination,
			emitPayloadDefinition
		)
		await this.writeFile(
			responsePayloadDefinitionDestination,
			responsePayloadDefinition
		)

		const createdFiles = [
			{
				name: `"${eventSlug}" emit payload definition`,
				path: emitPayloadDefinitionDestination
			},
			{
				name: `"${eventSlug}" response payload definition`,
				path: responsePayloadDefinitionDestination
			}
		]

		// TODO: Standardize on how we want to sync schemas / events automatically on event creation
		const confirm = await this.term.confirm(
			'Do you want to sync schema and event types so you can use your new definition?'
		)

		if (confirm) {
			try {
				cmd.lookupDir = ['./src/schemas', './src/events']
				cmd.destinationDir = './.spruce/schemas'
				await this.commands.schema.sync(undefined, cmd)
				cmd.lookupDir = './src/events'
				cmd.destinationDir = './.spruce/events'
				await this.sync(undefined, cmd)
			} catch (err) {
				this.term.stopLoading()
				this.term.warn(
					'I was not able to sync it with #spruce/schemas/schemas.types'
				)
				this.term.warn(
					"You won't be able to use your new event until the below error is fixed and you run `spruce schema:sync` and `spruce event:sync`"
				)
				this.term.handleError(err)
			}
		}

		this.term.createdFileSummary({
			createdFiles
		})
	}

	public async sync(lookupDirOption: string | undefined, cmd: Command) {
		log.debug('Create an event')
		const lookupDir = lookupDirOption || (cmd.lookupDir as string)
		const destinationDir = cmd.destinationDir as string
		const force = !!cmd.force

		// Make sure schema module is installed
		await this.services.feature.install({
			features: [
				{
					feature: Feature.Mercury
				}
			]
		})

		const destination = this.resolvePath(destinationDir, 'events.types.ts')

		// Load schemas
		const {
			eventTemplate,
			errors: eventTemplateErrors
		} = await this.stores.event.eventTemplateItems({
			localLookupDirs: [this.resolvePath(lookupDir)]
		})

		if (eventTemplateErrors.length > 0 && !force) {
			this.term.warn(`I had trouble generating the event template.`)
			let confirm = await this.term.confirm(
				'Do you to review the errors with me real quick? (Y to review, N to move on)'
			)

			if (confirm) {
				do {
					this.term.handleError(eventTemplateErrors[0])
					eventTemplateErrors.pop()
					await this.term.confirm(
						eventTemplateErrors.length === 0 ? 'Done' : 'Next'
					)
				} while (eventTemplateErrors.length > 0)

				confirm = await this.term.confirm(
					`Ok, ready for me to try to generate the types for the event definitions I was able to load?`
				)

				if (!confirm) {
					return
				}
			}
		}

		const definition = templates.eventTypes({
			eventTemplate
		})

		await this.writeFile(destination, definition)

		this.term.createdFileSummary({
			createdFiles: [
				{
					name: 'Event types',
					path: destination
				}
			]
		})

		this.term.startLoading(
			'Prettying generated files (you can use them now)...'
		)
		await Promise.all([
			this.services.lint.fix(this.resolvePath(lookupDir, '**/*.ts')),
			this.services.lint.fix(this.resolvePath(destinationDir, '**/*.ts'))
		])

		this.term.stopLoading()
	}
}
