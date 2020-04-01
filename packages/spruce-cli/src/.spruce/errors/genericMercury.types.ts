// the options for the GenericMercury error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import genericMercuryDefinition from '../../errors/genericMercury.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type GenericMercuryDefinition = typeof genericMercuryDefinition
export interface IGenericMercuryDefinition extends GenericMercuryDefinition {}

export interface IGenericMercuryErrorOptions extends SchemaDefinitionValues<IGenericMercuryDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * coming soon */
	code: ErrorCode.GenericMercury
} 

