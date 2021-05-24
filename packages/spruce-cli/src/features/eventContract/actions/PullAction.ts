import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const pullOptionsSchema = buildSchema({
	id: 'pullActionSchema',
	description:
		'Pulls the event contracts from Mercury down to a single file for easy distribution.',
	fields: {},
})
type PullOptionsSchema = typeof pullOptionsSchema
type Options = SchemaValues<PullOptionsSchema>

export default class PullAction extends AbstractFeatureAction<PullOptionsSchema> {
	public code = 'pull'
	public commandAliases = ['pull.event.contracts']
	public optionsSchema = pullOptionsSchema
	public invocationMessage = 'Pulling combined event contract... 🜒'

	public async execute(_options: Options): Promise<FeatureActionResponse> {
		const filename = 'events.contract.ts'

		const { contracts } = await this.Store('event').fetchEventContracts()

		let destination = diskUtil.resolvePath(this.cwd, filename)
		let buildEventContractImport = `import { buildEventContract } from '@sprucelabs/mercury-types'`

		try {
			const pkg = this.Service('pkg')
			const name = pkg.get('name')

			if (name === '@sprucelabs/mercury-types') {
				destination = diskUtil.resolvePath(this.cwd, 'src', filename)
				buildEventContractImport = `import buildEventContract from './utilities/buildEventContract'`
			}
			// eslint-disable-next-line no-empty
		} catch {}

		const contents = `${buildEventContractImport}\n\nconst coreEventContract = buildEventContract(${JSON.stringify(
			contracts[0]
		)})\n\nconst coreEventContracts = [coreEventContract]\n\nexport default coreEventContracts\n\nexport type CoreEventContract = typeof coreEventContract`

		const action = diskUtil.doesFileExist(destination) ? 'updated' : 'generated'

		diskUtil.writeFile(destination, contents)

		return {
			files: [
				{
					name: filename,
					path: destination,
					action,
					description: 'All your Mercury core events ready for testing!',
				},
			],
		}
	}
}
