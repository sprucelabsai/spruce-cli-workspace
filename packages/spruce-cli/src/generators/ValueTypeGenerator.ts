import { ISchemaTemplateItem, IFieldTemplateItem } from '@sprucelabs/schema'
import AbstractGenerator from './AbstractGenerator'

export interface IValueTypesOptions {
	schemaTemplateItems: ISchemaTemplateItem[]
	fieldTemplateItems: IFieldTemplateItem[]
}

export default class ValueTypeGenerator extends AbstractGenerator {
	public async generateValueTypes(options: IValueTypesOptions) {
		console.log('test', options)
	}
}
