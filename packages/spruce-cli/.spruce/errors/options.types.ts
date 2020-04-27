// a mixin of all options for all the errors we can through
import { IBuildFailedErrorOptions } from "./buildFailed.types";
import { ICouldNotLoadCommandErrorOptions } from "./couldNotLoadCommand.types";
import { IFailedToImportErrorOptions } from "./failedToImport.types";
import { IGenericErrorOptions } from "./generic.types";
import { ICreateAutoloaderFailedErrorOptions } from "./createAutoloaderFailed.types";
import { IDefinitionFailedToImportErrorOptions } from "./definitionFailedToImport.types";
import { IInvalidCommandErrorOptions } from "./invalidCommand.types";
import { IGenericMercuryErrorOptions } from "./genericMercury.types";
import { INotImplementedErrorOptions } from "./notImplemented.types";
import { ITranspileFailedErrorOptions } from "./transpileFailed.types";
import { IValueTypeServiceStageErrorErrorOptions } from "./valueTypeServiceStageError.types";
import { IUserNotFoundErrorOptions } from "./userNotFound.types";
import { IValueTypeServiceErrorErrorOptions } from "./valueTypeServiceError.types";
import { IReservedKeywordErrorOptions } from "./reservedKeyword.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IBuildFailedErrorOptions | ICouldNotLoadCommandErrorOptions | IFailedToImportErrorOptions | IGenericErrorOptions | ICreateAutoloaderFailedErrorOptions | IDefinitionFailedToImportErrorOptions | IInvalidCommandErrorOptions | IGenericMercuryErrorOptions | INotImplementedErrorOptions | ITranspileFailedErrorOptions | IValueTypeServiceStageErrorErrorOptions | IUserNotFoundErrorOptions | IValueTypeServiceErrorErrorOptions | IReservedKeywordErrorOptions