import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import jobDefinition from '../../temporary/schemas/job.definition'

export interface IJob extends SchemaDefinitionValues<typeof jobDefinition> {}
export interface IJobInstance extends Schema<typeof jobDefinition> {}
