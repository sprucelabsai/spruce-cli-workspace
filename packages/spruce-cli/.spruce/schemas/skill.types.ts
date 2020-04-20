import * as SpruceSchema from '@sprucelabs/schema'
import Schema, { ISchemaDefinition } from '@sprucelabs/schema'

/**
import skillDefinition from '../../src/schemas/skill.definition'
type SkillDefinition = typeof skillDefinition
*/

export interface ISkillDefinition extends ISchemaDefinition {
	id: 'skill',
	name: 'Skill',
	description: 'A stripped down skill for the cli',
	
	
	    fields: {
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: SpruceSchema.FieldType.Id,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Id. */
	            'apiKey': {
	                label: 'Id',
	                type: SpruceSchema.FieldType.Id,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Name. */
	            'name': {
	                label: 'Name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Slug. */
	            'slug': {
	                label: 'Slug',
	                type: SpruceSchema.FieldType.Text,
	                
	                
	                
	                
	                
	                
	                
	                options: undefined
	            },
	    }
}

export const skillDefinition : ISkillDefinition = {
	id: 'skill',
	name: 'Skill',
	description: 'A stripped down skill for the cli',
	
	
	    fields: {
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: SpruceSchema.FieldType.Id,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Id. */
	            'apiKey': {
	                label: 'Id',
	                type: SpruceSchema.FieldType.Id,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Name. */
	            'name': {
	                label: 'Name',
	                type: SpruceSchema.FieldType.Text,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Slug. */
	            'slug': {
	                label: 'Slug',
	                type: SpruceSchema.FieldType.Text,
	                
	                
	                
	                
	                
	                
	                
	                options: undefined
	            },
	    }
}

// A stripped down skill for the cli
export interface ISkill {
	
		/** Id. */
		'id': string
		/** Id. */
		'apiKey': string
		/** Name. */
		'name': string
		/** Slug. */
		'slug'?: string
}
export interface ISkillInstance extends Schema<ISkillDefinition> {}
