// the options for the CreateAutoloaderFailed error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import createAutoloaderFailedDefinition from '../../src/errors/createAutoloaderFailed.definition'
import { ErrorCode } from './codes.types'

type CreateAutoloaderFailedDefinition = typeof createAutoloaderFailedDefinition
export interface ICreateAutoloaderFailedDefinition
	extends CreateAutoloaderFailedDefinition {}

export interface ICreateAutoloaderFailedErrorOptions
	extends SchemaDefinitionValues<ICreateAutoloaderFailedDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .CreateAutoloaderFailed - Autoloader creation failed */
	code: ErrorCode.CreateAutoloaderFailed
}
