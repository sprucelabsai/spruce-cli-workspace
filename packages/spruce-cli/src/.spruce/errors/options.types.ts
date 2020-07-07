// a mixin of all options for all the errors we can through
import { ICouldNotLoadCommandErrorOptions } from "./couldNotLoadCommand.types";
import { IBuildFailedErrorOptions } from "./buildFailed.types";
import { IDefinitionFailedToImportErrorOptions } from "./definitionFailedToImport.types";
import { ICreateAutoloaderFailedErrorOptions } from "./createAutoloaderFailed.types";
import { ICommandNotImplementedErrorOptions } from "./commandNotImplemented.types";
import { IDirectoryEmptyErrorOptions } from "./directoryEmpty.types";
import { IGenericErrorOptions } from "./generic.types";
import { IFileExistsErrorOptions } from "./fileExists.types";
import { IExecutingCommandFailedErrorOptions } from "./executingCommandFailed.types";
import { IFailedToImportErrorOptions } from "./failedToImport.types";
import { IInvalidCommandErrorOptions } from "./invalidCommand.types";
import { IKeyExistsErrorOptions } from "./keyExists.types";
import { ILintFailedErrorOptions } from "./lintFailed.types";
import { IGenericMercuryErrorOptions } from "./genericMercury.types";
import { INotImplementedErrorOptions } from "./notImplemented.types";
import { ITranspileFailedErrorOptions } from "./transpileFailed.types";
import { IValueTypeServiceStageErrorErrorOptions } from "./valueTypeServiceStageError.types";
import { IValueTypeServiceErrorErrorOptions } from "./valueTypeServiceError.types";
import { IUserNotFoundErrorOptions } from "./userNotFound.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'
import { IDirectoryNotFoundErrorOptions } from "./directoryNotFound.types";

type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | ICouldNotLoadCommandErrorOptions | IBuildFailedErrorOptions | IDefinitionFailedToImportErrorOptions | ICreateAutoloaderFailedErrorOptions | ICommandNotImplementedErrorOptions | IDirectoryEmptyErrorOptions | IGenericErrorOptions | IFileExistsErrorOptions | IExecutingCommandFailedErrorOptions | IFailedToImportErrorOptions | IInvalidCommandErrorOptions | IKeyExistsErrorOptions | ILintFailedErrorOptions | IGenericMercuryErrorOptions | INotImplementedErrorOptions | ITranspileFailedErrorOptions | IValueTypeServiceStageErrorErrorOptions | IValueTypeServiceErrorErrorOptions | IUserNotFoundErrorOptions | IDirectoryNotFoundErrorOptions

export default ErrorOptions
