// the options for the InvalidParams error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import invalidParamsDefinition from '../../errors/invalidParams.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type InvalidParamsDefinition = typeof invalidParamsDefinition
export interface IInvalidParamsDefinition extends InvalidParamsDefinition {}

export interface IInvalidParamsErrorOptions extends SchemaDefinitionValues<IInvalidParamsDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * coming soon */
	code: ErrorCode.InvalidParams
} 

