import { SpruceSchemas } from '../../schemas.types'



import generatedFileSchema from '#spruce/schemas/spruceCli/v2020_07_22/generatedFile.schema'
import generatedDirSchema from '#spruce/schemas/spruceCli/v2020_07_22/generatedDir.schema'

const watcherDidDetectChangesEmitPayloadSchema: SpruceSchemas.SpruceCli.v2020_07_22.IWatcherDidDetectChangesEmitPayloadSchema  = {
	id: 'watcherDidDetectChangesEmitPayload',
	name: 'Watcher did detect changes emit payload',
	    fields: {
	            /** . */
	            'changes': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schemas: [generatedFileSchema, generatedDirSchema],}
	            },
	    }
}

export default watcherDidDetectChangesEmitPayloadSchema
