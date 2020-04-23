// a mixin of all options for all the errors we can through
import { IDefinitionFailedToImportErrorOptions } from "./definitionFailedToImport.types";
import { IFailedToImportErrorOptions } from "./failedToImport.types";
import { ICreateAutoloaderFailedErrorOptions } from "./createAutoloaderFailed.types";
import { IGenericMercuryErrorOptions } from "./genericMercury.types";
import { IInvalidCommandErrorOptions } from "./invalidCommand.types";
import { ITranspileFailedErrorOptions } from "./transpileFailed.types";
import { ICouldNotLoadCommandErrorOptions } from "./couldNotLoadCommand.types";
import { IBuildFailedErrorOptions } from "./buildFailed.types";
import { IGenericErrorOptions } from "./generic.types";
import { IReservedKeywordErrorOptions } from "./reservedKeyword.types";
import { INotImplementedErrorOptions } from "./notImplemented.types";
import { IUserNotFoundErrorOptions } from "./userNotFound.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IDefinitionFailedToImportErrorOptions | IFailedToImportErrorOptions | ICreateAutoloaderFailedErrorOptions | IGenericMercuryErrorOptions | IInvalidCommandErrorOptions | ITranspileFailedErrorOptions | ICouldNotLoadCommandErrorOptions | IBuildFailedErrorOptions | IGenericErrorOptions | IReservedKeywordErrorOptions | INotImplementedErrorOptions | IUserNotFoundErrorOptions