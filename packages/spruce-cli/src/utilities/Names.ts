import { camelCase, snakeCase, upperCase, upperFirst } from 'lodash'
import {
	IFieldDefinition,
	ISchemaDefinition,
	SchemaDefinitionValues
} from '@sprucelabs/schema'

export default class NamesUtility {
	/** first name => FirstName */
	public toPascal(name: string) {
		return upperFirst(this.toCamel(name))
	}
	/** first name => FirstName */
	public toCamel(name: string) {
		return camelCase(name)
	}
	/** first name => FIRST_NAME */
	public toConst(name: string) {
		return upperCase(snakeCase(name))
	}

	// public onWillAskQuestionHelper<
	// 	T extends INamed,
	// 	V extends Partial<SchemaDefinitionValues<T>>
	// >(fieldName: string, fieldDefinition: IFieldDefinition, values: V) {
	// 	switch (name) {
	// 		case 'camelName':
	// 			if (!values.camelName) {
	// 				fieldDefinition.defaultValue = this.toCamel(values.readableName || '')
	// 			}
	// 			break
	// 		case 'pascalName':
	// 			if (!values.pascalName) {
	// 				fieldDefinition.defaultValue = this.toPascal(
	// 					values.readableName || ''
	// 				)
	// 			}
	// 			break
	// 	}
	// 	return fieldDefinition
	// }
}
