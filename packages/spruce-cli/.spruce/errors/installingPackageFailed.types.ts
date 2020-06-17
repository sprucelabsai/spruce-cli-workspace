// the options for the InstallingPackageFailed error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import installingPackageFailedDefinition from '../../src/errors/installingPackageFailed.build'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import ErrorCode from './codes.types'

type InstallingPackageFailedDefinition = typeof installingPackageFailedDefinition
export interface IInstallingPackageFailedDefinition extends InstallingPackageFailedDefinition {}

export interface IInstallingPackageFailedErrorOptions extends SchemaDefinitionValues<IInstallingPackageFailedDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * .InstallingPackageFailed - The package you tried to install couldn\'t be installed. */
	code: ErrorCode.InstallingPackageFailed
} 

