import { ISpruceModels } from '@sprucelabs/spruce-skill-server'
import { Example } from 'server/models/Example'

/**
 * All models available in the app should be defined here.
 * In addition to the custom models defined below, skills kit
 * db provides additional core models
 */
export interface ISkillModels extends ISpruceModels {
	//////////////////////////////////////////////////////////////////////
	// CUSTOM MODELS
	// When you create a new model place the definition here
	//////////////////////////////////////////////////////////////////////
	Example: typeof Example
}
