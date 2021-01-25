import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const pullOptionsSchema = buildSchema({ id: 'pullActionSchema', fields: {} })
type PullOptionsSchema = typeof pullOptionsSchema
type Options = SchemaValues<PullOptionsSchema>

export default class PullAction extends AbstractFeatureAction<PullOptionsSchema> {
	public code = 'pull'
	public commandAliases = ['pull.event.contracts']
	public optionsSchema = pullOptionsSchema

	public async execute(_options: Options): Promise<FeatureActionResponse> {
		const filename = 'events.contract.ts'

		const { contracts } = await this.Store('event').fetchEventContracts()

		const destination = diskUtil.resolvePath(this.cwd, 'src', filename)

		const contents = `import buildEventContract from './utilities/buildEventContract'\n\nconst coreEventContract = buildEventContract(${JSON.stringify(
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
					description: 'All your Mercury Core Events ready for production use!',
				},
			],
		}
	}
}
