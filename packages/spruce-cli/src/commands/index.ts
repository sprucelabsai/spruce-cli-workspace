import Autoloader from './Autoloader/AutoloaderCommand'
import Error from './Error/ErrorCommand'
import Remote from './Remote/Remote'
import AbstractCommand, { ICommandOptions } from './Abstract'

export default async function autoLoader(options: {
	constructorOptions: ICommandOptions
	after: (instance: AbstractCommand) => Promise<void>
}) {
	const { constructorOptions, after } = options

	const autoloader = new Autoloader(constructorOptions)
	if (after) {
		await after(autoloader)
	}
	const error = new Error(constructorOptions)
	if (after) {
		await after(error)
	}
	const remote = new Remote(constructorOptions)
	if (after) {
		await after(remote)
	}

	return {
		autoloader,
		error,
		remote
	}
}
