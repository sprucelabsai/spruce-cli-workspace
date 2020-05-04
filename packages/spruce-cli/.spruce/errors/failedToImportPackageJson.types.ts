// the options for the FailedToImportPackageJson error

import { SchemaDefinitionValues } from '@sprucelabs/schema'

import failedToImportPackageJsonDefinition from '../../src/errors/failedToImportPackageJson.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type FailedToImportPackageJsonDefinition = typeof failedToImportPackageJsonDefinition
export interface IFailedToImportPackageJsonDefinition
	extends FailedToImportPackageJsonDefinition {}

export interface IFailedToImportPackageJsonErrorOptions
	extends SchemaDefinitionValues<IFailedToImportPackageJsonDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .FailedToImportPackageJson - Something went wrong with the package.json file */
	code: ErrorCode.FailedToImportPackageJson
}
