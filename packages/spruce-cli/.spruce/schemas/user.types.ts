import * as SpruceSchema from '@sprucelabs/schema'
import Schema, { ISchemaDefinition } from '@sprucelabs/schema'

/**
import userDefinition from '../../src/schemas/user.definition'
type UserDefinition = typeof userDefinition
*/

export interface IUserDefinition extends ISchemaDefinition {
	id: 'user',
	name: 'User',
	description: 'A stripped down user for the cli',
	
	
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
	    }
}

export const userDefinition : IUserDefinition = {
	id: 'user',
	name: 'User',
	description: 'A stripped down user for the cli',
	
	
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
	    }
}

// A stripped down user for the cli
export interface IUser {
	
		/** Id. */
		'id': string
		/** Casual name. Generated name that defaults to Friend! */
		'casualName': string
}
export interface IUserInstance extends Schema<IUserDefinition> {}
