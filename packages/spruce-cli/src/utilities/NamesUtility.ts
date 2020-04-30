import { camelCase, snakeCase, upperFirst } from 'lodash'
import { FieldDefinition } from '@sprucelabs/schema'
import AbstractUtility from './AbstractUtility'
import path from 'path'
import { SpruceSchemas } from '../../.spruce/schemas/schemas.types'

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

/** Gets you a name good for using in an import statement based off a file path */
export function toFileNameWithoutExtension(filePath: string) {
	return filePath
		.replace(path.dirname(filePath), '')
		.replace(path.extname(filePath), '')
		.replace('/', '')
}

export default class NamesUtility extends AbstractUtility {
	/** First name => FirstName */
	public toCamel = toCamel

	/** First name => FirstName */
	public toPascal = toPascal

	/** First name => FIRST_NAME */
	public toConst = toConst

	/** Gets you a name good for using in an import statement based off a file path */
	public toFileNameWithoutExtension = toFileNameWithoutExtension

	/** Help guess on answers */
	public onWillAskQuestionHandler<
		K extends keyof SpruceSchemas.Local.INamedTemplateItem = keyof SpruceSchemas.Local.INamedTemplateItem,
		V extends Partial<SpruceSchemas.Local.INamedTemplateItem> = Partial<
			SpruceSchemas.Local.INamedTemplateItem
		>
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
