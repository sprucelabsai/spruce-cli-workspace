import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import CombinedTypesImportExtractor from '../../CombinedTypesImportExtractor'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class CombinedTypesBuilderTest extends AbstractCliTest {
	protected static async beforeEach() {
		await super.beforeEach()
	}

	private static Builder(cwd?: string) {
		return new CombinedTypesImportExtractor(cwd ?? this.cwd)
	}

	@test()
	protected static async canCreateCombinedTypesBuilder() {
		assert.isTruthy(this.Builder())
	}

	@test()
	protected static async throwsWhenMissingSrc() {
		//@ts-ignore
		const err = assert.doesThrow(() => new CombinedTypesImportExtractor())
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['cwd'],
		})
	}

	@test()
	protected static async throwsWithBadSrc() {
		const badDir = '/waka-waka/' + new Date().getTime()
		const err = assert.doesThrow(() => this.Builder(badDir))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['cwd'],
		})
	}

	@test()
	protected static async returnsNoImportsIfNoTypesFilesExist() {
		const emptyDir = diskUtil.createRandomTempDir()
		const results = await this.Builder(emptyDir).extractTypes()
		assert.isArray(results)
		assert.isLength(results, 0)
	}

	@test()
	protected static async onlyLikesDotTypesFiles() {
		diskUtil.writeFile(this.resolvePath('stores.ts'), '')
		const results = await this.Builder().extractTypes()

		assert.isEqualDeep(results, [])
	}

	@test()
	protected static async importsASingleTypesFile() {
		diskUtil.writeFile(this.resolvePath('stores.types.ts'), '')
		const results = await this.Builder().extractTypes()

		assert.isEqualDeep(results, ['./stores.types'])
	}

	@test()
	protected static async ignoresSkillTypes() {
		diskUtil.writeFile(this.resolvePath('skill.types.ts'), '')
		const results = await this.Builder().extractTypes()

		assert.isEqualDeep(results, [])
	}
}
