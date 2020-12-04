import { test, assert } from '@sprucelabs/test'
import AbstractTestTest from '../../../test/AbstractTestTest'
import testUtil from '../../../utilities/test.utility'

export default class CreatingBehavioralTestsTest extends AbstractTestTest {
	@test()
	protected static async hasCreateAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('test').Action('create').execute)
	}

	@test()
	protected static async canCreateBehavioralTest() {
		const cli = await this.installTests('tests')
		const response = await cli.getFeature('test').Action('create').execute({
			type: 'behavioral',
			nameReadable: 'Can book appointment',
			nameCamel: 'canBookAppointment',
			namePascal: 'CanBookAppointment',
		})

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'CanBookAppointment.test.ts',
			response.files
		)

		assert.doesInclude(match, 'behavioral')

		await this.Service('build').build()

		await assert.doesThrowAsync(
			() => this.Service('command').execute('yarn test'),
			/false.*?does not equal.*?true/gis
		)
	}
}
