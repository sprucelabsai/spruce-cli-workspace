import { SpruceSchemas } from '../../schemas.types'





const watcherDidDetectChangesEmitPayloadSchema: SpruceSchemas.SpruceCli.v2020_07_22.IWatcherDidDetectChangesEmitPayloadSchema  = {
	id: 'watcherDidDetectChangesEmitPayload',
	name: 'Watcher did detect changes emit payload',
	    fields: {
	            /** First Field. */
	            'changes': {
	                label: 'First Field',
	                type: 'raw',
	                isRequired: true,
	                isArray: true,
	                options: {valueType: `GeneratedFileOrDir`,}
	            },
	    }
}

export default watcherDidDetectChangesEmitPayloadSchema
