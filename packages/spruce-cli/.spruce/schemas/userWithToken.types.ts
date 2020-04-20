import * as SpruceSchema from '@sprucelabs/schema'
import Schema, { ISchemaDefinition } from '@sprucelabs/schema'

/**
import userWithTokenDefinition from '../../src/schemas/userWithToken.definition'
type UserWithTokenDefinition = typeof userWithTokenDefinition
*/

export interface IUserWithTokenDefinition extends ISchemaDefinition {
	id: 'userWithToken',
	name: 'User',
	description: 'A stripped down cli user with token details for login',
	
	
	    fields: {
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: SpruceSchema.FieldType.Id,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Casual name. Generated name that defaults to Friend! */
	            'casualName': {
	                label: 'Casual name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                hint: 'Generated name that defaults to Friend!',
	                
	                
	                
	                
	                options: undefined
	            },
	            /** . */
	            'token': {
	                label: '',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Logged in. */
	            'isLoggedIn': {
	                label: 'Logged in',
	                type: SpruceSchema.FieldType.Boolean,
	                
	                
	                
	                
	                
	                
	                
	                options: undefined
	            },
	    }
}

export const userWithTokenDefinition : IUserWithTokenDefinition = {
	id: 'userWithToken',
	name: 'User',
	description: 'A stripped down cli user with token details for login',
	
	
	    fields: {
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: SpruceSchema.FieldType.Id,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Casual name. Generated name that defaults to Friend! */
	            'casualName': {
	                label: 'Casual name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                hint: 'Generated name that defaults to Friend!',
	                
	                
	                
	                
	                options: undefined
	            },
	            /** . */
	            'token': {
	                label: '',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Logged in. */
	            'isLoggedIn': {
	                label: 'Logged in',
	                type: SpruceSchema.FieldType.Boolean,
	                
	                
	                
	                
	                
	                
	                
	                options: undefined
	            },
	    }
}

// A stripped down cli user with token details for login
export interface IUserWithToken {
	
		/** Id. */
		'id': string
		/** Casual name. Generated name that defaults to Friend! */
		'casualName': string
		/** . */
		'token': string
		/** Logged in. */
		'isLoggedIn'?: boolean
}
export interface IUserWithTokenInstance extends Schema<IUserWithTokenDefinition> {}
