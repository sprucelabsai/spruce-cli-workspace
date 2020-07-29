/* eslint-disable @typescript-eslint/naming-convention */
import path from 'path'
import { Optional } from '@sprucelabs/schema'
import inflection from 'inflection'
import { camelCase, snakeCase, upperFirst } from 'lodash'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const namesUtil = {
	/** Gets you a name good for using in an import statement based off a file path */
	toFileNameWithoutExtension(filePath: string) {
		return filePath
			.replace(path.dirname(filePath), '')
			.replace(path.extname(filePath), '')
			.replace('/', '')
	},
	/** First name => FirstName */
	toCamel(name: string) {
		return camelCase(name)
	},
	/** First name => FirstName */
	toPascal(name: string) {
		return upperFirst(this.toCamel(name))
	},
	/** First name => FIRST_NAME */
	toConst(name: string) {
		return snakeCase(name).toUpperCase()
	},
	/** First name => First names */
	toPlural(name: string) {
		return inflection.pluralize(name)
	},
	/** First name => First name */
	toSingular(name: string) {
		return inflection.singularize(name)
	},
	/** Help guess on answers */
	onWillAskQuestionHandler<
		K extends keyof SpruceSchemas.Local.INamedTemplateItem.v2020_07_22 = keyof SpruceSchemas.Local.INamedTemplateItem.v2020_07_22,
		V extends Optional<
			SpruceSchemas.Local.INamedTemplateItem.v2020_07_22
		> = Optional<SpruceSchemas.Local.INamedTemplateItem.v2020_07_22>
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
	},
}

export default namesUtil
