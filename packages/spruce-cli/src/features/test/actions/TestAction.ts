import { Writable } from 'stream'
import tty from 'tty'
import { buildSchema } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export const optionsSchema = buildSchema({
	id: 'testAction',
	name: 'Test skill',
	fields: {},
})

class TtyStream extends tty.WriteStream {
	public hasColors() {
		return true
	}

	public emit(...args: any[]) {
		console.log('EMIT', args)
		return this
	}

	public isTTY = false
}

class WritableStream extends Writable {}

export type ActionSchema = typeof optionsSchema

export default class TestAction extends AbstractFeatureAction<ActionSchema> {
	public name = 'test'
	public optionsSchema = optionsSchema

	public async execute(): Promise<IFeatureActionExecuteResponse> {
		debugger
		const outStream = new TtyStream(1)

		await this.Service('command').execute('yarn test', {
			spawnOptions: {
				stdio: [0, 1, 2],
			},
		})

		return {}
	}
}
