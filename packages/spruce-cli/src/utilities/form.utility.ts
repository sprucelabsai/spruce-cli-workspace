import { Optional } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const formUtil = {
	/** Help guess on answers */
	onWillAskQuestionHandler<
		K extends keyof SpruceSchemas.SpruceCli.v2020_07_22.INamedTemplateItem = keyof SpruceSchemas.SpruceCli.v2020_07_22.INamedTemplateItem,
		V extends Optional<SpruceSchemas.SpruceCli.v2020_07_22.INamedTemplateItem> = Optional<SpruceSchemas.SpruceCli.v2020_07_22.INamedTemplateItem>
	>(fieldName: K, fieldDefinition: FieldDefinition, values: V) {
		switch (fieldName) {
			case 'nameCamel':
				if (!values.nameCamel) {
					fieldDefinition.defaultValue = namesUtil.toCamel(
						values.nameReadable || ''
					)
				}
				break
			case 'nameCamelPlural':
				if (!values.nameCamelPlural) {
					fieldDefinition.defaultValue = namesUtil.toPlural(
						namesUtil.toCamel(values.nameReadable || '')
					)
				}
				break
			case 'namePascal':
				if (!values.namePascal) {
					fieldDefinition.defaultValue = namesUtil.toPascal(
						values.nameReadable || ''
					)
				}

				break
			case 'namePascalPlural':
				if (!values.namePascalPlural) {
					fieldDefinition.defaultValue = namesUtil.toPlural(
						namesUtil.toPascal(values.nameReadable || '')
					)
				}
				break
			case 'nameConst':
				if (!values.nameConst) {
					fieldDefinition.defaultValue = namesUtil.toConst(
						values.nameReadable || ''
					)
				}
				break
		}
		return fieldDefinition
	},
}

export default formUtil
