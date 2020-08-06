import AbstractSpruceError from '@sprucelabs/error'

export interface ISkill {
	rootDir: string
	/** Source or build depending on running with .local */
	activeDir: string
	hashSpruceDir: string
	registerFeature: (code: string, feature: ISkillFeature) => void
}

export interface ISkillFeature {
	execute: () => Promise<void>
	checkHealth: () => Promise<IHealthCheckItem>
	isInstalled: () => Promise<boolean>
}

export interface IHealthCheckResults {
	[featureKey: string]: IHealthCheckItem
}

export interface IHealthCheckItem {
	status: 'failed' | 'passed'
	errors?: AbstractSpruceError<any>[]
	listeners?: IEventFeatureListener[]
}

export interface IEventFeatureListener {
	eventName: string
	eventNamespace: string
	version: string
	callback: (skill: ISkill) => Promise<void>
}
