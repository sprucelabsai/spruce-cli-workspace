export enum WriteMode {
	Throw = 'throw',
	Overwrite = 'overwrite',
	Skip = 'skip'
}

export enum AuthedAs {
	User = 'user',
	Skill = 'skill'
}

export interface IGeneratedFile {
	name: string
	path: string
	description: string
}

export interface INpmPackage {
	name: string
	/** Defaults to "latest" */
	version?: string
	/** Whether to install this in "devDependencies" */
	isDev?: boolean
}

export interface IValueTypes {
	[key: string]: string
}
