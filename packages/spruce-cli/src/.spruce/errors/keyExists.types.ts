// the options for the KeyExists error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import keyExistsDefinition from '../../errors/keyExists.builder'
import ErrorCode from './errorCode'

type KeyExistsDefinition = typeof keyExistsDefinition
export interface IKeyExistsDefinition extends KeyExistsDefinition {}

export interface IKeyExistsErrorOptions
	extends SchemaDefinitionValues<IKeyExistsDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .KeyExists - The key in the object already exists */
	code: ErrorCode.KeyExists
}
