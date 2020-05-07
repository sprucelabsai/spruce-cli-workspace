// a mixin of all options for all the errors we can through
import { IBuildFailedErrorOptions } from "./buildFailed.types";
import { ICouldNotLoadCommandErrorOptions } from "./couldNotLoadCommand.types";
import { IDefinitionFailedToImportErrorOptions } from "./definitionFailedToImport.types";
import { ICreateAutoloaderFailedErrorOptions } from "./createAutoloaderFailed.types";
import { IDirectoryEmptyErrorOptions } from "./directoryEmpty.types";
import { IFailedToImportErrorOptions } from "./failedToImport.types";
import { IFileExistsErrorOptions } from "./fileExists.types";
import { IGenericErrorOptions } from "./generic.types";
import { IInvalidCommandErrorOptions } from "./invalidCommand.types";
import { IKeyExistsErrorOptions } from "./keyExists.types";
import { IGenericMercuryErrorOptions } from "./genericMercury.types";
import { IReservedKeywordErrorOptions } from "./reservedKeyword.types";
import { INotImplementedErrorOptions } from "./notImplemented.types";
import { ITranspileFailedErrorOptions } from "./transpileFailed.types";
import { IUserNotFoundErrorOptions } from "./userNotFound.types";
import { IValueTypeServiceStageErrorErrorOptions } from "./valueTypeServiceStageError.types";
import { IValueTypeServiceErrorErrorOptions } from "./valueTypeServiceError.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IBuildFailedErrorOptions | ICouldNotLoadCommandErrorOptions | IDefinitionFailedToImportErrorOptions | ICreateAutoloaderFailedErrorOptions | IDirectoryEmptyErrorOptions | IFailedToImportErrorOptions | IFileExistsErrorOptions | IGenericErrorOptions | IInvalidCommandErrorOptions | IKeyExistsErrorOptions | IGenericMercuryErrorOptions | IReservedKeywordErrorOptions | INotImplementedErrorOptions | ITranspileFailedErrorOptions | IUserNotFoundErrorOptions | IValueTypeServiceStageErrorErrorOptions | IValueTypeServiceErrorErrorOptions