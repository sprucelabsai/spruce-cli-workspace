// the options for the NotImplemented error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import notImplementedDefinition from '../../src/errors/notImplemented.definition'
import { ErrorCode } from './codes.types'

type NotImplementedDefinition = typeof notImplementedDefinition
export interface INotImplementedDefinition extends NotImplementedDefinition {}

export interface INotImplementedErrorOptions
	extends SchemaDefinitionValues<INotImplementedDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .NotImplemented - This feature has not been implemented */
	code: ErrorCode.NotImplemented
}
