// a mixin of all options for all the errors we can through
import { IBuildFailedErrorOptions } from "./buildFailed.types";
import { ICommandNotImplementedErrorOptions } from "./commandNotImplemented.types";
import { ICouldNotLoadCommandErrorOptions } from "./couldNotLoadCommand.types";
import { ICreateAutoloaderFailedErrorOptions } from "./createAutoloaderFailed.types";
import { IDefinitionFailedToImportErrorOptions } from "./definitionFailedToImport.types";
import { IDirectoryEmptyErrorOptions } from "./directoryEmpty.types";
import { IFailedToImportErrorOptions } from "./failedToImport.types";
import { IFileExistsErrorOptions } from "./fileExists.types";
import { IGenericErrorOptions } from "./generic.types";
import { IGenericMercuryErrorOptions } from "./genericMercury.types";
import { IInvalidCommandErrorOptions } from "./invalidCommand.types";
import { IKeyExistsErrorOptions } from "./keyExists.types";
import { ILintFailedErrorOptions } from "./lintFailed.types";
import { IUserNotFoundErrorOptions } from "./userNotFound.types";
import { IReservedKeywordErrorOptions } from "./reservedKeyword.types";
import { INotImplementedErrorOptions } from "./notImplemented.types";
import { IValueTypeServiceErrorErrorOptions } from "./valueTypeServiceError.types";
import { IValueTypeServiceStageErrorErrorOptions } from "./valueTypeServiceStageError.types";
import { ITranspileFailedErrorOptions } from "./transpileFailed.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IBuildFailedErrorOptions | ICommandNotImplementedErrorOptions | ICouldNotLoadCommandErrorOptions | ICreateAutoloaderFailedErrorOptions | IDefinitionFailedToImportErrorOptions | IDirectoryEmptyErrorOptions | IFailedToImportErrorOptions | IFileExistsErrorOptions | IGenericErrorOptions | IGenericMercuryErrorOptions | IInvalidCommandErrorOptions | IKeyExistsErrorOptions | ILintFailedErrorOptions | IUserNotFoundErrorOptions | IReservedKeywordErrorOptions | INotImplementedErrorOptions | IValueTypeServiceErrorErrorOptions | IValueTypeServiceStageErrorErrorOptions | ITranspileFailedErrorOptions
