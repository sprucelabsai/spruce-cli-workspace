import { Mercury } from '@sprucelabs/mercury'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'

export default abstract class AbstractStore {
	protected mercury: Mercury

	public constructor(mercury: Mercury) {
		this.mercury = mercury
	}

	protected async mercuryForUser(token: string): Promise<Mercury> {
		const { connectionOptions } = this.mercury
		if (!connectionOptions) {
			throw new SpruceError({
				code: ErrorCode.GenericMercury,
				friendlyMessage:
					'user store was trying to auth on mercury but had no options (meaning it was never connected)'
			})
		}
		// Connect with new creds
		await this.mercury.connect({
			...(connectionOptions || {}),
			credentials: { token }
		})

		return this.mercury
	}
}
