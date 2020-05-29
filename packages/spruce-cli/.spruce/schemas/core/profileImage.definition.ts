import * as SpruceSchema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const profileImageDefinition: SpruceSchemas.Core.ProfileImage.IDefinition = {
	id: 'profileImage',
	name: 'Profile Image Sizes',
	description: 'Profile images at various helpful sizes and resolutions.',
	fields: {
		/** 60x60. */
		profile60: {
			label: '60x60',
			type: SpruceSchema.FieldType.Text,
			isRequired: true,
			options: undefined
		},
		/** 150x150. */
		profile150: {
			label: '150x150',
			type: SpruceSchema.FieldType.Text,
			isRequired: true,
			options: undefined
		},
		/** 60x60. */
		'profile60@2x': {
			label: '60x60',
			type: SpruceSchema.FieldType.Text,
			isRequired: true,
			options: undefined
		},
		/** 150x150. */
		'profile150@2x': {
			label: '150x150',
			type: SpruceSchema.FieldType.Text,
			isRequired: true,
			options: undefined
		}
	}
}

export default profileImageDefinition
