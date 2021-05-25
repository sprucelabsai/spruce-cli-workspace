import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'
import testUtil from '../../tests/utilities/test.utility'

export default class BootingWithBadFilesTest extends AbstractCliTest {
	@test()
	protected static async bootingWithAEmptySchemaThrowsErrorWithNameOfBadSchema() {
		const cli = await this.FeatureFixture().installCachedFeatures('schemas')

		const results = await cli.getFeature('schema').Action('sync').execute({})

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'location.schema.ts',
			results.files
		)

		diskUtil.writeFile(match, '')

		await assert.doesThrowAsync(
			async () =>
				cli.getFeature('skill').Action('boot').execute({ local: true }),
			'location.schema.ts'
		)
	}
}
