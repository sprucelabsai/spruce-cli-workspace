export const REMOTE_LOCAL = 'http://127.0.0.1:8081'
export const REMOTE_DEV = 'https://developer.mercury.spruce.ai'
export const REMOTE_SANDBOX = 'https://sandbox.mercury.spruce.ai'
export const REMOTE_PROD = 'https://mercury.spruce.ai'

export const REMOTES = {
	local: REMOTE_LOCAL,
	dev: REMOTE_DEV,
	sandbox: REMOTE_SANDBOX,
	prod: REMOTE_PROD,
}

export type Remote = keyof typeof REMOTES
