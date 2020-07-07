import { FieldType, buildErrorDefinition } from '@sprucelabs/schema'

const keyExistsDefinition = buildErrorDefinition({
	id: 'keyExists',
	name: 'keyExists',
	description: 'The key in the object already exists',
	fields: {
		key: {
			type: FieldType.Text,
			label: 'Key',
			isRequired: true,
			hint: 'The key that already exists'
		}
	}
})

export default keyExistsDefinition
