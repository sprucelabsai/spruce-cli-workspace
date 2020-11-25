import { Mercury } from '@sprucelabs/mercury'

export default class PinService {
	private mercury: Mercury
	public constructor(mercury: Mercury) {
		this.mercury = mercury
	}

	/** Give me a phone and i'll send you a pin */
	public async requestPin(phone: string) {
		console.log(phone, this.mercury)
		// try {
		// 	await this.mercury.emit<
		// 		SpruceEvents.Core.RequestLogin.Payload,
		// 		SpruceEvents.Core.RequestLogin.ResponseBody
		// 	>({
		// 		eventName: SpruceEvents.Core.RequestLogin.name,
		// 		payload: {
		// 			phoneNumber: phone,
		// 			method: 'pin',
		// 		},
		// 	})
		// } catch (err) {
		// 	throw new SpruceError({
		// 		code: 'GENERIC_MERCURY',
		// 		eventName: SpruceEvents.Core.RequestLogin.name,
		// 		payloadArgs: [
		// 			{ name: 'phoneNumber', value: phone },
		// 			{ name: 'method', value: 'pin' },
		// 		],
		// 		originalError: err,
		// 	})
		// }
	}
}
