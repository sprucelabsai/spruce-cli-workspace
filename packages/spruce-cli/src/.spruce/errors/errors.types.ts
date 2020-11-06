/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'





export declare namespace SpruceErrors.SpruceCli {

	/** Booting your skill failed! */
	export interface IBootFailed {
		
	}

	export interface IBootFailedSchema extends SpruceSchema.ISchema {
		id: 'bootFailed',
		namespace: 'SpruceCli',
		name: 'Boot failed',
		description: 'Booting your skill failed!',
		    fields: {
		    }
	}

	export type BootFailedEntity = SchemaEntity<SpruceErrors.SpruceCli.IBootFailedSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	/** Error thrown when building or linting failed. Happens when a yarn command fails inside the package utility. */
	export interface IBuildFailed {
		
			/** File. File we wanted to build, if not set we wanted to build everything.. */
			'file'?: string| undefined | null
	}

	export interface IBuildFailedSchema extends SpruceSchema.ISchema {
		id: 'buildFailed',
		namespace: 'SpruceCli',
		name: 'BuildFailed',
		description: 'Error thrown when building or linting failed. Happens when a yarn command fails inside the package utility.',
		    fields: {
		            /** File. File we wanted to build, if not set we wanted to build everything.. */
		            'file': {
		                label: 'File',
		                type: 'text',
		                hint: 'File we wanted to build, if not set we wanted to build everything..',
		                options: undefined
		            },
		    }
	}

	export type BuildFailedEntity = SchemaEntity<SpruceErrors.SpruceCli.IBuildFailedSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	
	export interface ICommandAborted {
		
			/** Command. */
			'command': string
	}

