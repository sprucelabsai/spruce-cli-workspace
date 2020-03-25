import { ISpruceServices } from '@sprucelabs/spruce-skill-server'
import Example from 'server/services/Example'

/**
 * All services available in the app should be defined here.
 * In addition to the custom services defined below, skills kit
 * provides additional core services
 */
export interface ISkillServices extends ISpruceServices {
	//////////////////////////////////////////////////////////////////////
	// CUSTOM Services
	// When you create a new service place the definition here
	//////////////////////////////////////////////////////////////////////
	example: Example
}
