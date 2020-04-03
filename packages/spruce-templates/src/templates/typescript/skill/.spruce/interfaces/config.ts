/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// To augment a module definition we have to import it but eslint will complain about it being unused
// @ts-ignore
import config from 'config'
import defaultConfig from '../../config/default'

type configType = typeof defaultConfig

declare module 'config' {
	interface IConfig extends configType {
		[key: string]: any
	}
}
