import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import ImportService from '../../services/ImportService'

export default class CachingImportsTest extends AbstractCliTest {
	private static importService: ImportService

	protected static async beforeAll() {
		super.beforeAll()
		this.importService = this.ServiceFactory({
			importCacheDir: diskUtil.createRandomTempDir(),
		}).Service(this.cwd, 'import')
	}

	protected static async beforeEach() {
		super.beforeEach()
		this.importService.clearCache()
	}

	@test()
	protected static async canTellIfFileChanged() {
		const test1Path = this.resolvePath('test1.js')
		diskUtil.writeFile(test1Path, 'module.exports = { hello: "world"}')

		await this.assertImportedCorrectly(test1Path, { hello: 'world' })

		diskUtil.writeFile(test1Path, 'module.exports = { foo: "bar"}')

		await this.assertImportedCorrectly(test1Path, { foo: 'bar' })
	}

	private static async assertImportedCorrectly(
		test1Path: string,
		expected: Record<string, any>
	) {
		const contents = await this.importService.importAll(test1Path)
		assert.isEqualDeep(contents, expected)
	}

	@test()
	protected static async canTellIfRelatedFileChanges() {
		const test1Path = this.resolvePath('test1.js')
		diskUtil.writeFile(
			test1Path,
			'const value = require("./test2"); module.exports = { hello: value }'
		)

		const test2Path = this.resolvePath('test2.js')
		diskUtil.writeFile(test2Path, 'module.exports = "world"')

		await this.assertImportedCorrectly(test1Path, { hello: 'world' })

		diskUtil.writeFile(test2Path, 'module.exports = "bar"')
		await this.assertImportedCorrectly(test1Path, { hello: 'bar' })
	}

	@test()
	protected static async canTellIfFilesChangedInASkill() {
		await this.FeatureFixture().installFeatures(
			[
				{
					code: 'skill',
					options: {
						name: 'file-change-skill',
						description: 'It should be good',
					},
				},
			],
			'caching-imports'
		)

		const test1Path = this.resolvePath('src/test1.ts')
		diskUtil.writeFile(
			test1Path,
			"import { value } from './test2'\nexport const wrapper = { hello: value }"
		)

		const test2Path = this.resolvePath('src/test2.ts')
		diskUtil.writeFile(test2Path, 'export const value = "world"')

		await this.assertImportedCorrectly(test1Path, {
			wrapper: { hello: 'world' },
		})

		diskUtil.writeFile(test2Path, 'export const value = "bar"')
		await this.assertImportedCorrectly(test1Path, { wrapper: { hello: 'bar' } })
	}
}
