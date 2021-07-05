import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import CommandService from '../../services/CommandService'
import PkgService from '../../services/PkgService'
import AbstractSkillTest from '../../tests/AbstractSkillTest'

export default class PkgServiceTest extends AbstractSkillTest {
	protected static skillCacheKey = 'skills'
	private static pkg: PkgService

	protected static async beforeEach() {
		await super.beforeEach()
		this.pkg = this.Service('pkg')
	}

	@test()
	protected static async canCreatePkgService() {
		const pkg = PkgServiceTest.beforeEach()
		assert.isTruthy(pkg)
	}

	@test()
	protected static async installANonSpruceLabsModuleMakesItsVersionAnActualVersion() {
		const version = this.pkg.get('dependencies.dotenv')
		assert.isNotEqual(version, 'latest')
	}

	@test()
	protected static async installASpruceLabsModuleMakesItsVersionLatest() {
		CommandService.setMockResponse(new RegExp(/yarn/gis), {
			code: 0,
		})

		await this.pkg.install('@sprucelabs/spruce-store-plugin')

		const version = this.pkg.get('dependencies.@sprucelabs/spruce-store-plugin')

		assert.isEqual(version, 'latest')
	}

	@test()
	protected static async handlesAtLatestInName() {
		CommandService.setMockResponse(new RegExp(/yarn/gis), {
			code: 0,
		})

		await this.pkg.install('@sprucelabs/heartwood-view-controllers@latest')

		const version = this.pkg.get(
			'dependencies.@sprucelabs/heartwood-view-controllers'
		)

		assert.isEqual(version, 'latest')
	}

	@test()
	protected static async setsLatestIfDevDpendency() {
		CommandService.setMockResponse(new RegExp(/yarn/gis), {
			code: 0,
		})

		await this.pkg.install('@sprucelabs/data-stores', {
			isDev: true,
		})

		const version = this.pkg.get('devDependencies.@sprucelabs/data-stores')
		assert.isEqual(version, 'latest')
	}

	@test()
	protected static async updatesSpruceSkillsToLatestEvenIfAlreadyInstalled() {
		CommandService.setMockResponse(new RegExp(/yarn/gis), {
			code: 0,
		})

		const dep = 'dependencies.@sprucelabs/spruce-skill-booter'
		this.pkg.set({
			path: dep,
			value: '^4.2.18',
		})

		await this.pkg.install('@sprucelabs/spruce-skill-booter')

		const version = this.pkg.get(dep)
		assert.isEqual(version, 'latest')
	}

	@test()
	protected static async ifInstallingOnlySpruceModulesShouldNotRunNPMAdd() {
		CommandService.setMockResponse(new RegExp(/npm.*?install/gis), {
			code: 1,
		})

		const { totalInstalled } = await this.pkg.install(
			'@sprucelabs/jest-json-reporter'
		)

		assert.isEqual(totalInstalled, 1)

		const expectedPath = this.resolvePath(
			'node_modules',
			'@sprucelabs',
			'jest-json-reporter'
		)

		assert.isTrue(
			diskUtil.doesFileExist(expectedPath),
			`No module installed at ${expectedPath}.`
		)
	}

	@test()
	protected static async spruceModulesNeverInstalled() {
		CommandService.setMockResponse(
			new RegExp(/npm.*?install.*?sprucelabs/gis),
			{
				code: 1,
			}
		)
		const { totalInstalled } = await this.pkg.install([
			'@sprucelabs/jest-json-parser',
			'react',
		])

		assert.isEqual(totalInstalled, 2)
	}
}
