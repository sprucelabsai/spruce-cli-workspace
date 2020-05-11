import * as Router from 'koa-router'
import { ISpruceContext } from '@sprucelabs/spruce-skill-server'
import { ISkillModels } from './models'
import { ISkillAuth } from './auth'
import { ISkillServices } from './services'
import { ISkillUtilities } from './utilities'
import { ISkillGQLTypes } from './gql'
import { ISpruceEventV1, ISpruceEventV2 } from '@sprucelabs/spruce-types'

export interface ISkillContext
	extends ISpruceContext<
		ISkillModels,
		ISkillAuth,
		ISkillServices,
		ISkillUtilities,
		ISkillGQLTypes
	> {}

export interface ISkillRouter extends Router<{}, ISkillContext> {}

/** The context for event handlers when EVENT_VERSION=1 */
export interface ISkillEventContextV1<IPayload, IBody> extends ISkillContext {
	event: ISpruceEventV1<IPayload>
	body: IBody
}

/** The context for event handlers when EVENT_VERSION=2 */
export interface ISkillEventContextV2<IPayload, IBody> extends ISkillContext {
	event: ISpruceEventV2<IPayload>
	body: IBody
}
