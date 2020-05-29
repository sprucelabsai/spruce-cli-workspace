import * as SpruceSchema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import jobDefinition from './job.definition'
import locationDefinition from './location.definition'
import userDefinition from './user.definition'

const userLocationdefinition: SpruceSchemas.Core.UserLocation.IDefinition = {
	id: 'userLocation',
	name: 'User location',
	description: 'A location a person has given access to themselves.',

	fields: {
		/** Id. */
		id: {
			label: 'Id',
			type: SpruceSchema.FieldType.Id,

			options: undefined
		},
		/** Name. */
		role: {
			label: 'Name',
			type: SpruceSchema.FieldType.Select,

			isRequired: true,

			options: {
				choices: [
					{ value: 'owner', label: 'Owner' },
					{ value: 'groupManager', label: 'District/region manager' },
					{ value: 'manager', label: 'Store manager' },
					{ value: 'teammate', label: 'Teammate' },
					{ value: 'guest', label: 'Guest' }
				]
			}
		},
		/** Status. */
		status: {
			label: 'Status',
			type: SpruceSchema.FieldType.Text,

			options: undefined
		},
		/** Total visits. */
		visits: {
			label: 'Total visits',
			type: SpruceSchema.FieldType.Number,

			isRequired: true,

			options: {
				choices: [
					{ value: 'owner', label: 'Owner' },
					{ value: 'groupManager', label: 'District/region manager' },
					{ value: 'manager', label: 'Store manager' },
					{ value: 'teammate', label: 'Teammate' },
					{ value: 'guest', label: 'Guest' }
				]
			}
		},
		/** Last visit. */
		lastRecordedVisit: {
			label: 'Last visit',
			type: SpruceSchema.FieldType.DateTime,

			options: undefined
		},
		/** Job. */
		job: {
			label: 'Job',
			type: SpruceSchema.FieldType.Schema,

			isRequired: true,

			options: { schemas: [jobDefinition] }
		},
		/** Location. */
		location: {
			label: 'Location',
			type: SpruceSchema.FieldType.Schema,

			isRequired: true,

			options: { schemas: [locationDefinition] }
		},
		/** User. */
		user: {
			label: 'User',
			type: SpruceSchema.FieldType.Schema,

			isRequired: true,

			options: { schemas: [userDefinition] }
		}
	}
}

export default userLocationdefinition
