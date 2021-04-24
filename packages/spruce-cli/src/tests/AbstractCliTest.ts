import pathUtil from 'path'
import { SchemaRegistry } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest, { assert } from '@sprucelabs/test'
import fs from 'fs-extra'
import globby from 'globby'
import * as uuid from 'uuid'
import { CliBootOptions } from '../cli'
import FeatureCommandExecuter from '../features/FeatureCommandExecuter'
import FeatureInstaller from '../features/FeatureInstaller'
import FeatureInstallerFactory from '../features/FeatureInstallerFactory'
import { FeatureActionResponse, FeatureCode } from '../features/features.types'
import OnboardingStore from '../features/onboard/stores/OnboardingStore'
import SkillStore from '../features/skill/stores/SkillStore'
import FeatureFixture, {
	FeatureFixtureOptions,
} from '../fixtures/FeatureFixture'
import MercuryFixture from '../fixtures/MercuryFixture'
import OrganizationFixture from '../fixtures/OrganizationFixture'
import PersonFixture from '../fixtures/PersonFixture'
import SkillFixture from '../fixtures/SkillFixture'
import CliGlobalEmitter, { GlobalEmitter } from '../GlobalEmitter'
import SpyInterface from '../interfaces/SpyInterface'
import ImportService from '../services/ImportService'
import ServiceFactory, { Service, ServiceMap } from '../services/ServiceFactory'
import StoreFactory, {
	StoreCode,
	StoreFactoryMethodOptions,
	StoreMap,
} from '../stores/StoreFactory'
import { ApiClientFactoryOptions } from '../types/apiClient.types'
import AbstractWriter from '../writers/AbstractWriter'
import testUtil from './utilities/test.utility'

export default abstract class AbstractCliTest extends AbstractSpruceTest {
	protected static cliRoot = pathUtil.join(__dirname, '..')
	protected static homeDir: string

	private static _ui: SpyInterface
	private static emitter?: GlobalEmitter
	private static mercuryFixture?: MercuryFixture
	private static personFixture?: PersonFixture
	private static organizationFixture?: OrganizationFixture
	private static skillFixture?: SkillFixture
	private static featureInstaller?: FeatureInstaller

	protected static async beforeAll() {
		await super.beforeAll()
		await this.cleanTestDirsAndFiles()

		AbstractWriter.disableLinting()

		ImportService.setCacheDir(diskUtil.createRandomTempDir())

		process.env.ENABLE_INSTALL_INTERTAINMENT = 'false'
	}

	protected static async beforeEach() {
		await super.beforeEach()
		testUtil.startLogTimer()

		SchemaRegistry.getInstance().forgetAllSchemas()

		this.cwd = this.freshTmpDir()
		this.homeDir = this.freshTmpDir()
		this.emitter = undefined
		this.featureInstaller = undefined

		OnboardingStore.overrideCwd(diskUtil.createRandomTempDir())

		this.ui.reset()
		this.ui.invocations = []
		this.ui.setCursorPosition({ x: 0, y: 0 })

		this.clearFixtures()

		ImportService.clearCache()
	}

	protected static async afterEach() {
		await super.afterEach()

		await this.organizationFixture?.clearAllOrgs()
		await this.mercuryFixture?.disconnectAll()

		SkillStore.reset()

		this.clearFixtures()

		if (this._ui?.isWaitingForInput()) {
			throw new Error(
				`Terminal interface is waiting for input. Make sure you are invoking this.term.sendInput() as many times as needed.`
			)
		}

		if (diskUtil.doesDirExist(this.cwd) && testUtil.shouldClearCache()) {
			diskUtil.deleteDir(this.cwd)
		}

		if (diskUtil.doesDirExist(this.homeDir) && testUtil.shouldClearCache()) {
			diskUtil.deleteDir(this.homeDir)
		}
	}

	private static async cleanTestDirsAndFiles() {
		const pattern = this.resolveTestPath('**/*.d.ts')
		const matches = await globby(pattern)

		for (const match of matches) {
			diskUtil.deleteFile(match)
		}
	}

	private static clearFixtures() {
		this.emitter = undefined
		this.mercuryFixture = undefined
		this.organizationFixture = undefined
		this.personFixture = undefined
		this.skillFixture = undefined
	}

