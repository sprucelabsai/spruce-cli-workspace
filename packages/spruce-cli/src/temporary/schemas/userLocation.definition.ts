import { ISchemaDefinition, FieldType } from '@sprucelabs/schema'
import { RoleSelectChoices } from './role.definition'

const userlocationDefinition: ISchemaDefinition = {
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
				schemaId: 'job'
			}
		},
		location: {
			label: 'Location',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schemaId: 'location'
			}
		},
		user: {
			label: 'User',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schemaId: 'user'
			}
		}
	}
}

export default userlocationDefinition