	export interface ICommandAbortedSchema extends SpruceSchema.ISchema {
		id: 'commandAborted',
		namespace: 'SpruceCli',
		name: 'Command aborted',
		    fields: {
		            /** Command. */
		            'command': {
		                label: 'Command',
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type CommandAbortedEntity = SchemaEntity<SpruceErrors.SpruceCli.ICommandAbortedSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	/** This command has not yet been implemented  */
	export interface ICommandNotImplemented {
		
			/** Command. the command being run! */
			'command': string
			/** Args. Arguments passed to the command */
			'args'?: string[]| undefined | null
	}

	export interface ICommandNotImplementedSchema extends SpruceSchema.ISchema {
		id: 'commandNotImplemented',
		namespace: 'SpruceCli',
		name: 'Command not implemented',
		description: 'This command has not yet been implemented ',
		    fields: {
		            /** Command. the command being run! */
		            'command': {
		                label: 'Command',
		                type: 'text',
		                isRequired: true,
		                hint: 'the command being run!',
		                options: undefined
		            },
		            /** Args. Arguments passed to the command */
		            'args': {
		                label: 'Args',
		                type: 'text',
		                hint: 'Arguments passed to the command',
		                isArray: true,
		                options: undefined
		            },
		    }
	}

	export type CommandNotImplementedEntity = SchemaEntity<SpruceErrors.SpruceCli.ICommandNotImplementedSchema>

}



export declare namespace SpruceErrors.SpruceCli {

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
		namespace: 'SpruceCli',
		name: 'Could not create an autoloader',
		description: 'Autoloader creation failed',
		    fields: {
		            /** The globby pattern used to find files. Globby pattern */
		            'globbyPattern': {
		                label: 'The globby pattern used to find files',
		                type: 'text',
		                isRequired: true,
		                hint: 'Globby pattern',
		                options: undefined
		            },
		            /** The files that were loaded. The files that were loaded */
		            'filePaths': {
		                label: 'The files that were loaded',
		                type: 'text',
		                isRequired: true,
		                hint: 'The files that were loaded',
		                isArray: true,
		                options: undefined
		            },
		            /** The suffix for classes to autoload. Class suffix */
		            'suffix': {
		                label: 'The suffix for classes to autoload',
		                type: 'text',
		                isRequired: true,
		                hint: 'Class suffix',
		                options: undefined
		            },
		            /** The directory we're trying to create the autoloader for. Directory to autoload */
		            'directory': {
		                label: 'The directory we\'re trying to create the autoloader for',
		                type: 'text',
		                isRequired: true,
		                hint: 'Directory to autoload',
		                options: undefined
		            },
		    }
	}

	export type CreateAutoloaderFailedEntity = SchemaEntity<SpruceErrors.SpruceCli.ICreateAutoloaderFailedSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	
	export interface IDirectoryEmpty {
		
			
			'directory': string
	}

	export interface IDirectoryEmptySchema extends SpruceSchema.ISchema {
		id: 'directoryEmpty',
		namespace: 'SpruceCli',
		name: 'directory empty',
		    fields: {
		            /** . */
		            'directory': {
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type DirectoryEmptyEntity = SchemaEntity<SpruceErrors.SpruceCli.IDirectoryEmptySchema>

}



export declare namespace SpruceErrors.SpruceCli {

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
		namespace: 'SpruceCli',
		name: 'Executing command failed',
		description: 'The command that was being executed failed',
		    fields: {
		            /** The command being run. */
		            'cmd': {
		                label: 'The command being run',
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		            /** Args. */
		            'args': {
		                label: 'Args',
		                type: 'text',
		                isArray: true,
		                options: undefined
		            },
		            /** Cwd. */
		            'cwd': {
		                label: 'Cwd',
		                type: 'text',
		                options: undefined
		            },
		            /** Stdout. */
		            'stdout': {
		                label: 'Stdout',
		                type: 'text',
		                options: undefined
		            },
		            /** stderr. */
		            'stderr': {
		                label: 'stderr',
		                type: 'text',
		                options: undefined
		            },
		    }
	}

	export type ExecutingCommandFailedEntity = SchemaEntity<SpruceErrors.SpruceCli.IExecutingCommandFailedSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	/** Failed to import a file through VM */
	export interface IFailedToImport {
		
			/** File. The file I tried to import */
			'file': string
	}

	export interface IFailedToImportSchema extends SpruceSchema.ISchema {
		id: 'failedToImport',
		namespace: 'SpruceCli',
		name: 'FailedToImport',
		description: 'Failed to import a file through VM',
		    fields: {
		            /** File. The file I tried to import */
		            'file': {
		                label: 'File',
		                type: 'text',
		                isRequired: true,
		                hint: 'The file I tried to import',
		                options: undefined
		            },
		    }
	}

	export type FailedToImportEntity = SchemaEntity<SpruceErrors.SpruceCli.IFailedToImportSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	/** The file already exists */
	export interface IFileExists {
		
			/** File. The file being created */
			'file': string
	}

	export interface IFileExistsSchema extends SpruceSchema.ISchema {
		id: 'fileExists',
		namespace: 'SpruceCli',
		name: 'fileExists',
		description: 'The file already exists',
		    fields: {
		            /** File. The file being created */
		            'file': {
		                label: 'File',
		                type: 'text',
		                isRequired: true,
		                hint: 'The file being created',
		                options: undefined
		            },
		    }
	}

	export type FileExistsEntity = SchemaEntity<SpruceErrors.SpruceCli.IFileExistsSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	/** When you&#x27;re too lazy to make a new error */
	export interface IGeneric {
		
			/** Friendly message. */
			'friendlyMessageSet'?: string| undefined | null
	}

	export interface IGenericSchema extends SpruceSchema.ISchema {
		id: 'generic',
		namespace: 'SpruceCli',
		name: 'generic',
		description: 'When you\'re too lazy to make a new error',
		    fields: {
		            /** Friendly message. */
		            'friendlyMessageSet': {
		                label: 'Friendly message',
		                type: 'text',
		                options: undefined
		            },
		    }
	}

	export type GenericEntity = SchemaEntity<SpruceErrors.SpruceCli.IGenericSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	
	export interface IPayloadArgs {
		
			/** name. */
			'name'?: string| undefined | null
			/** value. */
			'value'?: string| undefined | null
	}

	export interface IPayloadArgsSchema extends SpruceSchema.ISchema {
		id: 'payloadArgs',
		namespace: 'SpruceCli',
		name: 'Payload args',
		    fields: {
		            /** name. */
		            'name': {
		                label: 'name',
		                type: 'text',
		                options: undefined
		            },
		            /** value. */
		            'value': {
		                label: 'value',
		                type: 'text',
		                options: undefined
		            },
		    }
	}

	export type PayloadArgsEntity = SchemaEntity<SpruceErrors.SpruceCli.IPayloadArgsSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	/** Not sure what happened, but it has something to do with Mercury */
	export interface IGenericMercury {
		
			/** Event name. */
			'eventName'?: string| undefined | null
			/** Payload. A hint */
			'payloadArgs'?: SpruceErrors.SpruceCli.IPayloadArgs[]| undefined | null
	}

	export interface IGenericMercurySchema extends SpruceSchema.ISchema {
		id: 'genericMercury',
		namespace: 'SpruceCli',
		name: 'Generic mercury',
		description: 'Not sure what happened, but it has something to do with Mercury',
		    fields: {
		            /** Event name. */
		            'eventName': {
		                label: 'Event name',
		                type: 'text',
		                options: undefined
		            },
		            /** Payload. A hint */
		            'payloadArgs': {
		                label: 'Payload',
		                type: 'schema',
		                hint: 'A hint',
		                isArray: true,
		                options: {schema: SpruceErrors.SpruceCli.IPayloadArgsSchema,}
		            },
		    }
	}

	export type GenericMercuryEntity = SchemaEntity<SpruceErrors.SpruceCli.IGenericMercurySchema>

}



export declare namespace SpruceErrors.SpruceCli {

	/** The command is not valid, try --help */
	export interface IInvalidCommand {
		
			/** args. */
			'args': string[]
	}

	export interface IInvalidCommandSchema extends SpruceSchema.ISchema {
		id: 'invalidCommand',
		namespace: 'SpruceCli',
		name: 'Invalid command',
		description: 'The command is not valid, try --help',
		    fields: {
		            /** args. */
		            'args': {
		                label: 'args',
		                type: 'text',
		                isRequired: true,
		                isArray: true,
		                options: undefined
		            },
		    }
	}

	export type InvalidCommandEntity = SchemaEntity<SpruceErrors.SpruceCli.IInvalidCommandSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	
	export interface IInvalidFeatureCode {
		
			
			'featureCode': string
	}

	export interface IInvalidFeatureCodeSchema extends SpruceSchema.ISchema {
		id: 'invalidFeatureCode',
		namespace: 'SpruceCli',
		name: 'Invalid feature code',
		    fields: {
		            /** . */
		            'featureCode': {
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type InvalidFeatureCodeEntity = SchemaEntity<SpruceErrors.SpruceCli.IInvalidFeatureCodeSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	/** When linting a file fails */
	export interface ILintFailed {
		
			/** Pattern. The pattern used to match files relative to the root of the skill */
			'pattern': string
			/** Output from lint. */
			'stdout': string
	}

	export interface ILintFailedSchema extends SpruceSchema.ISchema {
		id: 'lintFailed',
		namespace: 'SpruceCli',
		name: 'Lint failed!',
		description: 'When linting a file fails',
		    fields: {
		            /** Pattern. The pattern used to match files relative to the root of the skill */
		            'pattern': {
		                label: 'Pattern',
		                type: 'text',
		                isRequired: true,
		                hint: 'The pattern used to match files relative to the root of the skill',
		                options: undefined
		            },
		            /** Output from lint. */
		            'stdout': {
		                label: 'Output from lint',
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type LintFailedEntity = SchemaEntity<SpruceErrors.SpruceCli.ILintFailedSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	/** This feature has not been implemented */
	export interface INotImplemented {
		
	}

	export interface INotImplementedSchema extends SpruceSchema.ISchema {
		id: 'notImplemented',
		namespace: 'SpruceCli',
		name: 'Not implemented',
		description: 'This feature has not been implemented',
		    fields: {
		    }
	}

	export type NotImplementedEntity = SchemaEntity<SpruceErrors.SpruceCli.INotImplementedSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	
	export interface ISchemaExists {
		
			/** Schema id. */
			'schemaId': string
			/** Destination. */
			'destination'?: string| undefined | null
	}

	export interface ISchemaExistsSchema extends SpruceSchema.ISchema {
		id: 'schemaExists',
		namespace: 'SpruceCli',
		name: 'Schema exists',
		    fields: {
		            /** Schema id. */
		            'schemaId': {
		                label: 'Schema id',
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		            /** Destination. */
		            'destination': {
		                label: 'Destination',
		                type: 'text',
		                options: undefined
		            },
		    }
	}

	export type SchemaExistsEntity = SchemaEntity<SpruceErrors.SpruceCli.ISchemaExistsSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	/** The definition file failed to import */
	export interface ISchemaFailedToImport {
		
			/** File. The file definition file I tried to import */
			'file': string
	}

	export interface ISchemaFailedToImportSchema extends SpruceSchema.ISchema {
		id: 'schemaFailedToImport',
		namespace: 'SpruceCli',
		name: 'Definition failed to import',
		description: 'The definition file failed to import',
		    fields: {
		            /** File. The file definition file I tried to import */
		            'file': {
		                label: 'File',
		                type: 'text',
		                isRequired: true,
		                hint: 'The file definition file I tried to import',
		                options: undefined
		            },
		    }
	}

	export type SchemaFailedToImportEntity = SchemaEntity<SpruceErrors.SpruceCli.ISchemaFailedToImportSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	
	export interface ITestFailed {
		
			
			'fileName': string
			
			'testName': string
			
			'errorMessage': string
	}

	export interface ITestFailedSchema extends SpruceSchema.ISchema {
		id: 'testFailed',
		namespace: 'SpruceCli',
		name: 'Test failed',
		    fields: {
		            /** . */
		            'fileName': {
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		            /** . */
		            'testName': {
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		            /** . */
		            'errorMessage': {
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type TestFailedEntity = SchemaEntity<SpruceErrors.SpruceCli.ITestFailedSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	/** Could not find a user */
	export interface IUserNotFound {
		
			/** Token. */
			'token'?: string| undefined | null
			/** User id. */
			'userId'?: number| undefined | null
	}

	export interface IUserNotFoundSchema extends SpruceSchema.ISchema {
		id: 'userNotFound',
		namespace: 'SpruceCli',
		name: 'User not found',
		description: 'Could not find a user',
		    fields: {
		            /** Token. */
		            'token': {
		                label: 'Token',
		                type: 'text',
		                options: undefined
		            },
		            /** User id. */
		            'userId': {
		                label: 'User id',
		                type: 'number',
		                options: undefined
		            },
		    }
	}

	export type UserNotFoundEntity = SchemaEntity<SpruceErrors.SpruceCli.IUserNotFoundSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	
	export interface IVscodeNotInstalled {
		
	}

	export interface IVscodeNotInstalledSchema extends SpruceSchema.ISchema {
		id: 'vscodeNotInstalled',
		namespace: 'SpruceCli',
		name: 'vscode not installed',
		    fields: {
		    }
	}

	export type VscodeNotInstalledEntity = SchemaEntity<SpruceErrors.SpruceCli.IVscodeNotInstalledSchema>

}



export declare namespace SpruceErrors.SpruceCli {

	
	export interface IFeatureNotInstalled {
		
			
			'featureCode': string
	}

	export interface IFeatureNotInstalledSchema extends SpruceSchema.ISchema {
		id: 'featureNotInstalled',
		namespace: 'SpruceCli',
		name: 'Feature not installed',
		    fields: {
		            /** . */
		            'featureCode': {
		                type: 'text',
		                isRequired: true,
		                options: undefined
		            },
		    }
	}

	export type FeatureNotInstalledEntity = SchemaEntity<SpruceErrors.SpruceCli.IFeatureNotInstalledSchema>

}




