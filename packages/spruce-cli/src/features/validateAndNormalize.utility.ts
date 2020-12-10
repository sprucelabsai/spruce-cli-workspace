import {
	defaultSchemaValues,
	normalizeSchemaValues,
	Schema,
	SchemaPartialValues,
	SchemaValuesWithDefaults,
	validateSchemaValues,
} from '@sprucelabs/schema'

type StripNulls<T extends Record<string, any>> = {
	[K in keyof T]: Exclude<T[K], null>
}

const validateAndNormalizeUtil = {
	validateAndNormalize<S extends Schema = Schema>(
		schema: S,
		options: SchemaPartialValues<S, false>
	) {
		const values = {
			...defaultSchemaValues(schema),
			...options,
		}

		validateSchemaValues(schema, values, {})

		const normalized = normalizeSchemaValues(schema, values)

		const noUndefined = {}

		Object.keys(normalized).forEach((key: string) => {
			// @ts-ignore
			if (normalized[key] !== undefined) {
				//@ts-ignore
				noUndefined[key] = normalized[key]
			}
		})
		return noUndefined as StripNulls<SchemaValuesWithDefaults<S>>
	},
}

export default validateAndNormalizeUtil
