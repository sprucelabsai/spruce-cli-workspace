import osUtil from 'os'
import Schema from '@sprucelabs/schema'
import { diskUtil, HASH_SPRUCE_DIR_NAME } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import onboardingSchema from '#spruce/schemas/spruceCli/v2020_07_22/onboarding.schema'
import AbstractLocalStore, { LocalStoreSettings } from './AbstractLocalStore'
import { StoreOptions } from './AbstractStore'

export interface OnboardingStoreSettings
	extends LocalStoreSettings,
		SpruceSchemas.SpruceCli.v2020_07_22.Onboarding {}

export type OnboardingMode = OnboardingStoreSettings['mode']
export type OnboardingStage = OnboardingStoreSettings['stage']

export default class OnboardingStore extends AbstractLocalStore<OnboardingStoreSettings> {
	public name = 'onboarding'
	public schema = new Schema(onboardingSchema)

	private configDir = diskUtil.resolvePath(
		osUtil.homedir(),
		HASH_SPRUCE_DIR_NAME
	)

	public constructor(options: StoreOptions) {
		super(options)
		this.load()
	}

	private save() {
		const values = this.schema.getValues()
		this.writeValues(values)
		return this
	}

	private load() {
		const saved = this.readValues()
		this.schema.setValues({
			stage: saved.stage ?? null,
			mode: saved.mode ?? 'off',
		})
		return this
	}

	public getMode(): OnboardingMode {
		return this.schema.get('mode')
	}

	public setMode(mode: OnboardingMode) {
		this.schema.set('mode', mode)
		this.schema.validate()
		this.save()
	}

	public setConfigDir(dir: string) {
		this.configDir = dir
		this.load()
	}

	public getStage() {
		return this.schema.get('stage')
	}

	public setStage(stage: OnboardingStage) {
		this.schema.set('stage', stage)
		this.schema.validate()
		this.save()
	}

	public reset() {
		this.schema.set('stage', undefined)
		this.setMode('off')
	}

	protected getConfigPath() {
		const filePath = diskUtil.resolvePath(this.configDir, 'settings.json')

		return {
			directory: this.configDir,
			file: filePath,
		}
	}
}
