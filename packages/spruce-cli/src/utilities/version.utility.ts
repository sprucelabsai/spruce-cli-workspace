import { LATEST_HANDLEBARS } from '../constants'
import diskUtil from './disk.utility'
import namesUtil from './names.utility'

function parsePath(cwd: string, paths: string[]) {
	const resolved = diskUtil.resolvePath(cwd, ...paths)
	const resolvedParts = resolved.split(LATEST_HANDLEBARS)
	const dirToRead = resolvedParts[0]
	return { dirToRead, resolved }
}

function formatDate(date: Date) {
	const d = date,
		year = d.getFullYear()

	let month = '' + (d.getMonth() + 1),
		day = '' + d.getDate()

	if (month.length < 2) {
		month = '0' + month
	}
	if (day.length < 2) {
		day = '0' + day
	}

	return [year, month, day].join('-')
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
	/** Pass a string in YYYY-MM-DD leave to default to today */
	generateVersion(dateFormattedString?: string) {
		const date = dateFormattedString ?? formatDate(new Date())
		return {
			intValue: parseInt(date.replace(/\D/g, ''), 10),
			stringValue: date,
			constValue: `v${namesUtil.toConst(date)}`,
		}
	},
	latestVersionAtPath(path: string) {
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
