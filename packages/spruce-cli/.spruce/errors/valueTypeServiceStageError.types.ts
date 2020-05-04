// the options for the ValueTypeServiceStageError error

import { SchemaDefinitionValues } from '@sprucelabs/schema'

import valueTypeServiceStageErrorDefinition from '../../src/errors/valueTypeServiceStageError.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type ValueTypeServiceStageErrorDefinition = typeof valueTypeServiceStageErrorDefinition
export interface IValueTypeServiceStageErrorDefinition
	extends ValueTypeServiceStageErrorDefinition {}

export interface IValueTypeServiceStageErrorErrorOptions
	extends SchemaDefinitionValues<IValueTypeServiceStageErrorDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .ValueTypeServiceStageError - When collecting value types for all fields, something went wrong */
	code: ErrorCode.ValueTypeServiceStageError
}
