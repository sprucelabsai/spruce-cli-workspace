import { ISchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'
import { RoleSelectChoices } from './role.definition'

const userLocationDefinition: ISchemaDefinition = {
	id: 'userLocation',
	name: 'User location',
	description: 'A location a person has given access to themselves.',
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id
		},
		role: {
			label: 'Name',
			type: FieldType.Select,
			isRequired: true,
			options: {
				choices: RoleSelectChoices
			}
		},
		status: {
			label: 'Status',
			type: FieldType.Text
		},
		visits: {
			label: 'Total visits',
			type: FieldType.Number,
			isRequired: true,
			options: {
				choices: RoleSelectChoices
			}
		},
		lastRecordedVisit: {
			label: 'Last visit',
			type: FieldType.DateTime
		},
		job: {
			label: 'Job',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schemaId: { id: 'job' }
			}
		},
		location: {
			label: 'Location',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schemaId: { id: 'location' }
			}
		},
		user: {
			label: 'User',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schemaId: { id: 'user' }
			}
		}
	}
}

export default userLocationDefinition
