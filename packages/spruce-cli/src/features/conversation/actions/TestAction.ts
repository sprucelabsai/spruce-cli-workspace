import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'testConversationOptions',
	fields: {
		shouldReturnImmediately: {
			type: 'boolean',
			isPrivate: true,
		},
		shouldRunSilently: {
			type: 'boolean',
			isPrivate: true,
		},
	},
})

type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>
export default class TestAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'test'
	public optionsSchema = optionsSchema
	public commandAliases = ['test.conversation']
	private killHandler?: () => void

	public async execute(options: Options): Promise<FeatureActionResponse> {
		this.ui.clear()

		const {
			shouldReturnImmediately,
			shouldRunSilently,
		} = this.validateAndNormalizeOptions(options)

		try {
			const command = this.Service('command')

			const promise = new Promise((resolve, reject) => {
				command
					.execute('yarn boot.local', {
						shouldStream: !shouldRunSilently,
						env: {
							ACTION: 'test.conversation',
						},
					})
					.then(resolve)
					.catch(reject)
			})

			this.killHandler = command.kill.bind(command)

			if (shouldReturnImmediately) {
				return {
					meta: {
						kill: this.killHandler,
						pid: command.pid() as number,
						promise,
					},
				}
			} else {
				await promise
			}
		} catch (err) {
			debugger
			console.log(err)
		}

		return {
			summaryLines: ['Talk soon! 👋'],
		}
	}

	public async kill() {
		this.killHandler?.()
	}
}
