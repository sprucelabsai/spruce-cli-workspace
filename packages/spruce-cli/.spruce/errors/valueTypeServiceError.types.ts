// the options for the ValueTypeServiceError error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import valueTypeServiceErrorDefinition from '../../src/errors/valueTypeServiceError.builder'
import ErrorCode from './codes.types'

type ValueTypeServiceErrorDefinition = typeof valueTypeServiceErrorDefinition
export interface IValueTypeServiceErrorDefinition
	extends ValueTypeServiceErrorDefinition {}

export interface IValueTypeServiceErrorErrorOptions
	extends SchemaDefinitionValues<IValueTypeServiceErrorDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .ValueTypeServiceError - An error when generating value types for template insertion  */
	code: ErrorCode.ValueTypeServiceError
}
