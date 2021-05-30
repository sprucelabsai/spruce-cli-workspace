import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'
import testUtil from '../../tests/utilities/test.utility'

export default class BootingWithBadFilesTest extends AbstractCliTest {
	@test()
	protected static async bootingWithAEmptySchemaThrowsErrorWithNameOfBadSchema() {
		await this.FeatureFixture().installCachedFeatures('schemas')

		const results = await this.Action('schema', 'sync').execute({})

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'location.schema.ts',
			results.files
		)

		diskUtil.writeFile(match, '')

		const bootResults = await this.Action('skill', 'boot').execute({
			local: true,
		})
		assert.isTruthy(bootResults.errors)

		assert.doesInclude(bootResults.errors[0].message, 'location.schema.ts')
	}
}
