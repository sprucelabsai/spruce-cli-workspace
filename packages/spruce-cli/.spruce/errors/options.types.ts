// a mixin of all options for all the errors we can through
import { IDefinitionFailedToImportErrorOptions } from "./definitionFailedToImport.types";
import { IDirectoryEmptyErrorOptions } from "./directoryEmpty.types";
import { IFailedToImportErrorOptions } from "./failedToImport.types";
import { ICouldNotLoadCommandErrorOptions } from "./couldNotLoadCommand.types";
import { IFileExistsErrorOptions } from "./fileExists.types";
import { IGenericErrorOptions } from "./generic.types";
import { IGenericMercuryErrorOptions } from "./genericMercury.types";
import { ICreateAutoloaderFailedErrorOptions } from "./createAutoloaderFailed.types";
import { IInvalidCommandErrorOptions } from "./invalidCommand.types";
import { IBuildFailedErrorOptions } from "./buildFailed.types";
import { IKeyExistsErrorOptions } from "./keyExists.types";
import { INotImplementedErrorOptions } from "./notImplemented.types";
import { IReservedKeywordErrorOptions } from "./reservedKeyword.types";
import { ITranspileFailedErrorOptions } from "./transpileFailed.types";
import { IUserNotFoundErrorOptions } from "./userNotFound.types";
import { IValueTypeServiceErrorErrorOptions } from "./valueTypeServiceError.types";
import { IValueTypeServiceStageErrorErrorOptions } from "./valueTypeServiceStageError.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IDefinitionFailedToImportErrorOptions | IDirectoryEmptyErrorOptions | IFailedToImportErrorOptions | ICouldNotLoadCommandErrorOptions | IFileExistsErrorOptions | IGenericErrorOptions | IGenericMercuryErrorOptions | ICreateAutoloaderFailedErrorOptions | IInvalidCommandErrorOptions | IBuildFailedErrorOptions | IKeyExistsErrorOptions | INotImplementedErrorOptions | IReservedKeywordErrorOptions | ITranspileFailedErrorOptions | IUserNotFoundErrorOptions | IValueTypeServiceErrorErrorOptions | IValueTypeServiceStageErrorErrorOptions