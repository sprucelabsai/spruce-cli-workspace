import {
	ISpruceAuthJob,
	ISpruceAuthGroup,
	ISpruceAuthUserLocation,
	ISpruceAuthOrganization,
	ISpruceAuthLocation,
	ISpruceAuthUser,
	ISpruceAuth
} from '@sprucelabs/spruce-skill-server'

/**
 * For all GQL requests and event listeners, there will be an `auth` property on the
 * context. This can be filled by the Authorization header or x-skill-api-key and
 * x-skill-id in the case of events.
 *
 * When the proper headers are set, the GQL inside of `./config/auth.ts` is executed.
 * Make sure the interfaces below match your GQL so you can get type checking
 */

export interface ISkillAuthJob extends ISpruceAuthJob {
	// id: string //EXAMPLE; if you wanted to get the JobId on `ctx.auth`, uncomment this and add the id field the gql in `./config/auth.ts`
}
export interface ISkillAuthGroup extends ISpruceAuthGroup {}
export interface ISkillAuthUserLocation
	extends ISpruceAuthUserLocation<ISkillAuthJob> {}
export interface ISkillAuthOrganization extends ISpruceAuthOrganization {}
export interface ISkillAuthLocation extends ISpruceAuthLocation {}
export interface ISkillAuthUser
	extends ISpruceAuthUser<ISkillAuthUserLocation, ISkillAuthGroup> {}
export interface ISkillAuth
	extends ISpruceAuth<
		ISkillAuthUser,
		ISkillAuthOrganization,
		ISkillAuthLocation
	> {}
