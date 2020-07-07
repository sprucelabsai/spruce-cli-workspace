// the options for the CreateAutoloaderFailed error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import createAutoloaderFailedDefinition from '../../errors/createAutoloaderFailed.builder'
import ErrorCode from './errorCode'

type CreateAutoloaderFailedDefinition = typeof createAutoloaderFailedDefinition
export interface ICreateAutoloaderFailedDefinition
	extends CreateAutoloaderFailedDefinition {}

export interface ICreateAutoloaderFailedErrorOptions
	extends SchemaDefinitionValues<ICreateAutoloaderFailedDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .CreateAutoloaderFailed - Autoloader creation failed */
	code: ErrorCode.CreateAutoloaderFailed
}
