/** All the error codes this skill can throw */
export enum ErrorCode {

    /** * A command failed to load, probably because of a syntax error */
    CouldNotLoadCommand = 'COULD_NOT_LOAD_COMMAND',

    /** * Error thrown when building or linting failed. Happens when a yarn command fails inside the package utility. */
    BuildFailed = 'BUILD_FAILED',

    /** * Failed to import a file through VM */
    FailedToImport = 'FAILED_TO_IMPORT',

    /** * Not sure what happened, but it has something to do with Mercury */
    GenericMercury = 'GENERIC_MERCURY',

    /** * Autoloader creation failed */
    CreateAutoloaderFailed = 'CREATE_AUTOLOADER_FAILED',

    /** * The definition file failed to import */
    DefinitionFailedToImport = 'DEFINITION_FAILED_TO_IMPORT',

    /** * The command is not valid, try --help */
    InvalidCommand = 'INVALID_COMMAND',

    /** * Could not transpile (ts -> js) a script */
    TranspileFailed = 'TRANSPILE_FAILED',

    /** * A reserved js keyword was used */
    ReservedKeyword = 'RESERVED_KEYWORD',

    /** * This command has not yet been implemented  */
    NotImplemented = 'NOT_IMPLEMENTED',

    /** * Could not find a user */
    UserNotFound = 'USER_NOT_FOUND',

}