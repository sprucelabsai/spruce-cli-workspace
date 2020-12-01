import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const syncErrorContractSchema: SpruceSchemas.SpruceCli.v2020_07_22.SyncErrorContractSchema  = {
	id: 'syncErrorContract',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'sync error contract',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(syncErrorContractSchema)

export default syncErrorContractSchema
