import Schema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import onboardingSchema from '#spruce/schemas/spruceCli/v2020_07_22/onboarding.schema'
import AbstractLocalStore, { ILocalStoreSettings } from './AbstractLocalStore'

export interface IOnboardingStoreSettings
	extends ILocalStoreSettings,
		SpruceSchemas.SpruceCli.v2020_07_22.IOnboarding {}

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
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
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
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		this.save()
	}
}
