import { TemplateRenderAs, FieldDefinition } from '@sprucelabs/schema'

/** A callback function that returns what is written to a template for the interface of the schema (e.g. string, number, IAddressFieldValue) */
export interface IValueTypeGenerator {
	(renderAs: TemplateRenderAs, definition: FieldDefinition): string
}

/** Autoloader needs all the classes to load */
export interface IAutoLoaderClassTemplateItem {
	constructorOptionsInterfaceName?: string
	className: string
	nameCamel: string
	namePascal: string
	relativeFilePath: string
}

/** Auto loader needs all the interface */
export interface IAutoLoaderInterfaceTemplateItem {
	interfaceName: string
	relativeFilePath: string
}

export interface IAutoLoaderImportTemplateItem {
	name: string
	filePath: string
}

export interface IAutoLoaderTemplateItem {
	abstractClassName: string
	abstractClassRelativePath: string
	abstractClassConstructorOptionsInterfaceName?: string
	classes: IAutoLoaderClassTemplateItem[]
	interfaces: IAutoLoaderInterfaceTemplateItem[]
	constructorOptionInterfaces: IAutoLoaderImportTemplateItem[]
	namePascalPlural: string
	namePascal: string
	nameCamel: string
	nameCamelPlural: string
}

export interface IRootAutoloaderTemplateItem {
	autoloaders: IAutoLoaderTemplateItem[]
}

export enum DirectoryTemplateKind {
	Skill = 'skill',
	VsCode = 'vscode',
	CircleCi = 'circleci',
	Autoloadable = 'autoloadable'
}

export interface IDirectoryTemplateContextSkill {
	name: string
	description: string
}
export interface IDirectoryTemplateContextVsCode {}
export interface IDirectoryTemplateContextCircleCi {}
export interface IDirectoryTemplateContextAutoloadable {
	namePascalPlural: string
	namePascal: string
	nameCamelPlural: string
}

export interface IDirectoryTemplateContextMap {
	[DirectoryTemplateKind.Skill]: IDirectoryTemplateContextSkill
	[DirectoryTemplateKind.VsCode]: IDirectoryTemplateContextVsCode
	[DirectoryTemplateKind.CircleCi]: IDirectoryTemplateContextCircleCi
	[DirectoryTemplateKind.Autoloadable]: IDirectoryTemplateContextAutoloadable
}

export interface IDirectoryTemplate {
	files: {
		/** The relative path of the output file, without a leading forward slash */
		relativePath: string
		/** The file contents, built with the template data */
		contents: string
	}[]
}

export interface IEventTemplateItem {}
