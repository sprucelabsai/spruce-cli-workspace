import Schema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import onboardingSchema from '#spruce/schemas/spruceCli/v2020_07_22/onboarding.schema'
import AbstractLocalStore, { LocalStoreSettings } from './AbstractLocalStore'

export interface OnboardingStoreSettings
	extends LocalStoreSettings,
		SpruceSchemas.SpruceCli.v2020_07_22.Onboarding {}

export type OnboardingMode = OnboardingStoreSettings['mode']

export default class OnboardingStore extends AbstractLocalStore<OnboardingStoreSettings> {
	public name = 'onboarding'
	public schema = new Schema(onboardingSchema)

	public async save() {
		const values = this.schema.getValues()
		this.writeValues(values)
		return this
	}

	public async load() {
		const saved = this.readValues()
		this.schema.setValues({
			isEnabled: saved.isEnabled ?? false,
			runCount: saved.runCount ?? 0,
		})
		return this
	}

	public getMode() {
		return 'off'
	}

	protected setRunCount(count: number) {
		this.schema.set('runCount', count)
		void this.save()
	}
}
