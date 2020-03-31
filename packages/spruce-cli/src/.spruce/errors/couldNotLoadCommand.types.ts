// the options for the CouldNotLoadCommand error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import couldNotLoadCommandDefinition from '../../errors/couldNotLoadCommand.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type CouldNotLoadCommandDefinition = typeof couldNotLoadCommandDefinition
export interface ICouldNotLoadCommandDefinition extends CouldNotLoadCommandDefinition {}

export interface ICouldNotLoadCommandErrorOptions extends SchemaDefinitionValues<ICouldNotLoadCommandDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * coming soon */
	code: ErrorCode.CouldNotLoadCommand
} 

