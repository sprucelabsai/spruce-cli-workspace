import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import userLocationDefinition from '../../temporary/schemas/userLocation.definition'

export interface IUserLocation extends SchemaDefinitionValues<typeof userLocationDefinition> {}
export interface IUserLocationInstance extends Schema<typeof userLocationDefinition> {}
