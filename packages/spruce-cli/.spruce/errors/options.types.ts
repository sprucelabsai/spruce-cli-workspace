// a mixin of all options for all the errors we can through
import { IBuildFailedErrorOptions } from "./buildFailed.types";
import { ICreateAutoloaderFailedErrorOptions } from "./createAutoloaderFailed.types";
import { ICouldNotLoadCommandErrorOptions } from "./couldNotLoadCommand.types";
import { IFailedToImportErrorOptions } from "./failedToImport.types";
import { IDefinitionFailedToImportErrorOptions } from "./definitionFailedToImport.types";
import { IGenericErrorOptions } from "./generic.types";
import { INotImplementedErrorOptions } from "./notImplemented.types";
import { IInvalidCommandErrorOptions } from "./invalidCommand.types";
import { IGenericMercuryErrorOptions } from "./genericMercury.types";
import { IReservedKeywordErrorOptions } from "./reservedKeyword.types";
import { ITranspileFailedErrorOptions } from "./transpileFailed.types";
import { IUserNotFoundErrorOptions } from "./userNotFound.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IBuildFailedErrorOptions | ICreateAutoloaderFailedErrorOptions | ICouldNotLoadCommandErrorOptions | IFailedToImportErrorOptions | IDefinitionFailedToImportErrorOptions | IGenericErrorOptions | INotImplementedErrorOptions | IInvalidCommandErrorOptions | IGenericMercuryErrorOptions | IReservedKeywordErrorOptions | ITranspileFailedErrorOptions | IUserNotFoundErrorOptions