/* eslint-disable @typescript-eslint/interface-name-prefix */
/* eslint-disable @typescript-eslint/no-namespace */
import { ISpruceLog, ISpruceLogger } from '@sprucelabs/log'

export interface IEmitResponseCallback {
	callback?: (options: {
		data: Record<string, any>
		method: string
		path: string
		query?: Record<string, any>
	}) => void
	data?: Record<string, any>
}

export interface IEmitResponse {
	skill: { name: string; slug: string }
	error: any
	payload: Record<string, any>
}

declare global {
	// @ts-ignore
	const log: ISpruceLog
	// @ts-ignore
	const logger: ISpruceLogger
	namespace NodeJS {
		// @ts-ignore
		interface Global {
			log: ISpruceLog
			logger: ISpruceLogger
			testEmitResponse: {
				[eventName: string]: IEmitResponseCallback | IEmitResponse[]
			}
		}
	}
}

export {}
