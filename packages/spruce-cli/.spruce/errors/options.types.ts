// a mixin of all options for all the errors we can through
import { IBuildFailedErrorOptions } from "./buildFailed.types";
import { ICouldNotLoadCommandErrorOptions } from "./couldNotLoadCommand.types";
import { IDefinitionFailedToImportErrorOptions } from "./definitionFailedToImport.types";
import { ITranspileFailedErrorOptions } from "./transpileFailed.types";
import { IFailedToImportErrorOptions } from "./failedToImport.types";
<<<<<<< HEAD
import { IGenericErrorOptions } from "./generic.types";
import { ICreateAutoloaderFailedErrorOptions } from "./createAutoloaderFailed.types";
import { IGenericMercuryErrorOptions } from "./genericMercury.types";
=======
>>>>>>> taylor/vm-path-resolution
import { IInvalidCommandErrorOptions } from "./invalidCommand.types";
import { INotImplementedErrorOptions } from "./notImplemented.types";
import { IGenericMercuryErrorOptions } from "./genericMercury.types";
import { IGenericErrorOptions } from "./generic.types";
import { IUserNotFoundErrorOptions } from "./userNotFound.types";
import { IReservedKeywordErrorOptions } from "./reservedKeyword.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

<<<<<<< HEAD
export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IBuildFailedErrorOptions | ICouldNotLoadCommandErrorOptions | IDefinitionFailedToImportErrorOptions | IFailedToImportErrorOptions | IGenericErrorOptions | ICreateAutoloaderFailedErrorOptions | IGenericMercuryErrorOptions | IInvalidCommandErrorOptions | INotImplementedErrorOptions | IReservedKeywordErrorOptions | ITranspileFailedErrorOptions | IUserNotFoundErrorOptions
=======
export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IBuildFailedErrorOptions | ICouldNotLoadCommandErrorOptions | ICreateAutoloaderFailedErrorOptions | IDefinitionFailedToImportErrorOptions | ITranspileFailedErrorOptions | IFailedToImportErrorOptions | IInvalidCommandErrorOptions | INotImplementedErrorOptions | IGenericMercuryErrorOptions | IGenericErrorOptions | IUserNotFoundErrorOptions | IReservedKeywordErrorOptions
>>>>>>> taylor/vm-path-resolution
