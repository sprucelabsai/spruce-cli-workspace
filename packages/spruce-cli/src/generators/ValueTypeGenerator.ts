import { ISchemaTemplateItem, IFieldTemplateItem } from '@sprucelabs/schema'
import { IGeneratedFile } from '../types/cli.types'
import AbstractGenerator from './AbstractGenerator'

export interface IValueTypesOptions {
	schemaTemplateItems: ISchemaTemplateItem[]
	fieldTemplateItems: IFieldTemplateItem[]
}

export interface IValueTypeResults {
	generatedFiles: IGeneratedFile[]
}

export default class ValueTypeGenerator extends AbstractGenerator {
	public async generateValueTypes(
		options: IValueTypesOptions
	): Promise<IValueTypeResults> {
		console.log(options)
		return {
			generatedFiles: [
				{
					name: 'Value type generator',
					path: 'astoehusanothu',
					description:
						'Used to generate the typescript types used in the interface files that are generated.'
				}
			]
		}
	}
}
