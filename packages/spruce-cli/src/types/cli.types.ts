export enum WriteMode {
	/** Throw an error if it already exists. This is the default behavior */
	Throw = 'throw',
	/** Overwrite it */
	Overwrite = 'overwrite',
	/** Skip it if it exists */
	Skip = 'skip'
}
