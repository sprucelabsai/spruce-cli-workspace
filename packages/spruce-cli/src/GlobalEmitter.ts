import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import {
	buildEventContract,
	MercuryEventEmitter,
} from '@sprucelabs/mercury-types'
import { buildSchema } from '@sprucelabs/schema'
import generatedFileSchema from '#spruce/schemas/spruceCli/v2020_07_22/generatedFile.schema'
import watcherDidDetectChangesEmitPayloadSchema from '#spruce/schemas/spruceCli/v2020_07_22/watcherDidDetectChangesEmitPayload.schema'

export const globalContract = buildEventContract({
	eventSignatures: {
		'watcher.did-detect-change': {
			emitPayloadSchema: watcherDidDetectChangesEmitPayloadSchema,
		},
		'schema.did-fetch-schemas': {
			emitPayloadSchema: buildSchema({
				id: 'didFetchSchemasEmitPayload',
				fields: {
					schemas: {
						type: 'raw',
						isArray: true,
						options: {
							valueType: 'Schema',
						},
					},
				},
			}),
			responsePayloadSchema: buildSchema({
				id: 'didFetchSchemasResponsePayload',
				fields: {
					schemas: {
						type: 'raw',
						isArray: true,
						options: {
							valueType: 'Schema',
						},
					},
				},
			}),
		},
		'skill.register-dashboard-widgets': {},
		'feature.will-execute': {
			emitPayloadSchema: buildSchema({
				id: 'willExecuteEmitPayload',
				fields: {
					featureCode: {
						type: 'text',
						isRequired: true,
					},
					actionCode: {
						type: 'text',
						isRequired: true,
					},
				},
			}),
			responsePayloadSchema: buildSchema({
				id: 'willExecuteResponsePayload',
				fields: {},
			}),
		},
		'feature.did-execute': {
			emitPayloadSchema: buildSchema({
				id: 'didExecuteEmitPayload',
				importsWhenLocal: [
					'import { FeatureActionResponse } from #spruce/../features/features/features.types',
				],
				fields: {
					featureCode: {
						type: 'text',
						isRequired: true,
					},
					actionCode: {
						type: 'text',
						isRequired: true,
					},
					results: {
						type: 'raw',
						isRequired: true,
						options: {
							valueType: 'FeatureActionResponse',
						},
					},
				},
			}),
			responsePayloadSchema: buildSchema({
				id: 'didExecuteResponsePayload',
				fields: {
					files: {
						type: 'schema',
						isArray: true,
						options: {
							schema: generatedFileSchema,
						},
					},
				},
			}),
		},
		'skill.did-upgrade': {
			responsePayloadSchema: buildSchema({
				id: 'didUpgradeResponseSchema',
				fields: {
					files: {
						type: 'schema',
						isArray: true,
						options: {
							schema: generatedFileSchema,
						},
					},
				},
			}),
		},
	},
})

export type GlobalEventContract = typeof globalContract
export type GlobalEmitter = MercuryEventEmitter<GlobalEventContract>

export default class CliGlobalEmitter extends AbstractEventEmitter<GlobalEventContract> {
	public static Emitter() {
		return new CliGlobalEmitter(globalContract) as GlobalEmitter
	}
}
