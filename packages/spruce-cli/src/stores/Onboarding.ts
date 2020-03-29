import BaseStore, { IBaseStoreSettings } from './Base'
import Schema, { FieldType } from '@sprucelabs/schema'

export interface IOnboardingStoreSettings extends IBaseStoreSettings {
	isEnabled?: boolean
}

export default class OnboardingStore extends BaseStore<
	IOnboardingStoreSettings
> {
	public name = 'onboarding'

	public schema = new Schema({
		id: 'onboarding-store',
		name: 'Onboarding store',
		fields: {
			isEnabled: {
				type: FieldType.Boolean,
				label: 'Remote'
			}
		}
	})

	public isEnabled() {
		return this.schema.get('isEnabled')
	}

	public setIsEnabled(isEnabled: boolean) {
		this.schema.set('isEnabled', isEnabled)
		this.save()
	}

	/** save changes to filesystem */
	public async save() {
		const values = this.schema.getValues()
		this.writeValues(values)
		return this
	}

	/** load everything into the store (called in constructor) */
	public async load() {
		const saved = this.readValues()
		this.schema.setValues(saved)
		return this
	}
}
