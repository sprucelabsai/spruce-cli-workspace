import { ISchemaDefinition } from '@sprucelabs/schema'

export interface IAutoLoaderClassTemplateItem {
	optionsInterfaceName?: string
	className: string
	nameCamel: string
	namePascal: string
	relativeFilePath: string
}

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
	abstractClassOptionsInterfaceName?: string
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

export interface IDirectoryTemplateFile {
	/** The relative path of the output file, without a leading forward slash */
	relativePath: string
	/** The file contents, built with the template data */
	contents: string
}

export interface IDefinitionBuilderTemplateItem {
	nameCamel: string
	description?: string
	namePascal: string
	nameReadable: string
}

export interface IErrorOptions {
	errors: IErrorTemplateItem[]
	renderClassDefinition?: boolean
}

export interface IErrorTemplateItem {
	definition: ISchemaDefinition
	nameCamel: string
	namePascal: string
}

export interface IValueTypes {
	[namespace: string]: {
		[schemaId: string]: {
			[version: string]: {
				[fieldName: string]: {
					value: string
					type: string
					definitionType: string
				}
			}
		}
	}
}
