// a mixin of all options for all the errors we can through
import { ICouldNotLoadCommandErrorOptions } from "./couldNotLoadCommand.types";
import { IDefinitionFailedToImportErrorOptions } from "./definitionFailedToImport.types";
import { IGenericErrorOptions } from "./generic.types";
import { IGenericMercuryErrorOptions } from "./genericMercury.types";
import { IInvalidCommandErrorOptions } from "./invalidCommand.types";
import { INotImplementedErrorOptions } from "./notImplemented.types";
import { ITranspileFailedErrorOptions } from "./transpileFailed.types";
import { IUserNotFoundErrorOptions } from "./userNotFound.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | ICouldNotLoadCommandErrorOptions | IDefinitionFailedToImportErrorOptions | IGenericErrorOptions | IGenericMercuryErrorOptions | IInvalidCommandErrorOptions | INotImplementedErrorOptions | ITranspileFailedErrorOptions | IUserNotFoundErrorOptions