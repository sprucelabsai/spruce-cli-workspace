import  { buildSchemaDefinition,
	FieldType,
} from '@sprucelabs/schema'

const readableNameDefinition = buildSchemaDefinition({
	id: 'readableName',
	name: 'Readable Name',
    description: 'aoeuaoeuaoeu ao uaou',
	fields: {
		fieldName1: {
			type: FieldType.Boolean,
			label: 'First Field',
			isRequired: true
		},
		fieldName2: {
			type: FieldType.Number,
			label: 'Second Field',
			isRequired: true,
			hint:
				'A hint'
		}
	}
})

export default readableNameDefinition
