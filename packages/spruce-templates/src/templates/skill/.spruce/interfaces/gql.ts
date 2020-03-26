import { ISpruceGQLTypes } from '@sprucelabs/spruce-skill-server'
import Example from '../gql/types/ModelExample'

/**
 * You should define your GQL model types (or other custom types) below
 */
export interface ISkillGQLTypes extends ISpruceGQLTypes {
	//////////////////////////////////////////////////////////////////////
	// CUSTOM Services
	// When you create a new service place the definition here
	//////////////////////////////////////////////////////////////////////
	Example: ReturnType<typeof Example>
}
