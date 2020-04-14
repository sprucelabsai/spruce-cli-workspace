// a mixin of all options for all the errors we can through
import { IBuildFailedErrorOptions } from "./buildFailed.types";
import { ICouldNotLoadCommandErrorOptions } from "./couldNotLoadCommand.types";
import { IDefinitionFailedToImportErrorOptions } from "./definitionFailedToImport.types";
import { IFailedToImportErrorOptions } from "./failedToImport.types";
import { IGenericErrorOptions } from "./generic.types";
import { IGenericMercuryErrorOptions } from "./genericMercury.types";
import { IInvalidCommandErrorOptions } from "./invalidCommand.types";
import { INotImplementedErrorOptions } from "./notImplemented.types";
import { ITranspileFailedErrorOptions } from "./transpileFailed.types";
import { IUserNotFoundErrorOptions } from "./userNotFound.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IBuildFailedErrorOptions | ICouldNotLoadCommandErrorOptions | IDefinitionFailedToImportErrorOptions | IFailedToImportErrorOptions | IGenericErrorOptions | IGenericMercuryErrorOptions | IInvalidCommandErrorOptions | INotImplementedErrorOptions | ITranspileFailedErrorOptions | IUserNotFoundErrorOptions