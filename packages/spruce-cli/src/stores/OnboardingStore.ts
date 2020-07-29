import Schema from '@sprucelabs/schema'
import onboardingSchema from '#spruce/schemas/local/v2020_07_22/onboarding.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractLocalStore, { ILocalStoreSettings } from './AbstractLocalStore'

export interface IOnboardingStoreSettings
	extends ILocalStoreSettings,
		SpruceSchemas.Local.v2020_07_22.IOnboarding {}

export default class OnboardingStore extends AbstractLocalStore<
	IOnboardingStoreSettings
> {
	public name = 'onboarding'
	public schema = new Schema(onboardingSchema)

	public isEnabled() {
		return this.schema.get('isEnabled')
	}

	public setIsEnabled(isEnabled: boolean) {
		this.schema.set('isEnabled', isEnabled)
		this.save()
	}

	public getRunCount() {
		return this.schema.get('runCount')
	}

	public resetRunCount() {
		this.setRunCount(0)
	}

	public incrementRunCount() {
		const count = this.getRunCount()
		this.setRunCount(count + 1)
	}

	/** Save changes to filesystem */
	public async save() {
		const values = this.schema.getValues()
		this.writeValues(values)
		return this
	}

	/** Load everything into the store (called in constructor) */
	public async load() {
		const saved = this.readValues()
		this.schema.setValues({
			isEnabled: saved.isEnabled ?? false,
			runCount: saved.runCount ?? 0,
		})
		return this
	}

	protected setRunCount(count: number) {
		this.schema.set('runCount', count)
		this.save()
	}
}
