import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import namedTemplateItemBuilder from '../../../schemas/v2020_07_22/namedTemplateItem.builder'
import AbstractFeatureAction from '../../AbstractFeatureAction'

const optionsSchema = buildSchema({
	id: 'createStoreOptions',
	fields: {
		nameReadable: {
			...namedTemplateItemBuilder.fields.nameReadable,
			label: 'Store name',
			hint: 'Make it easy to read and plural, e.g. People or Bids',
		},
		namePascal: namedTemplateItemBuilder.fields.namePascal,
		nameCamel: namedTemplateItemBuilder.fields.nameCamel,
		nameSnake: namedTemplateItemBuilder.fields.nameSnake,
	},
})

type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>

export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public optionsSchema = optionsSchema
	public code = 'create'

	public async execute(options: Options) {
		const {
			nameCamel,
			namePascal,
			nameSnake,
		} = this.validateAndNormalizeOptions(options)

		const writer = this.Writer('store')

		try {
			const files = await writer.writeStore(this.cwd, {
				nameCamel,
				namePascal: namePascal ?? namesUtil.toPascal(nameCamel),
				nameSnake: nameSnake ?? namesUtil.toSnake(nameCamel),
			})

			return {
				files,
			}
		} catch (err) {
			return {
				errors: [err],
			}
		}
	}
}
