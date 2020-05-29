import pathUtil from 'path'
import Schema from '@sprucelabs/schema/build/Schema'
import {
	IEventTemplateItem,
	IEventTemplate
} from '@sprucelabs/spruce-templates'
import globby from 'globby'
import { ErrorCode } from '#spruce/errors/codes.types'
import SpruceError from '../errors/SpruceError'
import AbstractStore from './AbstractStore'
import { ISchemaTemplateItemsOptions } from './SchemaStore'

interface IEventTemplateItemMap {
	[eventName: string]: Partial<IEventTemplateItem>
}

export type EventTemplateItemsReturnType<
	T extends ISchemaTemplateItemsOptions
> = T['includeErrors'] extends false
	? IEventTemplateItem[]
	: {
			eventTemplate: IEventTemplate
			errors: SpruceError[]
	  }

export default class EventStore extends AbstractStore {
	public name = 'event'

	/** Get the schema map for events */
	public async eventTemplateItems<T extends ISchemaTemplateItemsOptions>(
		options: T
	): Promise<EventTemplateItemsReturnType<T>> {
		const { includeErrors = true, localLookupDirs } = options

		const eventTemplate: IEventTemplate = {}

		/** Get all schemas from api  */
		// TODO load other definitions from api

		// Local
		const localErrors: SpruceError[] = []
		// TODO: Cleanup / break up statements for easier readability
		const globbyPaths = localLookupDirs.map(d =>
			pathUtil.join(d, '/**/*.definition.ts')
		)

		const eventTemplateItemMap: IEventTemplateItemMap = {}

		const filePaths = await globby(globbyPaths)
		for (let i = 0; i < filePaths.length; i += 1) {
			const file = filePaths[i]
			try {
				const matches = file.match(/\/([^/]+)\.(\w+)\.definition\.ts$/)
				const eventName = matches && matches[1]
				const payloadType = matches && matches[2]

				if (eventName && payloadType) {
					const definition = await this.services.child.importDefault(file, {
						cwd: this.cwd
					})
					Schema.validateDefinition(definition)

					if (!eventTemplateItemMap[eventName]) {
						eventTemplateItemMap[eventName] = {
							eventName,
							eventNamePascal: this.utilities.names.toPascal(eventName)
						}
					}

					// @ts-ignore
					eventTemplateItemMap[eventName][payloadType] = definition
				}
			} catch (err) {
				localErrors.push(
					new SpruceError({
						code: ErrorCode.DefinitionFailedToImport,
						file,
						originalError: err
					})
				)
			}
		}

		const eventTemplateItems: IEventTemplateItem[] = []
		Object.keys(eventTemplateItemMap).forEach(eventName => {
			if (
				eventTemplateItemMap[eventName].emitPayload &&
				eventTemplateItemMap[eventName].eventName &&
				eventTemplateItemMap[eventName].eventNamePascal &&
				eventTemplateItemMap[eventName].responsePayload
			) {
				eventTemplateItems.push(
					eventTemplateItemMap[eventName] as IEventTemplateItem
				)
			}
		})

		eventTemplate.Local = { eventTemplateItems }

		return (includeErrors
			? {
					eventTemplate,
					errors: localErrors
			  }
			: [...eventTemplateItems]) as EventTemplateItemsReturnType<T>
	}
}
