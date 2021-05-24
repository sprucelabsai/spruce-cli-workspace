import { buildEventContract } from '@sprucelabs/mercury-types'
import { buildPermissionContract } from '@sprucelabs/mercury-types'
import hirePersonEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/hirePersonEmitTargetAndPayload.schema'
import hirePersonResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/hirePersonResponsePayload.schema'

const hirePersonEventContract = buildEventContract({
	eventSignatures: {
		'hire-person::v2020_12_25': {
			emitPayloadSchema: hirePersonEmitTargetAndPayloadSchema,
			responsePayloadSchema: hirePersonResponsePayloadSchema,
			emitPermissionContract: buildPermissionContract({
				id: 'hiring-and-promoting',
				name: 'Hiring and promoting contract',
				description:
					'Various permissions related to emitting hiring and promoting people at organizations and locations.',
				requireAllPermissions: false,
				permissions: [
					{
						id: 'hiring-and-promoting',
						name: 'Hire a person',
						defaults: {
							owner: {
								default: true,
							},
							groupManager: {
								clockedIn: true,
							},
							manager: {
								clockedIn: true,
							},
						},
					},
				],
			}),
		},
	},
})
export default hirePersonEventContract

export type HirePersonEventContract = typeof hirePersonEventContract
