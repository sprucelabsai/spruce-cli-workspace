import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import userDefinition from '../../errors/invalidCommand.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'


export interface IErrorOptionsInvalidCommand extends SchemaDefinitionValues<typeof userDefinition>, ISpruceErrorOptions<ErrorCode> {} 