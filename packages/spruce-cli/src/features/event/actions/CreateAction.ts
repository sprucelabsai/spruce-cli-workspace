import {
	buildSchema,
	normalizeSchemaValues,
	SchemaValues,
} from '@sprucelabs/schema'
import { eventDiskUtil } from '@sprucelabs/spruce-event-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import syncEventActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncEventAction.schema'
import SpruceError from '../../../errors/SpruceError'
import namedTemplateItemBuilder from '../../../schemas/v2020_07_22/namedTemplateItem.builder'
import syncEventActionBuilder from '../../../schemas/v2020_07_22/syncEventAction.builder'
import { GeneratedFile } from '../../../types/cli.types'
import mergeUtil from '../../../utilities/merge.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'createEventAction',
	fields: {
		nameReadable: {
			...namedTemplateItemBuilder.fields.nameReadable,
			isRequired: true,
		},
		nameKebab: {
			...namedTemplateItemBuilder.fields.nameKebab,
			label: 'Event name',
			isRequired: true,
		},
		nameCamel: {
			...namedTemplateItemBuilder.fields.nameCamel,
			isRequired: true,
		},
		version: {
			type: 'text',
			label: 'Version',
			isPrivate: true,
		},
		...syncEventActionBuilder.fields,
	},
})

type OptionsSchema = typeof optionsSchema

export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'create'
	public optionsSchema: OptionsSchema = optionsSchema

	public async execute(
		options: SchemaValues<OptionsSchema>
	): Promise<FeatureActionResponse> {
		const {
			nameKebab,
			nameReadable,
			nameCamel,
			version,
		} = this.validateAndNormalizeOptions(options)

		const skill = await this.Store('skill').loadCurrentSkill()

		if (!skill.id || !skill.slug) {
			return {
				errors: [new SpruceError({ code: 'SKILL_NOT_REGISTERED' })],
			}
		}

		try {
			let response: FeatureActionResponse = {}

			const eventsDir = diskUtil.resolvePath(this.cwd, 'src', 'events')

			const resolvedVersion = await this.resolveVersion(version, eventsDir)

			const files: ({
				templateMethod:
					| 'eventEmitPayload'
					| 'eventResponsePayload'
					| 'permissionContractBuilder'
			} & Omit<GeneratedFile, 'path'>)[] = [
				{
					templateMethod: 'eventEmitPayload',
					name: 'emitPayload.builder.ts',
					action: 'generated',
					description:
						'The payload that will be sent when you emit this event.',
				},
				{
					templateMethod: 'eventResponsePayload',
					name: 'responsePayload.builder.ts',
					action: 'generated',
					description:
						'The payload that every listener will need to respond with. Delete this file for events that are fire and forget.',
				},
				{
					templateMethod: 'permissionContractBuilder',
					name: 'emitPermissions.builder.ts',
					action: 'generated',
					description: 'Permissions someone else will need to emit your event.',
				},
				{
					templateMethod: 'permissionContractBuilder',
					name: 'listenPermissions.builder.ts',
					action: 'generated',
					description:
						'Permissions someone else will need to listen to your event.',
				},
			]

			response.files = []

			for (const file of files) {
				const destination = diskUtil.resolvePath(
					eventDiskUtil.resolveEventPath(eventsDir, {
						eventName: nameKebab,
						version: resolvedVersion,
					}),
					file.name
				)

				const contents = this.templates[file.templateMethod]({
					nameCamel,
					nameReadable,
					version: resolvedVersion,
				})

				diskUtil.writeFile(destination, contents)

				response.files.push({
					...file,
					path: destination,
				})
			}

			const syncOptions = normalizeSchemaValues(
				syncEventActionSchema,
				options,
				{
					includePrivateFields: true,
				}
			)

			const syncResponse = await this.parent.Action('sync').execute(syncOptions)

			return mergeUtil.mergeActionResults(response, syncResponse)
		} catch (err) {
			return {
				errors: [err],
			}
		}
	}
}
