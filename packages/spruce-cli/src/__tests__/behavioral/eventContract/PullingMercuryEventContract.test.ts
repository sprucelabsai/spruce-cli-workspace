import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { CliInterface } from '../../../cli'
import AbstractCliTest from '../../../tests/AbstractCliTest'
import testUtil from '../../../tests/utilities/test.utility'

export default class GeneratingMercuryEventContractTest extends AbstractCliTest {
	private static cli: CliInterface
	protected static async beforeEach() {
		await super.beforeEach()
		this.cli = await this.Cli()
	}

	@test()
	protected static async hasEventContractFeature() {
		assert.isTruthy(this.cli.getFeature('eventContract'))
	}

	@test()
	protected static async hasPullFeature() {
		assert.isFunction(
			this.cli.getFeature('eventContract').Action('pull').execute
		)
	}

	@test()
	protected static async generatesContractAtCwd() {
		const results = await this.cli
			.getFeature('eventContract')
			.Action('pull')
			.execute({})

		testUtil.assertsFileByNameInGeneratedFiles(
			'events.contract.ts',
			results.files
		)

		assert.doesInclude(results.files ?? [], {
			name: 'events.contract.ts',
			action: 'generated',
		})
	}

	@test()
	protected static async savesContractLocallyAndImportsAsDefault() {
		this.cli = await this.FeatureFixture().installCachedFeatures('node')

		const results = await this.cli
			.getFeature('eventContract')
			.Action('pull')
			.execute({})

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'events.contract.ts',
			results.files
		)

		const contracts = await this.Service('import').importDefault(match)

		assert.isArray(contracts)
		assert.isObject(contracts[0].eventSignatures)
		assert.isObject(contracts[0].eventSignatures[`did-message::v2020_12_25`])
	}

	@test()
	protected static async contractHasTypes() {
		this.cli = await this.FeatureFixture().installCachedFeatures('node')

		const results = await this.cli
			.getFeature('eventContract')
			.Action('pull')
			.execute({})

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'events.contract.ts',
			results.files
		)

		const contents = diskUtil.readFile(match)

		assert.doesInclude(
			contents,
			'export type CoreEventContract = typeof coreEventContract'
		)
	}
}
