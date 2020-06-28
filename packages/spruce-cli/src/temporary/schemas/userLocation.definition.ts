import { ISchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'
import { CORE_SCHEMA_VERSION } from '../../constants'
import jobDefinition from './job.definition'
import locationDefinition from './location.definition'
import { RoleSelectChoices } from './role.definition'
import userDefinition from './user.definition'

const userLocationDefinition: ISchemaDefinition = {
	id: 'userLocation',
	name: 'User location',
	version: CORE_SCHEMA_VERSION.constVal,
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
				schema: jobDefinition
			}
		},
		location: {
			label: 'Location',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schema: locationDefinition
			}
		},
		user: {
			label: 'User',
			type: FieldType.Schema,
			isRequired: true,
			options: {
				schema: userDefinition
			}
		}
	}
}

export default userLocationDefinition
