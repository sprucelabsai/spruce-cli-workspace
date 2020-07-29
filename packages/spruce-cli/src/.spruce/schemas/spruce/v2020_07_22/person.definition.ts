import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

import profileImageDefinition from '#spruce/schemas/spruce/v2020_07_22/profileImage.definition'

const personDefinition: SpruceSchemas.Spruce.v2020_07_22.IPersonDefinition  = {
	id: 'person',
	name: 'Person',
	description: 'A human being.',
	    fields: {
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: FieldType.Id,
	                isRequired: true,
	                options: undefined
	            },
	            /** First name. */
	            'firstName': {
	                label: 'First name',
	                type: FieldType.Text,
	                options: undefined
	            },
	            /** Last name. */
	            'lastName': {
	                label: 'Last name',
	                type: FieldType.Text,
	                options: undefined
	            },
	            /** Casual name. The name you can use when talking to this person. */
	            'casualName': {
	                label: 'Casual name',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'The name you can use when talking to this person.',
	                options: undefined
	            },
	            /** Casual name. The name you can use when talking to this person. */
	            'formalName': {
	                label: 'Casual name',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'The name you can use when talking to this person.',
	                options: undefined
	            },
	            /** Phone. A number that can be texted */
	            'phoneNumber': {
	                label: 'Phone',
	                type: FieldType.Phone,
	                hint: 'A number that can be texted',
	                options: undefined
	            },
	            /** Profile photos. */
	            'profileImages': {
	                label: 'Profile photos',
	                type: FieldType.Schema,
	                options: {schemas: [profileImageDefinition],}
	            },
	            /** Default profile photos. */
	            'defaultProfileImages': {
	                label: 'Default profile photos',
	                type: FieldType.Schema,
	                isRequired: true,
	                options: {schemas: [profileImageDefinition],}
	            },
	    }
}

export default personDefinition
