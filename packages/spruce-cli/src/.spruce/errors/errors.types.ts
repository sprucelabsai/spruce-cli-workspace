/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'

import FieldType from '#spruce/schemas/fields/fieldTypeEnum'


export declare namespace SpruceErrors.Local {

	/** Booting your skill failed! */
	export interface IBootFailed {
		
	}

	export interface IBootFailedSchema extends SpruceSchema.ISchema {
		id: 'bootFailed',
		name: 'Boot failed',
		description: 'Booting your skill failed!',
		    fields: {
		    }
	}

	export type BootFailedEntity = SchemaEntity<SpruceErrors.Local.IBootFailedSchema>

}


export declare namespace SpruceErrors.Local {

	/** Error thrown when building or linting failed. Happens when a yarn command fails inside the package utility. */
	export interface IBuildFailed {
		
			/** File. File we wanted to build, if not set we wanted to build everything.. */
			'file'?: string| undefined | null
	}

	export interface IBuildFailedSchema extends SpruceSchema.ISchema {
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

	export type BuildFailedEntity = SchemaEntity<SpruceErrors.Local.IBuildFailedSchema>

}


export declare namespace SpruceErrors.Local {

	/** This command has not yet been implemented  */
	export interface ICommandNotImplemented {
		
			/** Command. the command being run! */
			'command': string
			/** Args. Arguments passed to the command */
			'args'?: string[]| undefined | null
	}

	export interface ICommandNotImplementedSchema extends SpruceSchema.ISchema {
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

	export type CommandNotImplementedEntity = SchemaEntity<SpruceErrors.Local.ICommandNotImplementedSchema>

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

	export interface ICreateAutoloaderFailedSchema extends SpruceSchema.ISchema {
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

	export type CreateAutoloaderFailedEntity = SchemaEntity<SpruceErrors.Local.ICreateAutoloaderFailedSchema>

}


export declare namespace SpruceErrors.Local {

	
	export interface IDirectoryEmpty {
		
			
			'directory': string
	}

	export interface IDirectoryEmptySchema extends SpruceSchema.ISchema {
		id: 'directoryEmpty',
		name: 'directory empty',
		    fields: {
		            /** . */
		            'directory': {
		                type: FieldType.Text,
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type DirectoryEmptyEntity = SchemaEntity<SpruceErrors.Local.IDirectoryEmptySchema>

}


export declare namespace SpruceErrors.Local {

	/** The command that was being executed failed */
	export interface IExecutingCommandFailed {
		
			/** The command being run. */
			'cmd': string
			/** Args. */
			'args'?: string[]| undefined | null
			/** Cwd. */
			'cwd'?: string| undefined | null
			/** Stdout. */
			'stdout'?: string| undefined | null
			/** stderr. */
			'stderr'?: string| undefined | null
	}

	export interface IExecutingCommandFailedSchema extends SpruceSchema.ISchema {
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
		            /** Stdout. */
		            'stdout': {
		                label: 'Stdout',
		                type: FieldType.Text,
		                options: undefined
		            },
		            /** stderr. */
		            'stderr': {
		                label: 'stderr',
		                type: FieldType.Text,
		                options: undefined
		            },
		    }
	}

	export type ExecutingCommandFailedEntity = SchemaEntity<SpruceErrors.Local.IExecutingCommandFailedSchema>

}


export declare namespace SpruceErrors.Local {

	/** Failed to import a file through VM */
	export interface IFailedToImport {
		
			/** File. The file I tried to import */
			'file': string
	}

	export interface IFailedToImportSchema extends SpruceSchema.ISchema {
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

	export type FailedToImportEntity = SchemaEntity<SpruceErrors.Local.IFailedToImportSchema>

}


export declare namespace SpruceErrors.Local {

	/** The file already exists */
	export interface IFileExists {
		
			/** File. The file being created */
			'file': string
	}

	export interface IFileExistsSchema extends SpruceSchema.ISchema {
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

	export type FileExistsEntity = SchemaEntity<SpruceErrors.Local.IFileExistsSchema>

}


export declare namespace SpruceErrors.Local {

	
	export interface IPayloadArgs {
		
