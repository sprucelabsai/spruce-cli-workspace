// the options for the UserNotFound error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import userNotFoundDefinition from '../../src/errors/userNotFound.builder'
import ErrorCode from './errorCode'

type UserNotFoundDefinition = typeof userNotFoundDefinition
export interface IUserNotFoundDefinition extends UserNotFoundDefinition {}

export interface IUserNotFoundErrorOptions
	extends SchemaDefinitionValues<IUserNotFoundDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .UserNotFound - Could not find a user */
	code: ErrorCode.UserNotFound
}
