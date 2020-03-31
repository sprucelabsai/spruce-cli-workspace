// a mixin of all options for all the errors we can through
import { ICouldNotLoadCommandErrorOptions } from "./couldNotLoadCommand.types";
import { IInvalidCommandErrorOptions } from "./invalidCommand.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | ICouldNotLoadCommandErrorOptions | IInvalidCommandErrorOptions