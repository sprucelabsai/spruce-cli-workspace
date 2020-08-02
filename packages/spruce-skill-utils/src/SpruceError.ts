import AbstractSpruceError, { ISpruceErrorOptions } from '@sprucelabs/error'

export type ErrorOptions = {
	code: 'FILE_EXISTS'
	file: string
} & ISpruceErrorOptions

export default class SpruceError extends AbstractSpruceError<ErrorOptions> {}
