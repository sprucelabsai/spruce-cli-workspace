// the options for the KeyExists error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import keyExistsDefinition from '../../src/errors/keyExists.builder'
import ErrorCode from './codes.types'

type KeyExistsDefinition = typeof keyExistsDefinition
export interface IKeyExistsDefinition extends KeyExistsDefinition {}

export interface IKeyExistsErrorOptions
	extends SchemaDefinitionValues<IKeyExistsDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .KeyExists - The key in the object already exists */
	code: ErrorCode.KeyExists
}
