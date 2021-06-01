import { diskUtil, HASH_SPRUCE_DIR } from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import SpruceError from './errors/SpruceError'

export default class CombinedTypesImportExtractor {
	private cwd: string

	public constructor(cwd: string) {
		if (!cwd) {
			throw new SpruceError({ code: 'MISSING_PARAMETERS', parameters: ['cwd'] })
		} else if (!diskUtil.doesDirExist(cwd)) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['cwd'],
				friendlyMessage: `${cwd} does not exist.`,
			})
		}

		this.cwd = cwd
	}

	public static getDefaultDestination(cwd: string) {
		const destination = diskUtil.resolvePath(
			cwd,
			HASH_SPRUCE_DIR,
			'skill.types.ts'
		)

		return destination
	}

	public async extractTypes() {
		const results = await globby(['**/*.types.ts', '!skill.types.ts'], {
			cwd: this.cwd,
		})
		return results.map((p) => `./${p.substr(0, p.length - 3)}`)
	}
}
