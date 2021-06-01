import { coreEventContracts } from '@sprucelabs/mercury-types'
import myNewSkill1621887616743Count54MyFantasticallyAmazingEventEventContract_v2021_05_24 from '#spruce/events/myNewSkill1621887616743Count54/myFantasticallyAmazingEvent.v2021_05_24.contract'

export default [
	myNewSkill1621887616743Count54MyFantasticallyAmazingEventEventContract_v2021_05_24,
	...coreEventContracts,
]

declare module '@sprucelabs/mercury-types/build/types/mercury.types' {
	interface SkillEventSignatures {}
}