	protected static freshTmpDir() {
		const tmpDirectory = testUtil.resolveTestDir(uuid.v4())
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

	protected static async afterAll() {
		await super.afterAll()
		if (testUtil.shouldCleanupTestSkillDirs()) {
			FeatureFixture.deleteOldSkillDirs()
		}
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

	protected static ServiceFactory() {
		return new ServiceFactory()
	}

	protected static FeatureFixture(options?: Partial<FeatureFixtureOptions>) {
		return new FeatureFixture({
			cwd: this.cwd,
			serviceFactory: this.ServiceFactory(),
			ui: this.ui,
			emitter: this.Emitter(),
			apiClientFactory: this.MercuryFixture().getApiClientFactory(),
			...options,
		})
	}

	protected static MercuryFixture() {
		if (!this.mercuryFixture) {
			this.mercuryFixture = new MercuryFixture(this.cwd, this.ServiceFactory())
		}

		return this.mercuryFixture
	}

	protected static PersonFixture() {
		if (!this.personFixture) {
			this.personFixture = new PersonFixture(
				this.MercuryFixture().getApiClientFactory()
			)
		}

		return this.personFixture
	}

	protected static OrganizationFixture() {
		if (!this.organizationFixture) {
			this.organizationFixture = new OrganizationFixture(
				this.PersonFixture(),
				this.StoreFactory()
			)
		}

		return this.organizationFixture
	}

	protected static SkillFixture() {
		if (!this.skillFixture) {
			this.skillFixture = new SkillFixture(
				this.PersonFixture(),
				this.StoreFactory(),
				this.MercuryFixture().getApiClientFactory()
			)
		}

		return this.skillFixture
	}

	protected static resolveHashSprucePath(...filePath: string[]) {
		return diskUtil.resolveHashSprucePath(this.cwd, ...filePath)
	}

	protected static FeatureInstaller() {
		if (!this.featureInstaller) {
			const serviceFactory = this.ServiceFactory()
			const storeFactory = this.StoreFactory()
			const emitter = this.Emitter()
			const apiClientFactory = this.MercuryFixture().getApiClientFactory()

			this.featureInstaller = FeatureInstallerFactory.WithAllFeatures({
				cwd: this.cwd,
				serviceFactory,
				storeFactory,
				ui: this.ui,
				emitter,
				apiClientFactory,
			})
		}

		return this.featureInstaller
	}

	protected static StoreFactory() {
		const serviceFactory = this.ServiceFactory()

		return new StoreFactory({
			cwd: this.cwd,
			serviceFactory,
			homeDir: this.homeDir,
			apiClientFactory: this.MercuryFixture().getApiClientFactory(),
			emitter: this.Emitter(),
		})
	}

	protected static Store<C extends StoreCode>(
		code: C,
		options?: StoreFactoryMethodOptions
	): StoreMap[C] {
		return this.StoreFactory().Store(code, {
			cwd: this.cwd,
			...options,
		})
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

	protected static async assertValidActionResponseFiles(
		results: FeatureActionResponse
	) {
		// for (const file of results.files ?? []) {
		// 	const checker = this.Service('typeChecker')
		// 	await checker.check(file.path)
		// }

		await Promise.all(
			(results.files ?? []).map((file) => {
				const checker = this.Service('typeChecker')
				return checker.check(file.path)
			})
		)
	}

	protected static async connectToApi(options?: ApiClientFactoryOptions) {
		return this.MercuryFixture().connectToApi(options)
	}

	protected static async openInVsCode(options?: {
		file?: string
		dir?: string
		timeout?: number
	}) {
		const cli = await this.Cli()
		await cli.getFeature('vscode').Action('setup').execute({ all: true })

		await this.Service('command').execute(
			`code ${options?.file ?? options?.dir ?? this.cwd}`
		)
		await this.wait(options?.timeout ?? 99999999)
	}

	protected static log(...args: any[]) {
		testUtil.log(...args)
	}

	protected static Executer<F extends FeatureCode>(
		featureCode: F,
		actionCode: string
	) {
		const featureInstaller = this.FeatureInstaller()

		const executer = new FeatureCommandExecuter({
			featureCode,
			actionCode,
			featureInstaller,
			term: this.ui,
			emitter: this.Emitter(),
		})

		return executer
	}
}
