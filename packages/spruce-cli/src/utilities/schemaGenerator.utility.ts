import pathUtil from 'path'
import globby from 'globby'

const schemaGeneratorUtil = {
	async filterDefinitionFilesBySchemaIds(
		lookupDir: string,
		schemaIds: string[]
	): Promise<string[]> {
		const matches = await globby(
			pathUtil.join(lookupDir, '/**/*.definition.[t|j]s')
		)
		const filtered = matches.filter((match) => {
			let found = false

			schemaIds.forEach((id) => {
				const idx = match.search(
					new RegExp(`${pathUtil.sep}${id}.definition.[t|j]s`)
				)
				if (idx > -1) {
					found = true
				}
			})

			return !found
		})
		return filtered
	},
}

export default schemaGeneratorUtil
