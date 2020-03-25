import { ISpruceUtilities } from '@sprucelabs/spruce-skill-server'
import Example from 'server/services/Example'

/**
 * All utilities available in the app should be defined here.
 * In addition to the custom utilities defined below, skills kit
 * provides additional core services
 */
export interface ISkillUtilities extends ISpruceUtilities {
	//////////////////////////////////////////////////////////////////////
	// CUSTOM Services
	// When you create a new service place the definition here
	//////////////////////////////////////////////////////////////////////
	example: Example
}
