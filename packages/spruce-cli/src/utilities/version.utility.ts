import { LATEST_HANDLEBARS } from '../constants'
import diskUtil from './disk.utility'
import namesUtil from './names.utility'

function parsePath(cwd: string, paths: string[]) {
	const resolved = diskUtil.resolvePath(cwd, ...paths)
	const resolvedParts = resolved.split(LATEST_HANDLEBARS)
	const dirToRead = resolvedParts[0]
	return { dirToRead, resolved }
}

const versionUtil = {
	getAllVersions(dirToRead: string) {
		const contents = diskUtil.readDir(dirToRead)
		const allDateIsh = contents
			.filter((value) => value.search(/\d\d\d\d-\d\d-\d\d/) > -1)
			.map((dateIsh) => this.generateVersion(dateIsh))
			.sort((a, b) => {
				return a.intValue > b.intValue ? 1 : -1
			})
		return allDateIsh
	},
	generateVersion(date: string) {
		return {
			intValue: parseInt(date.replace(/\D/g, ''), 10),
			stringValue: date,
			constValue: `v${namesUtil.toConst(date)}`,
		}
	},
	latestVersion(path: string) {
		const resolved = diskUtil.resolvePath(path, '')
		const version = this.getAllVersions(resolved)
		const latest = version.pop()

		if (!latest) {
			// eslint-disable-next-line no-debugger
			debugger
			throw new Error('no versioning found!')
		}

		return latest
	},

	resolvePath(cwd: string, ...paths: string[]) {
		const { dirToRead, resolved } = parsePath(cwd, paths)

		// check what dirs this we have
		const allDateIsh = this.getAllVersions(dirToRead)

		const latest = allDateIsh.pop()

		if (!latest) {
			// eslint-disable-next-line no-debugger
			debugger
			throw new Error('no versioning found!')
		}

		return resolved.replace('{{@latest}}', latest.stringValue)
	},

	resolveNewLatestPath(cwd: string, ...paths: string[]) {
		const { resolved } = parsePath(cwd, paths)
		return resolved.replace(
			'{{@latest}}',
			new Date().toISOString().split('T')[0]
		)
	},
}

export default versionUtil
