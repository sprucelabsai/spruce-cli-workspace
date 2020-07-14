import os from 'os'
import pathUtil from 'path'
import readline, { Interface } from 'readline'
import { Mercury } from '@sprucelabs/mercury'
import AbstractSpruceTest from '@sprucelabs/test'
import fs from 'fs-extra'
import * as uuid from 'uuid'
import { boot } from './cli'
import ServiceFactory, {
	Service,
	IServiceMap,
} from './factories/ServiceFactory'
import FeatureInstallerFactory from './features/FeatureInstallerFactory'
import TerminalInterface from './interfaces/TerminalInterface'
import StoreFactory, { StoreCode, IStoreMap } from './stores/StoreFactory'
import diskUtil from './utilities/disk.utility'

export default abstract class AbstractCliTest extends AbstractSpruceTest {
	private static rl: Interface | undefined
	protected static cliRoot = pathUtil.join(__dirname)

	protected static freshCwd() {
		const tmpDirectory = pathUtil.join(os.tmpdir(), 'tmp', uuid.v4())
		fs.ensureDirSync(tmpDirectory)

		return tmpDirectory
	}

	protected static resolveTestPath(...pathAfterTestDirsAndFiles: string[]) {
		return pathUtil.join(
			this.cliRoot,
			'__tests__',
			'testDirsAndFiles',
			...pathAfterTestDirsAndFiles
		)
	}

	protected static async beforeAll() {
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		})
	}

	protected static async beforeEach() {
		this.cwd = this.freshCwd()
	}

	protected static async afterAll() {
		this.rl && this.rl.close()
		delete this.rl
	}

	protected static async Cli() {
		const cli = await boot({
			cwd: this.cwd,
		})
		return cli
	}

	protected static Service<S extends Service>(
		type: S,
		cwd?: string
	): IServiceMap[S] {
		const sf = this.ServiceFactory()
		return sf.Service(cwd ?? this.cwd, type)
	}

	protected static ServiceFactory() {
		return new ServiceFactory(new Mercury())
	}

	protected static Term() {
		return new TerminalInterface(this.cwd)
	}

	protected static resolveHashSprucePath(...filePath: string[]) {
		return diskUtil.resolveHashSprucePath(this.cwd, ...filePath)
	}

	protected static async sendInput(input: string) {
		// because there is a delay between sending output to the terminal and it actually rendering and being ready for input, we delay before sending input
		await new Promise((resolve) => setTimeout(resolve, 50))

		if (!this.rl) {
			throw new Error(
				'this.sendInput being called after test is destroyed. This is probably because you forgot an await somewhere.'
			)
		}

		for (let i = 0; i < input.length; i++) {
			// @ts-ignore
			this.rl.input.emit('keypress', input[i])
		}
		// @ts-ignore
		this.rl.input.emit('keypress', null, { name: 'enter' })

		await new Promise((resolve) => setTimeout(resolve, 50))
	}

	protected static FeatureInstaller() {
		const serviceFactory = this.ServiceFactory()
		const storeFactory = this.StoreFactory()

		return FeatureInstallerFactory.WithAllFeatures({
			cwd: this.cwd,
			serviceFactory,
			storeFactory,
		})
	}

	protected static StoreFactory() {
		const mercury = new Mercury()
		const serviceFactory = new ServiceFactory(mercury)
		return new StoreFactory(this.cwd, mercury, serviceFactory)
	}

	protected static Store<C extends StoreCode>(
		code: C,
		cwd?: string
	): IStoreMap[C] {
		return this.StoreFactory().Store(code, this.cwd ?? cwd)
	}
}
