// the options for the GenericMercury error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import genericMercuryDefinition from '../../src/errors/genericMercury.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type GenericMercuryDefinition = typeof genericMercuryDefinition
export interface IGenericMercuryDefinition extends GenericMercuryDefinition {}

export interface IGenericMercuryErrorOptions extends SchemaDefinitionValues<IGenericMercuryDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * .GenericMercury - Not sure what happened, but it has something to do with Mercury */
	code: ErrorCode.GenericMercury
} 

