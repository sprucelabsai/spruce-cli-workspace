import os from 'os'
import pathUtil from 'path'
import { Mercury } from '@sprucelabs/mercury'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest from '@sprucelabs/test'
import fs from 'fs-extra'
import * as uuid from 'uuid'
import { ICliBootOptions } from './cli'
import FeatureInstallerFactory from './features/FeatureInstallerFactory'
import FeatureFixture from './fixtures/FeatureFixture'
import TestInterface from './interfaces/TestInterface'
import ServiceFactory, { Service, IServiceMap } from './services/ServiceFactory'
import StoreFactory, { StoreCode, IStoreMap } from './stores/StoreFactory'
import { IGraphicsInterface } from './types/cli.types'

export default abstract class AbstractCliTest extends AbstractSpruceTest {
	protected static cliRoot = pathUtil.join(__dirname)
	private static _term: IGraphicsInterface

	protected static freshCwd() {
		const tmpDirectory = pathUtil.join(os.tmpdir(), 'spruce-cli', uuid.v4())
		fs.ensureDirSync(tmpDirectory)

		return tmpDirectory
	}

	protected static get term(): IGraphicsInterface {
		if (!this._term) {
			this._term = new TestInterface()
		}

		return this._term
	}

	protected static resolveTestPath(...pathAfterTestDirsAndFiles: string[]) {
		return pathUtil.join(
			this.cliRoot,
			'__tests__',
			'testDirsAndFiles',
			...pathAfterTestDirsAndFiles
		)
	}

	protected static async beforeEach() {
		await super.beforeEach()
		this.cwd = this.freshCwd()
	}

	protected static async afterEach() {
		await super.afterEach()

		if (this._term) {
			const term = this._term as TestInterface
			if (term.isWaitingForInput()) {
				throw new Error(
					`Terminal interface is waiting for input. Make sure you are invoking this.term.sendInput() as many times as needed.`
				)
			}
		}
	}

	protected static async afterAll() {
		await super.afterAll()
		FeatureFixture.deleteOldSkillDirs()
	}

	protected static async Cli(options?: ICliBootOptions) {
		return this.FeatureFixture().Cli({
			cwd: this.cwd,
			...(options ?? {}),
		})
	}

	protected static async linkLocalPackages() {
		const fixture = this.FeatureFixture()
		await fixture.linkLocalPackages()
	}

	protected static Service<S extends Service>(
		type: S,
		cwd?: string
	): IServiceMap[S] {
		const sf = this.ServiceFactory()
		return sf.Service(cwd ?? this.cwd, type)
	}

	protected static ServiceFactory(options?: { importCacheDir?: string }) {
		return new ServiceFactory({ mercury: new Mercury(), ...(options || {}) })
	}

	protected static FeatureFixture() {
		return new FeatureFixture(this.cwd, this.ServiceFactory(), this.term)
	}

	protected static resolveHashSprucePath(...filePath: string[]) {
		return diskUtil.resolveHashSprucePath(this.cwd, ...filePath)
	}

	protected static FeatureInstaller() {
		const serviceFactory = this.ServiceFactory()
		const storeFactory = this.StoreFactory()

		return FeatureInstallerFactory.WithAllFeatures({
			cwd: this.cwd,
			serviceFactory,
			storeFactory,
			term: this.term,
		})
	}

	protected static StoreFactory() {
		const mercury = new Mercury()
		const serviceFactory = this.ServiceFactory()
		return new StoreFactory(this.cwd, mercury, serviceFactory)
	}

	protected static Store<C extends StoreCode>(
		code: C,
		cwd?: string
	): IStoreMap[C] {
		return this.StoreFactory().Store(code, this.cwd ?? cwd)
	}
}
