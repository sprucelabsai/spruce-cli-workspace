import { IAutoloaded } from '#spruce/autoloaders'
import { IUtilities } from '#spruce/autoloaders/utilities'
import Autoloadable from '../Autoloadable'
export interface IUtilityOptions {
	cwd: string
}
export default abstract class AbstractUtility extends Autoloadable {
	public utilities!: IUtilities
	public constructor(options: IUtilityOptions) {
		super(options)
		const { cwd } = options
		this.cwd = cwd
	}

	public async afterAutoload(autoloaded: IAutoloaded) {
		this.utilities = autoloaded.utilities
	}
}
