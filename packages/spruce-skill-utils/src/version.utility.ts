import pathUtil from 'path'
import { LATEST_HANDLEBARS, LATEST_TOKEN } from './constants'
import diskUtil from './disk.utility'
import namesUtil from './names.utility'
import SpruceError from './SpruceError'

function parsePath(cwd: string, paths: string[]) {
	const resolved = diskUtil.resolvePath(cwd, ...paths)
	const resolvedParts = resolved.split(LATEST_HANDLEBARS)
	const dirToRead = resolvedParts[0]
	return { dirToRead, resolved }
}

export function formatDate(date: Date) {
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

	return [year, month, day].join('_')
}

const versionUtil = {
	getAllVersions(dirToRead: string) {
		const contents = diskUtil.readDir(dirToRead)
		const allDateIsh = contents
			.filter((value) => this.isValidVersion(value))
			.map((dateIsh) => this.generateVersion(dateIsh))
			.sort((a, b) => {
				return a.intValue > b.intValue ? 1 : -1
			})
		return allDateIsh
	},
	generateVersion(dateFormattedString?: string) {
		const date =
			dateFormattedString && dateFormattedString.search(LATEST_TOKEN) === -1
				? dateFormattedString
				: formatDate(new Date())

		const cleaned = date.replace(/[^\d_-]/gi, '')

		return {
			intValue: parseInt(date.replace(/\D/g, ''), 10),
			constValue: `v${namesUtil.toConst(cleaned)}`,
			dirValue: `v${namesUtil.toConst(cleaned)}`,
		}
	},
	latestVersionAtPath(path: string) {
		const resolved = diskUtil.resolvePath(path, '')
		const version = this.getAllVersions(resolved)
		const latest = version.pop()

		if (!latest) {
			// eslint-disable-next-line no-debugger
			debugger
			throw new SpruceError({
				//@ts-ignore
				code: 'NO_VERSIONING_FOUND',
				friendlyMessage: `Expected versioning (e.g. v2020_07_22) at ${path}`,
			})
		}

		return latest
	},

	extractVersion(cwd: string, path: string) {
		const remainingPath = path.replace(cwd, '')
		const pathParts = remainingPath.split(pathUtil.sep)

		while (pathParts.length > 0) {
			const part = pathParts.pop() as string
			if (this.isValidVersion(part)) {
				return this.generateVersion(part)
			}
		}

		throw new SpruceError({
			//@ts-ignore
			code: 'NO_VERSIONING_FOUND',
			friendlyMessage: `Expected versioning (e.g. v2020_07_22) at ${path}`,
		})
	},

	resolvePath(cwd: string, ...paths: string[]) {
		const { dirToRead, resolved } = parsePath(cwd, paths)

		const allDateIsh = this.getAllVersions(dirToRead)

		const latest = allDateIsh.pop()

		if (!latest) {
			// eslint-disable-next-line no-debugger
			debugger
			throw new Error('no versioning found!')
		}

		return resolved.replace(LATEST_HANDLEBARS, latest.dirValue)
	},

	resolveNewLatestPath(cwd: string, ...paths: string[]) {
		const { resolved } = parsePath(cwd, paths)
		return resolved.replace('{{@latest}}', this.generateVersion().dirValue)
	},

	isValidVersion(version: string): boolean {
		try {
			this.assertValidVersion(version)
			return true
		} catch {
			return false
		}
	},

	assertValidVersion(version: string) {
		if (
			version.search(LATEST_TOKEN) === -1 &&
			version.search(/v?\d\d\d\d_\d\d_\d\d/) === -1
		) {
			throw new SpruceError({
				//@ts-ignore
				code: 'INVALID_VERSION',
				friendlyMessage: `Versions must be in the form 'vYYYY_MM_DD' and ${version} doesn't match.`,
			})
		}
	},
}

export default versionUtil
