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

export interface SchemaHealthCheckItem extends IHealthCheckItem {
	schemas: {
		id: string
		name?: string
		namespace: string
		version?: string
		description?: string
	}[]
}

export interface EventHealthCheckItem extends IHealthCheckItem {
	listeners: Omit<IEventFeatureListener, 'callback'>[]
}

export interface HealthCheckResults {
	skill: IHealthCheckItem
	schema?: SchemaHealthCheckItem
	event?: EventHealthCheckItem
}

export interface IHealthCheckItem {
	status: 'failed' | 'passed'
	errors?: AbstractSpruceError<any>[]
}

export interface IEventFeatureListener {
	eventName: string
	eventNamespace: string
	version: string
	callback: (skill: ISkill) => Promise<void>
}
