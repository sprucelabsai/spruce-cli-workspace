import { ISpruceErrorOptions, SpruceErrorOptions } from '@sprucelabs/error'

export * from '@sprucelabs/error'

/** all the error codes */
export enum CliErrorCode {
	InvalidCommand = 'INVALID_COMMAND',
	CouldNotLoadCommand = 'COULD_NOT_LOAD_COMMAND',
	GenericMercury = 'GENERIC_MERCURY',
	Generic = 'GENERIC',
	UserNotFound = 'USER_NOT_FOUND'
}

/** all errors */
export type CliErrorOptions =
	| ICliErrorOptionsInvalidCommand
	| ICliErrorOptionsCouldNotLoadCommand
	| ICliErrorOptionsGenericMercury
	| ICliErrorOptionsGeneric
	| ICliErrorOptionsUserNotFound
	| SpruceErrorOptions

/** invalid command */
export interface ICliErrorOptionsInvalidCommand
	extends ISpruceErrorOptions<CliErrorCode> {
	code: CliErrorCode.InvalidCommand
	// the args that were passed to the program
	args: string[]
}

/** command could not load, probably syntax related */
export interface ICliErrorOptionsCouldNotLoadCommand
	extends ISpruceErrorOptions<CliErrorCode> {
	code: CliErrorCode.CouldNotLoadCommand
	// the file we tried to load
	file: string
}

/** generic mercury error */
export interface ICliErrorOptionsGenericMercury
	extends ISpruceErrorOptions<CliErrorCode> {
	code: CliErrorCode.GenericMercury
	// the file we tried to load
	eventName: string
	payload?: Record<string, any>
}

export interface ICliErrorOptionsGeneric
	extends ISpruceErrorOptions<CliErrorCode> {
	code: CliErrorCode.Generic
}

export interface ICliErrorOptionsUserNotFound
	extends ISpruceErrorOptions<CliErrorCode> {
	code: CliErrorCode.UserNotFound
	userId?: string
	token?: string
}
