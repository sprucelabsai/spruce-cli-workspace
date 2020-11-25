import { SchemaTemplateItem } from '@sprucelabs/schema'

export interface AutoLoaderClassTemplateItem {
	optionsInterfaceName?: string
	className: string
	nameCamel: string
	namePascal: string
	relativeFilePath: string
}

export interface AutoLoaderInterfaceTemplateItem {
	interfaceName: string
	relativeFilePath: string
}

export interface AutoLoaderImportTemplateItem {
	name: string
	filePath: string
}

export interface AutoLoaderTemplateItem {
	abstractClassName: string
	abstractClassRelativePath: string
	abstractClassOptionsInterfaceName?: string
	classes: AutoLoaderClassTemplateItem[]
	interfaces: AutoLoaderInterfaceTemplateItem[]
	constructorOptionInterfaces: AutoLoaderImportTemplateItem[]
	namePascalPlural: string
	namePascal: string
	nameCamel: string
	nameCamelPlural: string
}

export interface RootAutoloaderTemplateItem {
	autoloaders: AutoLoaderTemplateItem[]
}

export enum DirectoryTemplateCode {
	Skill = 'skill',
	VsCode = 'vscode',
	CircleCi = 'circleci',
	Autoloadable = 'autoloadable',
}

export interface DirectoryTemplateContextSkill {
	name: string
	description: string
}
export interface DirectoryTemplateContextVsCode {}
export interface DirectoryTemplateContextCircleCi {}
export interface DirectoryTemplateContextAutoloadable {
	namePascalPlural: string
	namePascal: string
	nameCamelPlural: string
}

export interface DirectoryTemplateContextMap {
	[DirectoryTemplateCode.Skill]: DirectoryTemplateContextSkill
	[DirectoryTemplateCode.VsCode]: DirectoryTemplateContextVsCode
	[DirectoryTemplateCode.CircleCi]: DirectoryTemplateContextCircleCi
	[DirectoryTemplateCode.Autoloadable]: DirectoryTemplateContextAutoloadable
}

export interface DirectoryTemplateFile {
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

export interface SchemaBuilderTemplateItem {
	nameCamel: string
	description?: string | null
	namePascal: string
	nameReadable: string
	builderFunction?: string
}

export interface ErrorOptions {
	errors: ErrorTemplateItem[]
	renderClassDefinition?: boolean
}

export interface ErrorTemplateItem extends SchemaTemplateItem {
	code: string
}

export interface ValueTypes {
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

export interface TestOptions {
	namePascal: string
	nameCamel: string
	parentTestClass?: { name: string; importPath: string }
}

export interface EventListenerOptions {
	eventName: string
	eventNamespace: string
	nameConst: string
}
