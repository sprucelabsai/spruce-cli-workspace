import { TemplateRenderAs, FieldDefinition } from '@sprucelabs/schema'

/** A callback function that returns what is written to a template for the interface of the schema (e.g. string, number, IAddressFieldValue) */
export interface IValueTypeGenerator {
	(renderAs: TemplateRenderAs, definition: FieldDefinition): string
}

/** Autoloader needs all the classes to load */
export interface IAutoLoaderClassTemplateItem {
	constructorOptionsInterfaceName?: string
	className: string
	relativeFilePath: string
}

/** Auto loader needs all the interface */
export interface IAutoLoaderInterfaceTemplateItem {
	interfaceName: string
	relativeFilePath: string
}
