// the options for the GenericMercuryError error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import genericMercuryErrorDefinition from '../../errors/genericMercuryError.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type GenericMercuryErrorDefinition = typeof genericMercuryErrorDefinition
export interface IGenericMercuryErrorDefinition extends GenericMercuryErrorDefinition {}

export interface IGenericMercuryErrorErrorOptions extends SchemaDefinitionValues<IGenericMercuryErrorDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * coming soon */
	code: ErrorCode.GenericMercuryError
} 

