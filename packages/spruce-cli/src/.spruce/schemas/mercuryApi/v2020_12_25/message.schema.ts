import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import messageTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/messageTarget.schema'
import messageSourceSchema from '#spruce/schemas/mercuryApi/v2020_12_25/messageSource.schema'
import fullMessageChoicesSchema from '#spruce/schemas/mercuryApi/v2020_12_25/fullMessageChoices.schema'

const messageSchema: SpruceSchemas.MercuryApi.v2020_12_25.MessageSchema  = {
	id: 'message',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'dateCreated': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'dateSent': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: messageTargetSchema,}
	            },
	            /** . */
	            'source': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: messageSourceSchema,}
	            },
	            /** . */
	            'errors': {
	                type: 'text',
	                isPrivate: true,
	                isArray: true,
	                options: undefined
	            },
	            /** . */
	            'classification': {
	                type: 'select',
	                isRequired: true,
	                options: {choices: [{"value":"auth","label":"Auth"},{"value":"transactional","label":"transactional"},{"value":"promotional","label":"Promotional"},{"value":"incoming","label":"incoming"}],}
	            },
	            /** . */
	            'status': {
	                type: 'select',
	                isPrivate: true,
	                defaultValue: "pending",
	                options: {choices: [{"value":"pending","label":"Pending"},{"value":"processing","label":"Processing"},{"value":"sent","label":"Sent"},{"value":"failed","label":"Failed"}],}
	            },
	            /** . */
	            'body': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'context': {
	                type: 'raw',
	                isPrivate: true,
	                options: {valueType: `Record<string, any>`,}
	            },
	            /** . */
	            'topicId': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'choices': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: fullMessageChoicesSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(messageSchema)

export default messageSchema
