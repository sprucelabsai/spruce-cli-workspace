/** All the error codes this skill can throw */
 enum ErrorCode {
   
    /** * Error thrown when building or linting failed. Happens when a yarn command fails inside the package utility. */
    BuildFailed = 'BUILD_FAILED',
    
    /** * The directory is empty */
    DirectoryEmpty = 'DIRECTORY_EMPTY',
    
    /** * The definition file failed to import */
    DefinitionFailedToImport = 'DEFINITION_FAILED_TO_IMPORT',
    
    /** * This command has not yet been implemented  */
    CommandNotImplemented = 'COMMAND_NOT_IMPLEMENTED',
    
    /** * Failed to import a file through VM */
    FailedToImport = 'FAILED_TO_IMPORT',
    
    /** * The file already exists */
    FileExists = 'FILE_EXISTS',
    
    /** * The command that was being executed failed */
    ExecutingCommandFailed = 'EXECUTING_COMMAND_FAILED',
    
    /** * A command failed to load, probably because of a syntax error */
    CouldNotLoadCommand = 'COULD_NOT_LOAD_COMMAND',
    
    /** * Autoloader creation failed */
    CreateAutoloaderFailed = 'CREATE_AUTOLOADER_FAILED',
    
    /** * When you're too lazy to make a new error */
    Generic = 'GENERIC',
    
    /** * The command is not valid, try --help */
    InvalidCommand = 'INVALID_COMMAND',
    
    /** * This feature has not been implemented */
    NotImplemented = 'NOT_IMPLEMENTED',
    
    /** * When linting a file fails */
    LintFailed = 'LINT_FAILED',
    
    /** * Not sure what happened, but it has something to do with Mercury */
    GenericMercury = 'GENERIC_MERCURY',
    
    /** * The key in the object already exists */
    KeyExists = 'KEY_EXISTS',
    
    /** * Could not find a user */
    UserNotFound = 'USER_NOT_FOUND',
     
    /** * Could not transpile (ts -> js) a script */
    TranspileFailed = 'TRANSPILE_FAILED',
    
    /** * When collecting value types for all fields, something went wrong */
    ValueTypeServiceStageError = 'VALUE_TYPE_SERVICE_STAGE_ERROR',
    
    /** * An error when generating value types for template insertion  */
	ValueTypeServiceError = 'VALUE_TYPE_SERVICE_ERROR',
	
	DirectoryNotFound ='DIRECTORY_NOT_FOUND'
    
}

export default ErrorCode
