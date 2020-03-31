// a mixin of all options for all the errors we can through
import { IInvalidParamsErrorOptions } from "./invalidParams.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

export type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IInvalidParamsErrorOptions