import { Mercury } from '@sprucelabs/mercury'
import { IUtilities } from '#spruce/autoloaders/utilities'

export interface IServiceOptions {
	cwd: string
	mercury: Mercury
	utilities: IUtilities
}

export interface IMutex {
	promises: Promise<any>[]
	resolvers: (() => void)[]
	count: number
}

export default abstract class AbstractService {
	public mercury: Mercury
	public cwd: string
	public utilities: IUtilities
	private mutex: Record<string, IMutex> = {}

	public constructor(options: IServiceOptions) {
		const { cwd, mercury, utilities } = options
		this.mercury = mercury
		this.cwd = cwd
		this.utilities = utilities
	}

	/**
	 * To stop race conditions, you can have requests wait before starting the next.
	 *
	 * @param {String} key
	 */
	public async wait(key: string): Promise<void> {
		if (!this.mutex[key]) {
			this.mutex[key] = {
				promises: [],
				resolvers: [],
				count: 0
			}
		}

		//Track which we are on
		this.mutex[key].count++

		//First is always auto resolved since no one is waiting
		if (this.mutex[key].count === 1) {
			this.mutex[key].promises.push(new Promise(resolve => resolve()))
			this.mutex[key].resolvers.push(() => {})
		} else {
			const resolver = (resolve: any): void => {
				this.mutex[key].resolvers.push(resolve)
			}
			const promise = new Promise(resolver)
			this.mutex[key].promises.push(promise)
		}

		return this.mutex[key].promises[this.mutex[key].count - 1]
	}

	/**
	 * Long operation is complete, start up again.
	 *
	 * @param {String} key
	 */
	public async go(key: string): Promise<void> {
		if (this.mutex[key]) {
			//Remove this promise
			this.mutex[key].promises.shift()
			this.mutex[key].resolvers.shift()
			this.mutex[key].count--

			//If we are done, clear
			if (this.mutex[key].count === 0) {
				delete this.mutex[key]
			} else {
				//Otherwise resolve the next promise
				this.mutex[key].resolvers[0]()
			}
		}
	}
}
