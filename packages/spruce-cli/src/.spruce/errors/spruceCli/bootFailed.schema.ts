import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'

const bootFailedSchema: SpruceErrors.SpruceCli.BootFailedSchema = {
	id: 'bootFailed',
	namespace: 'SpruceCli',
	name: 'Boot failed',
	description: 'Booting your skill failed!',
	fields: {},
}

SchemaRegistry.getInstance().trackSchema(bootFailedSchema)

export default bootFailedSchema
