import path from 'path'

/** Helper to resolve paths absolutely and relatively */
export default function resolvePath(
	cwd: string,
	...filePath: string[]
): string {
	let builtPath = path.join(...filePath)

	if (builtPath[0] !== '/') {
		// Relative to the cwd
		if (builtPath.substr(0, 2) === './') {
			builtPath = builtPath.substr(1)
		}

		builtPath = path.join(cwd, builtPath)
	}

	return builtPath
}
