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
	checkHealth: () => Promise<HealthCheckItem>
	isInstalled: () => Promise<boolean>
}

export interface SchemaHealthCheckItem extends HealthCheckItem {
	schemas: {
		id: string
		name?: string
		namespace: string
		version?: string
		description?: string
	}[]
}

export interface EventHealthCheckItem extends HealthCheckItem {
	listeners: Omit<IEventFeatureListener, 'callback'>[]
}

export interface HealthCheckResults {
	skill: HealthCheckItem
	schema?: SchemaHealthCheckItem
	event?: EventHealthCheckItem
	mercury?: HealthCheckItem
}

export interface HealthCheckItem {
	status: 'failed' | 'passed'
	errors?: AbstractSpruceError<any>[]
}

export interface IEventFeatureListener {
	eventName: string
	eventNamespace: string
	version: string
	callback: (skill: ISkill) => Promise<void>
}
