// the options for the MappingError error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import mappingErrorDefinition from '../../src/errors/mappingError.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type MappingErrorDefinition = typeof mappingErrorDefinition
export interface IMappingErrorDefinition extends MappingErrorDefinition {}

export interface IMappingErrorErrorOptions extends SchemaDefinitionValues<IMappingErrorDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * .MappingError - Some type of mapping failed */
	code: ErrorCode.MappingError
} 

