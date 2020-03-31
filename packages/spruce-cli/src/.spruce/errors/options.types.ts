import { IErrorOptionsInvalidCommand } from "./invalidCommand.types";
import { SpruceErrorOptions } from "@sprucelabs/error";
import {SchemaErrorOptions} from '@sprucelabs/schema'

export type ErrorOptions = IErrorOptionsInvalidCommand | SchemaErrorOptions | SpruceErrorOptions