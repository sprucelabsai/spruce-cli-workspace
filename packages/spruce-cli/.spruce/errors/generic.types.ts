// the options for the Generic error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import genericDefinition from '../../src/errors/generic.definition'
import { ErrorCode } from './codes.types'

type GenericDefinition = typeof genericDefinition
export interface IGenericDefinition extends GenericDefinition {}

export interface IGenericErrorOptions
	extends SchemaDefinitionValues<IGenericDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .Generic - When you\'re too lazy to make a new error */
	code: ErrorCode.Generic
}
