import { camelCase, snakeCase, upperFirst } from 'lodash'
import { IFieldDefinition } from '@sprucelabs/schema'
import { INamedTemplateItem } from '../../.spruce/schemas/namedTemplateItem.types'
import AbstractUtility from './AbstractUtility'

export default class NamesUtility extends AbstractUtility {
	/** First name => FirstName */
	public toPascal(name: string) {
		return upperFirst(this.toCamel(name))
	}
	/** First name => FirstName */
	public toCamel(name: string) {
		return camelCase(name)
	}
	/** First name => FIRST_NAME */
	public toConst(name: string) {
		return snakeCase(name).toUpperCase()
	}

	/** Help guess on answers */
	public onWillAskQuestionHandler<
		K extends keyof INamedTemplateItem = keyof INamedTemplateItem,
		V extends Partial<INamedTemplateItem> = Partial<INamedTemplateItem>
	>(fieldName: K, fieldDefinition: IFieldDefinition, values: V) {
		switch (fieldName) {
			case 'camelName':
				if (!values.camelName) {
					fieldDefinition.defaultValue = this.toCamel(values.readableName || '')
				}
				break
			case 'pascalName':
				if (!values.pascalName) {
					fieldDefinition.defaultValue = this.toPascal(
						values.readableName || ''
					)
				}
				break
			case 'constName':
				if (!values.constName) {
					fieldDefinition.defaultValue = this.toConst(values.readableName || '')
				}
				break
		}
		return fieldDefinition
	}
}
