import os from 'os'
import pathUtil from 'path'
import { MercuryClientFactory } from '@sprucelabs/mercury-client'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest, { assert } from '@sprucelabs/test'
import fs from 'fs-extra'
import * as uuid from 'uuid'
import { CliBootOptions } from '../cli'
import FeatureInstallerFactory from '../features/FeatureInstallerFactory'
import { FeatureCode } from '../features/features.types'
import FeatureFixture, {
	FeatureFixtureOptions,
	TEST_HOST,
} from '../fixtures/FeatureFixture'
import CliGlobalEmitter, { GlobalEmitter } from '../GlobalEmitter'
import SpyInterface from '../interfaces/SpyInterface'
import ServiceFactory, { Service, ServiceMap } from '../services/ServiceFactory'
import { ApiClient } from '../stores/AbstractStore'
import StoreFactory, { StoreCode, StoreMap } from '../stores/StoreFactory'

export default abstract class AbstractCliTest extends AbstractSpruceTest {
	protected static cliRoot = pathUtil.join(__dirname, '..')
	protected static homeDir: string
	protected static apiClient: ApiClient

	private static _ui: SpyInterface
	private static emitter: GlobalEmitter

	protected static async beforeEach() {
		await super.beforeEach()

		this.cwd = this.freshTmpDir()
		this.homeDir = this.freshTmpDir()

		this.ui.reset()
		this.ui.invocations = []
		this.ui.setCursorPosition({ x: 0, y: 0 })
	}

	protected static freshTmpDir() {
		const tmpDirectory = pathUtil.join(os.tmpdir(), 'spruce-cli', uuid.v4())
		fs.ensureDirSync(tmpDirectory)

		return tmpDirectory
	}

	protected static get ui() {
		if (!this._ui) {
			this._ui = new SpyInterface()
		}

		return this._ui
	}

	protected static Emitter() {
		if (!this.emitter) {
			this.emitter = CliGlobalEmitter.Emitter()
		}
		return this.emitter
	}

	protected static resolveTestPath(...pathAfterTestDirsAndFiles: string[]) {
		return pathUtil.join(
			this.cliRoot,
			'__tests__',
			'testDirsAndFiles',
			...pathAfterTestDirsAndFiles
		)
	}

	protected static async afterEach() {
		await super.afterEach()

		await this.apiClient?.disconnect()

		if (this._ui) {
			if (this._ui.isWaitingForInput()) {
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

	protected static async Cli(options?: CliBootOptions) {
		return this.FeatureFixture().Cli({
			cwd: this.cwd,
			homeDir: this.homeDir,
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
	): ServiceMap[S] {
		const sf = this.ServiceFactory()
		return sf.Service(cwd ?? this.cwd, type)
	}

	protected static ServiceFactory(options?: { importCacheDir?: string }) {
		return new ServiceFactory({ ...(options || {}) })
	}

	protected static FeatureFixture(options?: Partial<FeatureFixtureOptions>) {
		return new FeatureFixture({
			cwd: this.cwd,
			serviceFactory: this.ServiceFactory(),
			ui: this.ui,
			...options,
		})
	}

	protected static resolveHashSprucePath(...filePath: string[]) {
		return diskUtil.resolveHashSprucePath(this.cwd, ...filePath)
	}

	protected static FeatureInstaller() {
		const serviceFactory = this.ServiceFactory()
		const storeFactory = this.StoreFactory()
		const emitter = this.Emitter()

		return FeatureInstallerFactory.WithAllFeatures({
			cwd: this.cwd,
			serviceFactory,
			storeFactory,
			ui: this.ui,
			emitter,
		})
	}

	protected static StoreFactory() {
		const serviceFactory = this.ServiceFactory()

		return new StoreFactory({
			cwd: this.cwd,
			serviceFactory,
			homeDir: this.homeDir,
			apiClientFactory: async () => {
				if (!this.apiClient) {
					this.apiClient = await MercuryClientFactory.Client({
						host: TEST_HOST,
					})
				}

				return this.apiClient
			},
		})
	}

	protected static Store<C extends StoreCode>(
		code: C,
		cwd?: string
	): StoreMap[C] {
		return this.StoreFactory().Store(code, this.cwd ?? cwd)
	}

	protected static async waitForInput() {
		while (!this.ui.isWaitingForInput()) {
			await new Promise((resolve) => setTimeout(resolve, 100))
		}
	}

	protected static async assertIsFeatureInstalled(code: FeatureCode) {
		const featureInstaller = this.FeatureInstaller()
		const isInstalled = await featureInstaller.isInstalled(code)

		assert.isTrue(isInstalled)
	}
}
