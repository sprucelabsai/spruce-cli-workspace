import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import organizationDefinition from '../../temporary/schemas/organization.definition'

export interface IOrganization extends SchemaDefinitionValues<typeof organizationDefinition> {}
export interface IOrganizationInstance extends Schema<typeof organizationDefinition> {}
