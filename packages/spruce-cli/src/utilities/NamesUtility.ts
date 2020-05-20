import path from 'path'
import { FieldDefinition } from '@sprucelabs/schema'
import { Optional } from '@sprucelabs/schema'
import inflection from 'inflection'
import { camelCase, snakeCase, upperFirst } from 'lodash'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractUtility from './AbstractUtility'

/** Gets you a name good for using in an import statement based off a file path */
export function toFileNameWithoutExtension(filePath: string) {
	return filePath
		.replace(path.dirname(filePath), '')
		.replace(path.extname(filePath), '')
		.replace('/', '')
}

export default class NamesUtility extends AbstractUtility {
	/** Gets you a name good for using in an import statement based off a file path */
	public toFileNameWithoutExtension = toFileNameWithoutExtension

	/** First name => FirstName */
	public toCamel(name: string) {
		return camelCase(name)
	}

	/** First name => FirstName */
	public toPascal(name: string) {
		return upperFirst(this.toCamel(name))
	}

	/** First name => FIRST_NAME */
	public toConst(name: string) {
		return snakeCase(name).toUpperCase()
	}

	/** First name => First names */
	public toPlural(name: string) {
		return inflection.pluralize(name)
	}

	/** First name => First name */
	public toSingular(name: string) {
		return inflection.singularize(name)
	}

	/** Help guess on answers */
	public onWillAskQuestionHandler<
		K extends keyof SpruceSchemas.Local.INamedTemplateItem = keyof SpruceSchemas.Local.INamedTemplateItem,
		V extends Optional<SpruceSchemas.Local.INamedTemplateItem> = Optional<
			SpruceSchemas.Local.INamedTemplateItem
		>
	>(fieldName: K, fieldDefinition: FieldDefinition, values: V) {
		switch (fieldName) {
			case 'nameCamel':
				if (!values.nameCamel) {
					fieldDefinition.defaultValue = this.toSingular(
						this.toCamel(values.nameReadable || '')
					)
				}
				break
			case 'nameCamelPlural':
				if (!values.nameCamelPlural) {
					fieldDefinition.defaultValue = this.toPlural(
						this.toCamel(values.nameReadable || '')
					)
				}
				break
			case 'namePascal':
				if (!values.namePascal) {
					fieldDefinition.defaultValue = this.toSingular(
						this.toPascal(values.nameReadable || '')
					)
				}
				break
			case 'namePascalPlural':
				if (!values.namePascalPlural) {
					fieldDefinition.defaultValue = this.toSingular(
						this.toPascal(values.nameReadable || '')
					)
				}
				break
			case 'nameConst':
				if (!values.nameConst) {
					fieldDefinition.defaultValue = this.toSingular(
						this.toConst(values.nameReadable || '')
					)
				}
				break
		}
		return fieldDefinition
	}
}
