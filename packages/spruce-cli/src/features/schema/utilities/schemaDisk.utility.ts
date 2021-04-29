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
	cleanEmpty(dir: string) {
		if (typeof dir !== 'string') {
			throw new TypeError('expected the first argument to be a string')
		}

		const dirname = pathUtil.resolve(dir)

		const remove = (dir: string): void => {
			if (!diskUtil.isDir(dir)) {
				return
			}

			let files = fsUtil.readdirSync(dir)

			for (let filepath of files) {
				remove(pathUtil.join(dir, filepath))
			}

			let filesAfter = fsUtil.readdirSync(dir)
			if (filesAfter.length === 0) {
				diskUtil.deleteDir(dir)
			}
		}

		return remove(dirname)
	},
}

export default schemaDiskUtil
