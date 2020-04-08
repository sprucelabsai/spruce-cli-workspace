import { camelCase, snakeCase, upperFirst } from 'lodash'
import { FieldDefinition } from '@sprucelabs/schema'
import { INamedTemplateItem } from '../../.spruce/schemas/namedTemplateItem.types'
import AbstractUtility from './AbstractUtility'

/** First name => FirstName */
export function toCamel(name: string) {
	return camelCase(name)
}

/** First name => FirstName */
export function toPascal(name: string) {
	return upperFirst(toCamel(name))
}

/** First name => FIRST_NAME */
export function toConst(name: string) {
	return snakeCase(name).toUpperCase()
}

export default class NamesUtility extends AbstractUtility {
	/** First name => FirstName */
	public toCamel = toCamel

	/** First name => FirstName */
	public toPascal = toPascal

	/** First name => FIRST_NAME */
	public toConst = toConst

	/** Help guess on answers */
	public onWillAskQuestionHandler<
		K extends keyof INamedTemplateItem = keyof INamedTemplateItem,
		V extends Partial<INamedTemplateItem> = Partial<INamedTemplateItem>
	>(fieldName: K, fieldDefinition: FieldDefinition, values: V) {
		switch (fieldName) {
			case 'camelName':
				if (!values.camelName) {
					fieldDefinition.defaultValue = toCamel(values.readableName || '')
				}
				break
			case 'pascalName':
				if (!values.pascalName) {
					fieldDefinition.defaultValue = toPascal(values.readableName || '')
				}
				break
			case 'constName':
				if (!values.constName) {
					fieldDefinition.defaultValue = toConst(values.readableName || '')
				}
				break
		}
		return fieldDefinition
	}
}
