// the options for the ReservedKeyword error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import reservedKeywordDefinition from '../../src/__tests__/reservedKeyword.builder'
import ErrorCode from './errorCode'

type ReservedKeywordDefinition = typeof reservedKeywordDefinition
export interface IReservedKeywordDefinition extends ReservedKeywordDefinition {}

export interface IReservedKeywordErrorOptions
	extends SchemaDefinitionValues<IReservedKeywordDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .ReservedKeyword - A reserved js keyword was used */
	code: ErrorCode.ReservedKeyword
}
