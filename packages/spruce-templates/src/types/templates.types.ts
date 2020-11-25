import { SchemaTemplateItem } from '@sprucelabs/schema'

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

export enum DirectoryTemplateCode {
	Skill = 'skill',
	VsCode = 'vscode',
	CircleCi = 'circleci',
	Autoloadable = 'autoloadable',
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
	[DirectoryTemplateCode.Skill]: IDirectoryTemplateContextSkill
	[DirectoryTemplateCode.VsCode]: IDirectoryTemplateContextVsCode
	[DirectoryTemplateCode.CircleCi]: IDirectoryTemplateContextCircleCi
	[DirectoryTemplateCode.Autoloadable]: IDirectoryTemplateContextAutoloadable
}

export interface IDirectoryTemplateFile {
	/** Whether this is a handlebars template file */
	isHandlebarsTemplate: boolean
	/** The full directory path before the filename */
	directory: string
	/** The relative directory path after "/templates/directories/<templateName>" */
	relativeDirectory: string
	/** The actual file name that would be output from this template */
	filename: string
	/** Path to file with leading slash */
	path: string
	/** The relative path of the output file, without a leading forward slash */
	relativePath: string
}

export interface ISchemaBuilderTemplateItem {
	nameCamel: string
	description?: string | null
	namePascal: string
	nameReadable: string
	builderFunction?: string
}

export interface IErrorOptions {
	errors: IErrorTemplateItem[]
	renderClassDefinition?: boolean
}

export interface IErrorTemplateItem extends SchemaTemplateItem {
	code: string
}

export interface IValueTypes {
	[namespace: string]: {
		[schemaId: string]: {
			[version: string]: {
				[fieldName: string]: {
					valueTypes: {
						value: string
						type: string
						schemaType: string
					}
					valueTypeGeneratorType?: string
				}
			}
		}
	}
}

export interface ITestOptions {
	namePascal: string
	nameCamel: string
	parentTestClass?: { name: string; importPath: string }
}

export interface IEventListenerOptions {
	eventName: string
	eventNamespace: string
	nameConst: string
}
