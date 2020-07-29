/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

import { default as Schema } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'

import FieldType from '#spruce/schemas/fields/fieldTypeEnum'


export declare namespace SpruceErrors.Local {
	/** This command has not yet been implemented  */
	export interface ICommandNotImplemented {

		/** Command. the command being run! */
		'command': string
		/** Args. Arguments passed to the command */
		'args'?: string[] | undefined | null
	}

}

export declare namespace SpruceErrors.Local.CommandNotImplemented {
	/** The interface for the schema definition for a Command not implemented */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'commandNotImplemented',
		name: 'Command not implemented',
		description: 'This command has not yet been implemented ',
		fields: {
			/** Command. the command being run! */
			'command': {
				label: 'Command',
				type: FieldType.Text,
				isRequired: true,
				hint: 'the command being run!',
				options: undefined
			},
			/** Args. Arguments passed to the command */
			'args': {
				label: 'Args',
				type: FieldType.Text,
				hint: 'Arguments passed to the command',
				isArray: true,
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.CommandNotImplemented.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** A command failed to load, probably because of a syntax error */
	export interface ICouldNotLoadCommand {

		/** Command file path. Path to the file defining the Command class */
		'file': string
	}

}

export declare namespace SpruceErrors.Local.CouldNotLoadCommand {
	/** The interface for the schema definition for a Could not load command */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'couldNotLoadCommand',
		name: 'Could not load command',
		description: 'A command failed to load, probably because of a syntax error',
		fields: {
			/** Command file path. Path to the file defining the Command class */
			'file': {
				label: 'Command file path',
				type: FieldType.Text,
				isRequired: true,
				hint: 'Path to the file defining the Command class',
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.CouldNotLoadCommand.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** Error thrown when building or linting failed. Happens when a yarn command fails inside the package utility. */
	export interface IBuildFailed {

		/** File. File we wanted to build, if not set we wanted to build everything.. */
		'file'?: string | undefined | null
	}

}

export declare namespace SpruceErrors.Local.BuildFailed {
	/** The interface for the schema definition for a BuildFailed */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'buildFailed',
		name: 'BuildFailed',
		description: 'Error thrown when building or linting failed. Happens when a yarn command fails inside the package utility.',
		fields: {
			/** File. File we wanted to build, if not set we wanted to build everything.. */
			'file': {
				label: 'File',
				type: FieldType.Text,
				hint: 'File we wanted to build, if not set we wanted to build everything..',
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.BuildFailed.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** The directory is empty */
	export interface IDirectoryEmpty {

		/** Directory. The directory */
		'directory': string
	}

}

export declare namespace SpruceErrors.Local.DirectoryEmpty {
	/** The interface for the schema definition for a directoryEmpty */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'directoryEmpty',
		name: 'directoryEmpty',
		description: 'The directory is empty',
		fields: {
			/** Directory. The directory */
			'directory': {
				label: 'Directory',
				type: FieldType.Text,
				isRequired: true,
				hint: 'The directory',
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.DirectoryEmpty.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** Autoloader creation failed */
	export interface ICreateAutoloaderFailed {

		/** The globby pattern used to find files. Globby pattern */
		'globbyPattern': string
		/** The files that were loaded. The files that were loaded */
		'filePaths': string[]
		/** The suffix for classes to autoload. Class suffix */
		'suffix': string
		/** The directory we're trying to create the autoloader for. Directory to autoload */
		'directory': string
	}

}

export declare namespace SpruceErrors.Local.CreateAutoloaderFailed {
	/** The interface for the schema definition for a Could not create an autoloader */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'createAutoloaderFailed',
		name: 'Could not create an autoloader',
		description: 'Autoloader creation failed',
		fields: {
			/** The globby pattern used to find files. Globby pattern */
			'globbyPattern': {
				label: 'The globby pattern used to find files',
				type: FieldType.Text,
				isRequired: true,
				hint: 'Globby pattern',
				options: undefined
			},
			/** The files that were loaded. The files that were loaded */
			'filePaths': {
				label: 'The files that were loaded',
				type: FieldType.Text,
				isRequired: true,
				hint: 'The files that were loaded',
				isArray: true,
				options: undefined
			},
			/** The suffix for classes to autoload. Class suffix */
			'suffix': {
				label: 'The suffix for classes to autoload',
				type: FieldType.Text,
				isRequired: true,
				hint: 'Class suffix',
				options: undefined
			},
			/** The directory we're trying to create the autoloader for. Directory to autoload */
			'directory': {
				label: 'The directory we\'re trying to create the autoloader for',
				type: FieldType.Text,
				isRequired: true,
				hint: 'Directory to autoload',
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.CreateAutoloaderFailed.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** The directory you tried to find is not there! */
	export interface IDirectoryNotFound {

		/** directory. The directory we tried to access */
		'directory': string
	}

}

export declare namespace SpruceErrors.Local.DirectoryNotFound {
	/** The interface for the schema definition for a Directory not found */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'directoryNotFound',
		name: 'Directory not found',
		description: 'The directory you tried to find is not there!',
		fields: {
			/** directory. The directory we tried to access */
			'directory': {
				label: 'directory',
				type: FieldType.Text,
				isRequired: true,
				hint: 'The directory we tried to access',
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.DirectoryNotFound.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** The definition file failed to import */
	export interface IDefinitionFailedToImport {

		/** File. The file definition file I tried to import */
		'file': string
	}

}

export declare namespace SpruceErrors.Local.DefinitionFailedToImport {
	/** The interface for the schema definition for a Definition failed to import */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'definitionFailedToImport',
		name: 'Definition failed to import',
		description: 'The definition file failed to import',
		fields: {
			/** File. The file definition file I tried to import */
			'file': {
				label: 'File',
				type: FieldType.Text,
				isRequired: true,
				hint: 'The file definition file I tried to import',
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.DefinitionFailedToImport.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** Failed to import a file through VM */
	export interface IFailedToImport {

		/** File. The file I tried to import */
		'file': string
	}

}

export declare namespace SpruceErrors.Local.FailedToImport {
	/** The interface for the schema definition for a FailedToImport */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'failedToImport',
		name: 'FailedToImport',
		description: 'Failed to import a file through VM',
		fields: {
			/** File. The file I tried to import */
			'file': {
				label: 'File',
				type: FieldType.Text,
				isRequired: true,
				hint: 'The file I tried to import',
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.FailedToImport.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** The command that was being executed failed */
	export interface IExecutingCommandFailed {

		/** The command being run. */
		'cmd': string
		/** Args. */
		'args'?: string[] | undefined | null
		/** Cwd. */
		'cwd'?: string | undefined | null
	}

}

export declare namespace SpruceErrors.Local.ExecutingCommandFailed {
	/** The interface for the schema definition for a Executing command failed */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'executingCommandFailed',
		name: 'Executing command failed',
		description: 'The command that was being executed failed',
		fields: {
			/** The command being run. */
			'cmd': {
				label: 'The command being run',
				type: FieldType.Text,
				isRequired: true,
				options: undefined
			},
			/** Args. */
			'args': {
				label: 'Args',
				type: FieldType.Text,
				isArray: true,
				options: undefined
			},
			/** Cwd. */
			'cwd': {
				label: 'Cwd',
				type: FieldType.Text,
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.ExecutingCommandFailed.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** When you&#x27;re too lazy to make a new error */
	export interface IGeneric {

		/** Friendly message. */
		'friendlyMessageSet'?: string | undefined | null
	}

}

export declare namespace SpruceErrors.Local.Generic {
	/** The interface for the schema definition for a generic */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'generic',
		name: 'generic',
		description: 'When you\'re too lazy to make a new error',
		fields: {
			/** Friendly message. */
			'friendlyMessageSet': {
				label: 'Friendly message',
				type: FieldType.Text,
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.Generic.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** The command is not valid, try --help */
	export interface IInvalidCommand {

		/** args. */
		'args': string[]
	}

}

export declare namespace SpruceErrors.Local.InvalidCommand {
	/** The interface for the schema definition for a Invalid command */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'invalidCommand',
		name: 'Invalid command',
		description: 'The command is not valid, try --help',
		fields: {
			/** args. */
			'args': {
				label: 'args',
				type: FieldType.Text,
				isRequired: true,
				isArray: true,
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.InvalidCommand.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** The file already exists */
	export interface IFileExists {

		/** File. The file being created */
		'file': string
	}

}

export declare namespace SpruceErrors.Local.FileExists {
	/** The interface for the schema definition for a fileExists */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'fileExists',
		name: 'fileExists',
		description: 'The file already exists',
		fields: {
			/** File. The file being created */
			'file': {
				label: 'File',
				type: FieldType.Text,
				isRequired: true,
				hint: 'The file being created',
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.FileExists.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** When collecting value types for all fields, something went wrong */
	export interface IValueTypeServiceStageError {

		/** Stage. */
		'stage': string
	}

}

export declare namespace SpruceErrors.Local.ValueTypeServiceStageError {
	/** The interface for the schema definition for a Value type service stage error */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'valueTypeServiceStageError',
		name: 'Value type service stage error',
		description: 'When collecting value types for all fields, something went wrong',
		fields: {
			/** Stage. */
			'stage': {
				label: 'Stage',
				type: FieldType.Text,
				isRequired: true,
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.ValueTypeServiceStageError.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/**  */
	export interface IPayloadArgs {

		/** name. */
		'name'?: string | undefined | null
		/** value. */
		'value'?: string | undefined | null
	}

}

export declare namespace SpruceErrors.Local.PayloadArgs {
	/** The interface for the schema definition for a Payload args */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'payloadArgs',
		name: 'Payload args',
		fields: {
			/** name. */
			'name': {
				label: 'name',
				type: FieldType.Text,
				options: undefined
			},
			/** value. */
			'value': {
				label: 'value',
				type: FieldType.Text,
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.PayloadArgs.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** Not sure what happened, but it has something to do with Mercury */
	export interface IGenericMercury {

		/** Event name. */
		'eventName'?: string | undefined | null
		/** Payload. A hint */
		'payloadArgs'?: SpruceErrors.Local.IPayloadArgs[] | undefined | null
	}

}

export declare namespace SpruceErrors.Local.GenericMercury {
	/** The interface for the schema definition for a Generic mercury */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'genericMercury',
		name: 'Generic mercury',
		description: 'Not sure what happened, but it has something to do with Mercury',
		fields: {
			/** Event name. */
			'eventName': {
				label: 'Event name',
				type: FieldType.Text,
				options: undefined
			},
			/** Payload. A hint */
			'payloadArgs': {
				label: 'Payload',
				type: FieldType.Schema,
				hint: 'A hint',
				isArray: true,
				options: { schemas: SpruceErrors.Local.PayloadArgs.IDefinition[], }
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.GenericMercury.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** This feature has not been implemented */
	export interface INotImplemented {

	}

}

export declare namespace SpruceErrors.Local.NotImplemented {
	/** The interface for the schema definition for a Not implemented */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'notImplemented',
		name: 'Not implemented',
		description: 'This feature has not been implemented',
		fields: {
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.NotImplemented.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** An error when generating value types for template insertion  */
	export interface IValueTypeServiceError {

		/** Schema id. */
		'schemaId': string
	}

}

export declare namespace SpruceErrors.Local.ValueTypeServiceError {
	/** The interface for the schema definition for a Value type service error */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'valueTypeServiceError',
		name: 'Value type service error',
		description: 'An error when generating value types for template insertion ',
		fields: {
			/** Schema id. */
			'schemaId': {
				label: 'Schema id',
				type: FieldType.Text,
				isRequired: true,
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.ValueTypeServiceError.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** When linting a file fails */
	export interface ILintFailed {

		/** Pattern. The pattern used to match files relative to the root of the skill */
		'pattern': string
		/** Output from lint. */
		'stdout': string
	}

}

export declare namespace SpruceErrors.Local.LintFailed {
	/** The interface for the schema definition for a Lint failed! */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'lintFailed',
		name: 'Lint failed!',
		description: 'When linting a file fails',
		fields: {
			/** Pattern. The pattern used to match files relative to the root of the skill */
			'pattern': {
				label: 'Pattern',
				type: FieldType.Text,
				isRequired: true,
				hint: 'The pattern used to match files relative to the root of the skill',
				options: undefined
			},
			/** Output from lint. */
			'stdout': {
				label: 'Output from lint',
				type: FieldType.Text,
				isRequired: true,
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.LintFailed.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** Could not transpile (ts -&gt; js) a script */
	export interface ITranspileFailed {

		/** Source. Source contents, should be typescript format */
		'source': string
	}

}

export declare namespace SpruceErrors.Local.TranspileFailed {
	/** The interface for the schema definition for a Transpile failed */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'transpileFailed',
		name: 'Transpile failed',
		description: 'Could not transpile (ts -> js) a script',
		fields: {
			/** Source. Source contents, should be typescript format */
			'source': {
				label: 'Source',
				type: FieldType.Text,
				isRequired: true,
				hint: 'Source contents, should be typescript format',
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.TranspileFailed.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** Could not find a user */
	export interface IUserNotFound {

		/** Token. */
		'token'?: string | undefined | null
		/** User id. */
		'userId'?: number | undefined | null
	}

}

export declare namespace SpruceErrors.Local.UserNotFound {
	/** The interface for the schema definition for a User not found */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'userNotFound',
		name: 'User not found',
		description: 'Could not find a user',
		fields: {
			/** Token. */
			'token': {
				label: 'Token',
				type: FieldType.Text,
				options: undefined
			},
			/** User id. */
			'userId': {
				label: 'User id',
				type: FieldType.Number,
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.UserNotFound.IDefinition>

}


export declare namespace SpruceErrors.Local {
	/** The key in the object already exists */
	export interface IKeyExists {

		/** Key. The key that already exists */
		'key': string
	}

}

export declare namespace SpruceErrors.Local.KeyExists {
	/** The interface for the schema definition for a keyExists */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'keyExists',
		name: 'keyExists',
		description: 'The key in the object already exists',
		fields: {
			/** Key. The key that already exists */
			'key': {
				label: 'Key',
				type: FieldType.Text,
				isRequired: true,
				hint: 'The key that already exists',
				options: undefined
			},
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceErrors.Local.KeyExists.IDefinition>

}




