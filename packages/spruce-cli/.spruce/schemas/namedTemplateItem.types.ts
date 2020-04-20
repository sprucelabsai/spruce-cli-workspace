import * as SpruceSchema from '@sprucelabs/schema'
import Schema, { ISchemaDefinition } from '@sprucelabs/schema'

/**
import namedTemplateItemDefinition from '../../src/schemas/namedTemplateItem.definition'
type NamedTemplateItemDefinition = typeof namedTemplateItemDefinition
*/

export interface INamedTemplateItemDefinition extends ISchemaDefinition {
	id: 'namedTemplateItem',
	name: 'NamedTemplateItem',
	description: 'Used to collect input on the names of a class or interface',
	
	
	    fields: {
	            /** Readable name. The name people will read */
	            'readableName': {
	                label: 'Readable name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                hint: 'The name people will read',
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Camel case name. camelCase version of the name */
	            'camelName': {
	                label: 'Camel case name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                hint: 'camelCase version of the name',
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Pascal case name. PascalCase of the name */
	            'pascalName': {
	                label: 'Pascal case name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                hint: 'PascalCase of the name',
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Constant case name. CONST_CASE of the name */
	            'constName': {
	                label: 'Constant case name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                hint: 'CONST_CASE of the name',
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Description. */
	            'description': {
	                label: 'Description',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                
	                
	                
	                
	                description: 'Describe a bit more here',
	                options: undefined
	            },
	    }
}

export const namedTemplateItemDefinition : INamedTemplateItemDefinition = {
	id: 'namedTemplateItem',
	name: 'NamedTemplateItem',
	description: 'Used to collect input on the names of a class or interface',
	
	
	    fields: {
	            /** Readable name. The name people will read */
	            'readableName': {
	                label: 'Readable name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                hint: 'The name people will read',
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Camel case name. camelCase version of the name */
	            'camelName': {
	                label: 'Camel case name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                hint: 'camelCase version of the name',
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Pascal case name. PascalCase of the name */
	            'pascalName': {
	                label: 'Pascal case name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                hint: 'PascalCase of the name',
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Constant case name. CONST_CASE of the name */
	            'constName': {
	                label: 'Constant case name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                hint: 'CONST_CASE of the name',
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Description. */
	            'description': {
	                label: 'Description',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                
	                
	                
	                
	                description: 'Describe a bit more here',
	                options: undefined
	            },
	    }
}

// Used to collect input on the names of a class or interface
export interface INamedTemplateItem {
	
		/** Readable name. The name people will read */
		'readableName': string
		/** Camel case name. camelCase version of the name */
		'camelName': string
		/** Pascal case name. PascalCase of the name */
		'pascalName': string
		/** Constant case name. CONST_CASE of the name */
		'constName': string
		/** Description. */
		'description': string
}
export interface INamedTemplateItemInstance extends Schema<INamedTemplateItemDefinition> {}
