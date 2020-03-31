import { ISpruceErrorOptions, SpruceErrorOptions } from '@sprucelabs/error'
import { SchemaErrorOptions } from '@sprucelabs/schema'

/** all the error codes */
export enum CliErrorCode {
	/* invalid command comment*/
	InvalidCommand = 'INVALID_COMMAND',
	CouldNotLoadCommand = 'COULD_NOT_LOAD_COMMAND',
	GenericMercury = 'GENERIC_MERCURY',
	Generic = 'GENERIC',
	UserNotFound = 'USER_NOT_FOUND',
	NotImplemented = 'NOT_IMPLEMENTED'
}

/** all errors */
export type CliErrorOptions =
	| ICliErrorOptionsInvalidCommand
	| ICliErrorOptionsCouldNotLoadCommand
	| ICliErrorOptionsGenericMercury
	| ICliErrorOptionsGeneric
	| ICliErrorOptionsUserNotFound
	| ICliErrorNotImplemented
	| SchemaErrorOptions
	| SpruceErrorOptions

export interface ICliErrorOptionsInvalidCommand
	extends ISpruceErrorOptions<CliErrorCode> {
	/** * CliErrorCode.InvalidCommand: invalid command */
	code: CliErrorCode.InvalidCommand
	// the args that were passed to the program
	args: string[]
}

export interface ICliErrorOptionsCouldNotLoadCommand
	extends ISpruceErrorOptions<CliErrorCode> {
	/** * command could not load, probably syntax related */
	code: CliErrorCode.CouldNotLoadCommand
	// the file we tried to load
	file: string
}

export interface ICliErrorOptionsGenericMercury
	extends ISpruceErrorOptions<CliErrorCode> {
	/** * generic mercury error */
	code: CliErrorCode.GenericMercury
	// the file we tried to load
	eventName: string
	payload?: Record<string, any>
}

export interface ICliErrorOptionsGeneric
	extends ISpruceErrorOptions<CliErrorCode> {
	/** * a generic error */
	code: CliErrorCode.Generic
}

export interface ICliErrorOptionsUserNotFound
	extends ISpruceErrorOptions<CliErrorCode> {
	/** * a user was not found by id or token */
	code: CliErrorCode.UserNotFound
	userId?: string
	token?: string
}

export interface ICliErrorNotImplemented
	extends ISpruceErrorOptions<CliErrorCode> {
	/** * a command is not yet implemented */
	code: CliErrorCode.NotImplemented
	command: string
	args?: any[]
}
