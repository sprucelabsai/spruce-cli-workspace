import { test, assert } from '@sprucelabs/test'
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
		await this.pkg.install('@sprucelabs/spruce-store-plugin')

		const version = this.pkg.get('dependencies.@sprucelabs/spruce-store-plugin')

		assert.isEqual(version, 'latest')
	}

	@test()
	protected static async handlesAtLatestInName() {
		await this.pkg.install('@sprucelabs/heartwood-view-controllers@latest')

		const version = this.pkg.get(
			'dependencies.@sprucelabs/heartwood-view-controllers'
		)

		assert.isEqual(version, 'latest')
	}

	@test()
	protected static async setsLatestIfDevDpendency() {
		await this.pkg.install('@sprucelabs/data-stores', {
			isDev: true,
		})

		const version = this.pkg.get('devDependencies.@sprucelabs/data-stores')
		assert.isEqual(version, 'latest')
	}

	@test()
	protected static async updatesSpruceSkillsToLatestEvenIfAlreadyInstalled() {
		const dep = 'dependencies.@sprucelabs/spruce-skill-booter'
		this.pkg.set({
			path: dep,
			value: '^4.2.18',
		})

		await this.pkg.install('@sprucelabs/spruce-skill-booter')

		const version = this.pkg.get(dep)
		assert.isEqual(version, 'latest')
	}
}
