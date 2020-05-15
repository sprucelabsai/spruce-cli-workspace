export interface IAutoloadedImport {
	[path: string]: {
		defaultImport?: string
		namedImports?: string[]
	}
}

export interface IAutoloader {
	nameCamel: string
	namePascal: string
	namePascalSingular: string
	imports: IAutoloadedImport
}
