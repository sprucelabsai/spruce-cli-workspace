// the options for the Generic error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import genericDefinition from '../../errors/generic.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type GenericDefinition = typeof genericDefinition
export interface IGenericDefinition extends GenericDefinition {}

export interface IGenericErrorOptions extends SchemaDefinitionValues<IGenericDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * coming soon */
	code: ErrorCode.Generic
} 

