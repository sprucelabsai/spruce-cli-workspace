import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'

const optionsSchema = buildSchema({
	id: 'createStoreOptions',
	fields: {
		nameCamel: {
			type: 'text',
			isRequired: true,
			label: 'Camelcase name',
			hint: 'The name should be plural, like dogHouses or people.',
		},
	},
})

type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>

export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public optionsSchema = optionsSchema
	public code = 'create'

	public async execute(options: Options) {
		const { nameCamel } = this.validateAndNormalizeOptions(options)

		const writer = this.Writer('store')

		try {
			const files = await writer.writeStore(this.cwd, {
				nameCamel,
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
