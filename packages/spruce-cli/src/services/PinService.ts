import { ErrorCode } from '#spruce/errors/codes.types'
import SpruceError from '../errors/SpruceError'
import { SpruceEvents } from '../types/events-generated'
import AbstractService from './AbstractService'

export default class PinService extends AbstractService {
	/** Give me a phone and i'll send you a pin */
	public async requestPin(phone: string) {
		try {
			await this.mercury.emit<
				SpruceEvents.Core.RequestLogin.IPayload,
				SpruceEvents.Core.RequestLogin.IResponseBody
			>({
				eventName: SpruceEvents.Core.RequestLogin.name,
				payload: {
					phoneNumber: phone,
					method: 'pin'
				}
			})
		} catch (err) {
			throw new SpruceError({
				code: ErrorCode.GenericMercury,
				eventName: SpruceEvents.Core.RequestLogin.name,
				payloadArgs: [
					{ name: 'phoneNumber', value: phone },
					{ name: 'method', value: 'pin' }
				],
				originalError: err
			})
		}
	}
}
