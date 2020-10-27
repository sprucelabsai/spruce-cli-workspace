import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractTestTest from '../../../test/AbstractTestTest'

export default class RunningTestsTest extends AbstractTestTest {
	@test()
	protected static async hasTestAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('test').Action('test').execute)
	}

	@test()
	protected static async runningTestsActuallyRunsTests() {
		const cli = await this.installTests('tests')
		const creationResults = await cli
			.getFeature('test')
			.Action('create')
			.execute({
				type: 'behavioral',
				nameReadable: 'Can book appointment',
				nameCamel: 'canBookAppointment',
				namePascal: 'CanBookAppointment',
			})

		const file = creationResults.files?.[0]
		assert.isTruthy(file)

		const contents = diskUtil.readFile(file.path)
		const passingContent = contents.replace(
			'assert.isTrue(false)',
			'assert.isTrue(true)'
		)

		diskUtil.writeFile(file.path, passingContent)

		await cli.getFeature('test').Action('create').execute({
			type: 'behavioral',
			nameReadable: 'Can cancel appointment',
			nameCamel: 'canCancelAppointment',
			namePascal: 'CanCancelAppointment',
		})

		await this.Service('build').build()

		const results = await cli.getFeature('test').Action('test').execute({})

		assert.isFalsy(results.errors)
		assert.isTruthy(results.meta?.testResults)
		// 		assert.isEqualDeep(results.meta, {
		// 			testResults: {
		// 				totalTestFiles: 2,
		// 				testFiles: [
		// 					{
		// 						testFile: 'behavioral/CanCancelAppointment.test.ts',
		// 						status: 'failed',
		// 						tests: [
		// 							{
		// 								name: 'canCancelAppointment',
		// 								status: 'failed',
		// 								errorMessages: [
		// 									`Error:

		// false

		//  does not equal

		// true

		//     at Object.fail (/private/var/folders/qw/v2bfr0c94bn37vclwvcltsj40000gn/T/spruce-cli/9480d08d-f4a7-47e9-9c86-35f9df426f5e/node_modules/@sprucelabs/test/src/utilities/assert.utility.ts:12:9)
		//     at Object.isEqual (/private/var/folders/qw/v2bfr0c94bn37vclwvcltsj40000gn/T/spruce-cli/9480d08d-f4a7-47e9-9c86-35f9df426f5e/node_modules/@sprucelabs/test/src/assert.ts:99:9)
		//     at Object.assert (/private/var/folders/qw/v2bfr0c94bn37vclwvcltsj40000gn/T/spruce-cli/9480d08d-f4a7-47e9-9c86-35f9df426f5e/node_modules/@sprucelabs/test/src/assert.ts:185:8)
		//     at _callee$ (/private/var/folders/qw/v2bfr0c94bn37vclwvcltsj40000gn/T/spruce-cli/9480d08d-f4a7-47e9-9c86-35f9df426f5e/src/__tests__/behavioral/CanCancelAppointment.test.ts:8:3)`,
		// 								],
		// 								duration: 14,
		// 							},
		// 						],
		// 					},
		// 					{
		// 						testFile: 'behavioral/CanBookAppointment.test.ts',
		// 						status: 'passed',
		// 						tests: [
		// 							{
		// 								name: 'canBookAppointment',
		// 								status: 'passed',
		// 								errorMessages: [],
		// 								duration: 1,
		// 							},
		// 						],
		// 					},
		// 				],
		// 				totalTestFilesComplete: 2,
		// 				totalFailed: 1,
		// 				totalPassed: 1,
		// 				totalTests: 2,
		// 			},
		// 		})
	}
}
