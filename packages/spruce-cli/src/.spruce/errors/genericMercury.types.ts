// the options for the GenericMercury error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import genericMercuryDefinition from '../../errors/genericMercury.builder'
import ErrorCode from './errorCode'

type GenericMercuryDefinition = typeof genericMercuryDefinition
export interface IGenericMercuryDefinition extends GenericMercuryDefinition {}

export interface IGenericMercuryErrorOptions
	extends SchemaDefinitionValues<IGenericMercuryDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .GenericMercury - Not sure what happened, but it has something to do with Mercury */
	code: ErrorCode.GenericMercury
}
