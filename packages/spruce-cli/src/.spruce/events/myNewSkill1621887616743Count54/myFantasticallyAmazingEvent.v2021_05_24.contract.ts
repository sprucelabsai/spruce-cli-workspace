import { buildEventContract } from '@sprucelabs/mercury-types'
import { buildPermissionContract } from '@sprucelabs/mercury-types'

const myFantasticallyAmazingEventEventContract = buildEventContract({
	eventSignatures: {
		'my-new-skill-1621887616743-count-54.my-fantastically-amazing-event::v2021_05_24':
			{
				isGlobal: true,

				emitPermissionContract: buildPermissionContract({
					id: 'myFantasticallyAmazingEventEmitPermissions',
					name: 'my fantastically amazing event',
					description: null,
					requireAllPermissions: false,
					permissions: [
						{
							id: 'can-high-five',
							name: 'Can give high five',
							description: 'Will this person be allowed to high five?',
							requireAllStatuses: false,
							defaults: null,
							can: null,
						},
					],
				}),
				listenPermissionContract: buildPermissionContract({
					id: 'myFantasticallyAmazingEventListenPermissions',
					name: 'my fantastically amazing event',
					description: null,
					requireAllPermissions: false,
					permissions: [
						{
							id: 'can-high-five',
							name: 'Can give high five',
							description: 'Will this person be allowed to high five?',
							requireAllStatuses: false,
							defaults: null,
							can: null,
						},
					],
				}),
			},
	},
})
export default myFantasticallyAmazingEventEventContract

export type MyFantasticallyAmazingEventEventContract =
	typeof myFantasticallyAmazingEventEventContract
