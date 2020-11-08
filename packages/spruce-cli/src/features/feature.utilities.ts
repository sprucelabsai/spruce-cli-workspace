import pathUtil from 'path'
import { ISchema } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'

const featuresUtil = {
	filePathToActionCode(path: string): string {
		const parts = path.split(pathUtil.sep)
		const name = parts.pop() ?? ''
		const ext = pathUtil.extname(name)
		const nameNoExt = name.substr(0, name.length - ext.length)
		const code = nameNoExt.replace('Action', '')

		const hyphened = namesUtil.toKebab(code)

		return hyphened.replace(/-/g, '.').toLowerCase()
	},

	generateCommandAliases(schema: ISchema): Record<string, string> {
		const fields = schema.fields || {}
		const aliases: Record<string, string> = {}

		Object.keys(fields).forEach((fieldName: string) => {
			const fullName = `${fieldName}`
			const capitals = namesUtil.toPascal(fieldName).replace(/[a-z]/g, '')
			const alias = `${capitals.toLowerCase()}`

			let placeholder = ''
			const field = fields[fieldName]
			const type = field.type
			if (type !== 'boolean') {
				placeholder = ` <${fullName}>`
			} else {
				placeholder = ` [true|false]`
			}

			const aliasWithPlaceholder = `${
				alias.length === 1 ? '-' : '--'
			}${alias}${placeholder}`
			const fullNameWithPlaceholder = ` --${fullName}${placeholder}`
			const fullOptions =
				alias.length === 1
					? [aliasWithPlaceholder, fullNameWithPlaceholder]
					: [fullNameWithPlaceholder, aliasWithPlaceholder]

			aliases[fieldName] = fullOptions.join(`, `).trim()
		})

		return aliases
	},
}

export default featuresUtil
