import fsUtil from 'fs'
import pathUtil from 'path'
import { Schema } from '@sprucelabs/schema'
import { diskUtil, namesUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../../../errors/SpruceError'

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
