import pathUtil from 'path'
import { Schema } from '@sprucelabs/schema'
import SpruceError from '@sprucelabs/schema/build/errors/SpruceError'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'

const schemaDiskUtil = {
	resolvePath(options: {
		destination: string
		schema: Schema
		shouldIncludeFileExtension?: boolean
	}) {
		const {
			destination,
			schema,
			shouldIncludeFileExtension: includeFileExtension,
		} = options

		if (!schema.namespace) {
			throw new SpruceError({
				code: 'MISSING_PARAMETERS',
				parameters: ['namespace'],
			})
		}

		return pathUtil.join(
			destination,
			namesUtil.toCamel(schema.namespace),
			schema.version ?? '',
			`${schema.id}.schema${includeFileExtension === false ? '' : '.ts'}`
		)
	},
}

export default schemaDiskUtil
