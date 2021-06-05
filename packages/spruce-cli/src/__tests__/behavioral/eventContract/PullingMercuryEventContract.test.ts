import { EventContract } from '@sprucelabs/mercury-types'
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
		assert.isFunction(this.Action('eventContract', 'pull').execute)
	}

	@test()
	protected static async generatesContractAtCwd() {
		const results = await this.Action('eventContract', 'pull').execute({})

		const match = testUtil.assertFileByNameInGeneratedFiles(
			'events.contract.ts',
			results.files
		)

		assert.isEqual(match, this.resolvePath('events.contract.ts'))

		assert.doesInclude(results.files ?? [], {
			name: 'events.contract.ts',
			action: 'generated',
		})

		const contents = diskUtil.readFile(match)

		assert.doesInclude(
			contents,
			"import { buildEventContract } from '@sprucelabs/mercury-types'"
		)
	}

	@test()
	protected static async savesContractLocallyAndImportsAsDefault() {
		const contracts = await this.pullAndLoadContracts()

		assert.isArray(contracts)
		assert.isObject(contracts[0].eventSignatures)
		assert.isObject(contracts[0].eventSignatures[`did-message::v2020_12_25`])
	}

	@test()
	protected static async pullsGlobalContracts() {
		const contracts = await this.pullAndLoadContracts()
		assert.isAbove(contracts.length, 1)
		assert.isObject(contracts[1].eventSignatures)

		assert.isObject(
			contracts[1].eventSignatures[
				`heartwood.register-skill-views::v2021_02_11`
			]
		)
	}

	@test()
	protected static async contractHasTypes() {
		this.cli = await this.FeatureFixture().installCachedFeatures('node')

		const results = await this.Action('eventContract', 'pull').execute({})

		const match = testUtil.assertFileByNameInGeneratedFiles(
			'events.contract.ts',
			results.files
		)

		const contents = diskUtil.readFile(match)

		assert.doesInclude(contents, 'export default eventContracts')
		assert.doesInclude(contents, 'as const')
		assert.doesInclude(
			contents,
			'export type CoreEventContract = typeof eventContracts[0] & typeof eventContracts[1]'
		)
	}

	@test()
	protected static async generatingASecondTimeReportsAnUpdate() {
		await this.Action('eventContract', 'pull').execute({})

		const results = await this.Action('eventContract', 'pull').execute({})

		testUtil.assertFileByNameInGeneratedFiles(
			'events.contract.ts',
			results.files
		)

		assert.doesInclude(results.files ?? [], {
			name: 'events.contract.ts',
			action: 'updated',
		})
	}

	private static async pullAndLoadContracts() {
		this.cli = await this.FeatureFixture().installCachedFeatures('events')

		const results = await this.Action('eventContract', 'pull').execute({})

		const match = testUtil.assertFileByNameInGeneratedFiles(
			'events.contract.ts',
			results.files
		)

		const contracts = await this.Service('import').importDefault(match)
		return contracts as EventContract[]
	}
}
