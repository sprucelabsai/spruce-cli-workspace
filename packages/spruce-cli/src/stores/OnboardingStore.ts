import AbstractStore, {
	IBaseStoreSettings,
	IStoreOptions
} from './AbstractStore'
import Schema from '@sprucelabs/schema'
import { SpruceSchemas } from '../../.spruce/schemas/schemas.types'

export interface IOnboardingStoreSettings
	extends IBaseStoreSettings,
		SpruceSchemas.local.IOnboardingStore {}

export default class OnboardingStore extends AbstractStore<
	IOnboardingStoreSettings
> {
	public name = 'onboarding'
	public schema = new Schema(SpruceSchemas.local.OnboardingStore.definition)

	public constructor(options: IStoreOptions) {
		super(options)
		this.load()
	}

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

	public incrementRunCount() {
		const count = this.getRunCount()
		this.setRunCount(count + 1)
	}

	public setRunCount(count: number) {
		this.schema.set('runCount', count)
		this.save()
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
			runCount: saved.runCount ?? 0
		})
		return this
	}
}
