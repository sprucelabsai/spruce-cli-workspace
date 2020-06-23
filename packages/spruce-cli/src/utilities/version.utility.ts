import { LATEST_TOKEN } from '../constants'
import diskUtil from './disk.utility'

function parsePath(cwd: string, paths: string[]) {
	const resolved = diskUtil.resolvePath(cwd, ...paths)
	const resolvedParts = resolved.split(`{{${LATEST_TOKEN}}}`)
	const dirToRead = resolvedParts[0]
	return { dirToRead, resolved }
}

function getAllVersions(dirToRead: string) {
	const contents = diskUtil.readDir(dirToRead)
	const allDateIsh = contents
		.filter(value => value.search(/\d\d\d\d-\d\d-\d\d/) > -1)
		.map(dateIsh => ({
			value: parseInt(dateIsh.replace(/\D/g, ''), 10),
			dateString: dateIsh
		}))
		.sort((a, b) => {
			return a.value > b.value ? 1 : -1
		})
	return allDateIsh
}

const versionUtil = {
	resolvePath(cwd: string, ...paths: string[]) {
		const { dirToRead, resolved } = parsePath(cwd, paths)

		// check what dirs this we have
		const allDateIsh = getAllVersions(dirToRead)

		const latest = allDateIsh.pop()

		if (!latest) {
			debugger
			throw new Error('no versioning found!')
		}

		return resolved.replace('{{@latest}}', latest.dateString)
	},

	resolveNewLatestPath(cwd: string, ...paths: string[]) {
		const { resolved } = parsePath(cwd, paths)
		return resolved.replace(
			'{{@latest}}',
			new Date().toISOString().split('T')[0]
		)
	}
}

export default versionUtil
