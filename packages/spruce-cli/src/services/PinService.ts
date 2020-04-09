import AbstractService from './AbstractService'
import { SpruceEvents } from '../types/events-generated'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'

export default class PinService extends AbstractService {
	/** Give me a phone and i'll send you a pin */
	public async requestPin(phone: string) {
		try {
			await this.mercury.emit<
				SpruceEvents.core.RequestLogin.IPayload,
				SpruceEvents.core.RequestLogin.IResponseBody
			>({
				eventName: SpruceEvents.core.RequestLogin.name,
				payload: {
					phoneNumber: phone,
					method: 'pin'
				}
			})
		} catch (err) {
			throw new SpruceError({
				code: ErrorCode.GenericMercury,
				eventName: SpruceEvents.core.RequestLogin.name,
				payloadArgs: [
					{ name: 'phoneNumber', value: phone },
					{ name: 'method', value: 'pin' }
				],
				originalError: err
			})
		}
	}
}
