import { MercuryAggregateResponse } from '@sprucelabs/mercury-types'
import SpruceError from '../../../errors/SpruceError'

const eventResponseUtil = {
	getFirstResponseOrThrow<R extends MercuryAggregateResponse<any>>(
		emitResponse: R
	) {
		const payload = emitResponse.responses[0].payload
		const errors = emitResponse.responses[0].errors

		if (errors) {
			throw new SpruceError({
				code: 'MERCURY_RESPONSE_ERROR',
				responseErrors: errors,
			})
		}

		return payload as NonNullable<R['responses'][number]['payload']>
	},
}

export default eventResponseUtil