			/** name. */
			'name'?: string| undefined | null
			/** value. */
			'value'?: string| undefined | null
	}

	export interface IPayloadArgsSchema extends SpruceSchema.ISchema {
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

	export type PayloadArgsEntity = SchemaEntity<SpruceErrors.Local.IPayloadArgsSchema>

}


export declare namespace SpruceErrors.Local {

	/** Not sure what happened, but it has something to do with Mercury */
	export interface IGenericMercury {
		
			/** Event name. */
			'eventName'?: string| undefined | null
			/** Payload. A hint */
			'payloadArgs'?: SpruceErrors.Local.IPayloadArgs[]| undefined | null
	}

	export interface IGenericMercurySchema extends SpruceSchema.ISchema {
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
		                options: {schemas: SpruceErrors.Local.IPayloadArgsSchema[],}
		            },
		    }
	}

	export type GenericMercuryEntity = SchemaEntity<SpruceErrors.Local.IGenericMercurySchema>

}


export declare namespace SpruceErrors.Local {

	/** When you&#x27;re too lazy to make a new error */
	export interface IGeneric {
		
			/** Friendly message. */
			'friendlyMessageSet'?: string| undefined | null
	}

	export interface IGenericSchema extends SpruceSchema.ISchema {
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

	export type GenericEntity = SchemaEntity<SpruceErrors.Local.IGenericSchema>

}


export declare namespace SpruceErrors.Local {

	/** The command is not valid, try --help */
	export interface IInvalidCommand {
		
			/** args. */
			'args': string[]
	}

	export interface IInvalidCommandSchema extends SpruceSchema.ISchema {
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

	export type InvalidCommandEntity = SchemaEntity<SpruceErrors.Local.IInvalidCommandSchema>

}


export declare namespace SpruceErrors.Local {

	/** When linting a file fails */
	export interface ILintFailed {
		
			/** Pattern. The pattern used to match files relative to the root of the skill */
			'pattern': string
			/** Output from lint. */
			'stdout': string
	}

	export interface ILintFailedSchema extends SpruceSchema.ISchema {
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

	export type LintFailedEntity = SchemaEntity<SpruceErrors.Local.ILintFailedSchema>

}


export declare namespace SpruceErrors.Local {

	/** This feature has not been implemented */
	export interface INotImplemented {
		
	}

	export interface INotImplementedSchema extends SpruceSchema.ISchema {
		id: 'notImplemented',
		name: 'Not implemented',
		description: 'This feature has not been implemented',
		    fields: {
		    }
	}

	export type NotImplementedEntity = SchemaEntity<SpruceErrors.Local.INotImplementedSchema>

}


export declare namespace SpruceErrors.Local {

	/** The definition file failed to import */
	export interface ISchemaFailedToImport {
		
			/** File. The file definition file I tried to import */
			'file': string
	}

	export interface ISchemaFailedToImportSchema extends SpruceSchema.ISchema {
		id: 'schemaFailedToImport',
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

	export type SchemaFailedToImportEntity = SchemaEntity<SpruceErrors.Local.ISchemaFailedToImportSchema>

}


export declare namespace SpruceErrors.Local {

	/** Could not find a user */
	export interface IUserNotFound {
		
			/** Token. */
			'token'?: string| undefined | null
			/** User id. */
			'userId'?: number| undefined | null
	}

	export interface IUserNotFoundSchema extends SpruceSchema.ISchema {
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

	export type UserNotFoundEntity = SchemaEntity<SpruceErrors.Local.IUserNotFoundSchema>

}


export declare namespace SpruceErrors.Local {

	
	export interface IVscodeNotInstalled {
		
	}

	export interface IVscodeNotInstalledSchema extends SpruceSchema.ISchema {
		id: 'vscodeNotInstalled',
		name: 'vscode not installed',
		    fields: {
		    }
	}

	export type VscodeNotInstalledEntity = SchemaEntity<SpruceErrors.Local.IVscodeNotInstalledSchema>

}




