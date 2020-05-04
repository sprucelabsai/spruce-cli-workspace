// the options for the ReservedKeyword error

import { SchemaDefinitionValues } from '@sprucelabs/schema'

import reservedKeywordDefinition from '../../src/errors/reservedKeyword.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type ReservedKeywordDefinition = typeof reservedKeywordDefinition
export interface IReservedKeywordDefinition extends ReservedKeywordDefinition {}

export interface IReservedKeywordErrorOptions
	extends SchemaDefinitionValues<IReservedKeywordDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .ReservedKeyword - A reserved js keyword was used */
	code: ErrorCode.ReservedKeyword
}
