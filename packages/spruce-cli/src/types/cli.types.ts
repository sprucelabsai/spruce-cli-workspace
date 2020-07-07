export enum WriteMode {
	Throw = 'throw',
	Overwrite = 'overwrite',
	Skip = 'skip',
}

export enum AuthedAs {
	User = 'user',
	Skill = 'skill',
}

export enum GeneratedFileAction {
	Skipped = 'skipped',
	Generated = 'generated',
	Updated = 'updated',
}

export interface IGeneratedFile {
	name: string
	path: string
	description: string
	action: GeneratedFileAction
}

export interface INpmPackage {
	name: string
	/** Defaults to "latest" */
	version?: string
	/** Whether to install this in "devDependencies" */
	isDev?: boolean
}
