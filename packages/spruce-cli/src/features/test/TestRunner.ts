import pathUtil from 'path'
import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import {
	buildEventContract,
	MercuryEventEmitter,
} from '@sprucelabs/mercury-types'
import { buildSchema } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../../errors/SpruceError'
import CommandService from '../../services/CommandService'
import JestJsonParser from '../../test/JestJsonParser'
import { SpruceTestResults } from './test.types'

const testRunnerContract = buildEventContract({
	eventSignatures: {
		'did-update': {
			emitPayloadSchema: buildSchema({
				id: 'testRunnerDidUpdateEmitPayload',
				fields: {
					results: {
						type: 'raw',
						isRequired: true,
						options: {
							valueType: 'SpruceTestResults',
						},
					},
				},
			}),
		},
	},
})
type TestRunnerContract = typeof testRunnerContract

export default class TestRunner extends AbstractEventEmitter<TestRunnerContract> {
	private cwd: string
	private commandService: CommandService
	private wasKilled = false

	public constructor(options: { cwd: string; commandService: CommandService }) {
		super(testRunnerContract)
		this.cwd = options.cwd
		this.commandService = options.commandService
	}

	public async run(options?: {
		pattern?: string | null
		debugPort?: number | null
	}): Promise<SpruceTestResults & { wasKilled: boolean }> {
		this.wasKilled = false
		const jestPath = this.resolvePathToJest()
		const debugArgs =
			(options?.debugPort ?? 0) > 0 ? `--inspect-brk=${options?.debugPort}` : ``
		const pattern = options?.pattern ?? ''

		const command = `node ${debugArgs} ${jestPath} --reporters="@sprucelabs/jest-json-reporter" --testRunner="jest-circus/runner" ${
			pattern ?? ''
		}`

		const parser = new JestJsonParser()

		let testResults: SpruceTestResults = {
			totalTestFiles: 0,
		}

		try {
			await this.commandService.execute(command, {
				forceColor: true,
				onData: async (data) => {
					parser.write(data)
					testResults = parser.getResults()
					await (this as MercuryEventEmitter<TestRunnerContract>).emit(
						'did-update',
						{ results: testResults }
					)
				},
			})
		} catch (err) {
			if (!testResults.totalTestFiles) {
				throw err
			}
		}

		return { ...testResults, wasKilled: this.wasKilled }
	}

	public kill() {
		this.wasKilled = true
		this.commandService.kill()
	}

	private resolvePathToJest() {
		const jestPath = 'node_modules/.bin/jest'
		const fullPath = diskUtil.resolvePath(this.cwd)
		const pathParts = fullPath.split(pathUtil.sep)

		while (pathParts.length > 0) {
			const path =
				pathUtil.sep + pathUtil.join(...pathParts) + pathUtil.sep + jestPath

			if (diskUtil.doesFileExist(path)) {
				return path
			}

			pathParts.pop()
		}

		throw new SpruceError({ code: 'INVALID_TEST_DIRECTORY', dir: this.cwd })
	}
}
