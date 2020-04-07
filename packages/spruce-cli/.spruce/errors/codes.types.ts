// All the error codes this skill can throw
export enum ErrorCode {
    /** * We are not sure what happened */
    UnknownError = 'UNKNOWN_ERROR',

    /** * Some parameter is missing */
	MissingParameters = 'MISSING_PARAMETERS',

    /** * Some parameter is invalid */
	InvalidParameters = 'INVALID_PARAMETERS',

    /** * Schema was not found */
	SchemaNotFound = 'SCHEMA_NOT_FOUND',

	/** * Schema by id already exists */
	DuplicateSchemaId = 'DUPLICATE_SCHEMA_ID',

	/** * Field failed validate() */
	InvalidField = 'INVALID_FIELD',

    /** * It looks like you're not running `y watch`. Run it and then run `spruce all:sync`. */
    BuildFailed = 'BUILD_FAILED',
    
    /** * A command failed to load, probably because of a syntax error */
    CouldNotLoadCommand = 'COULD_NOT_LOAD_COMMAND',
    
    /** * The definition file failed to import */
    DefinitionFailedToImport = 'DEFINITION_FAILED_TO_IMPORT',
    
    /** * When you're too lazy to make a new error */
    Generic = 'GENERIC',
    
    /** * Not sure what happened, but it has something to do with Mercury */
    GenericMercury = 'GENERIC_MERCURY',
    
    /** * The command is not valid, try --help */
    InvalidCommand = 'INVALID_COMMAND',
    
    /** * This command has not yet been implemented  */
    NotImplemented = 'NOT_IMPLEMENTED',
    
    /** * Could not transpile (ts -> js) a script */
    TranspileFailed = 'TRANSPILE_FAILED',
    
    /** * Could not find a user */
    UserNotFound = 'USER_NOT_FOUND',
    
}