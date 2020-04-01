// the options for the NotImplemented error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import notImplementedDefinition from '../../errors/notImplemented.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type NotImplementedDefinition = typeof notImplementedDefinition
export interface INotImplementedDefinition extends NotImplementedDefinition {}

export interface INotImplementedErrorOptions extends SchemaDefinitionValues<INotImplementedDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * This command has not yet been implemented  */
	code: ErrorCode.NotImplemented
} 

