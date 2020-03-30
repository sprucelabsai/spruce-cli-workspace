import Schema, {
	buildSchemaDefinition,
	FieldType,
	SchemaDefinitionValues
} from '@sprucelabs/schema'

const mealDefinition = buildSchemaDefinition({
	id: 'meal',
	name: 'Meal',
	description: 'You eat it',
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
			hint: 'A hint'
		}
	}
})

export default mealDefinition

export type Meal = SchemaDefinitionValues<typeof mealDefinition>
export type MealInstance = Schema<typeof mealDefinition>
