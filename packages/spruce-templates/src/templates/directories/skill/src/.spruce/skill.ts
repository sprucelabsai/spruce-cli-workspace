// AUTO-GENERATED. ALL CHANGES WILL BE OVERWRITTEN
import pathUtil from 'path'
import { HealthCheckResults, Skill, SkillFeature } from '@sprucelabs/spruce-skill-utils'


export class Skill implements Skill {
	public readonly rootDir = pathUtil.join(__dirname, '..', '..')
	public readonly activeDir = pathUtil.join(__dirname, '..')
	public readonly hashSpruceDir = pathUtil.join(__dirname, '..', '.spruce')


	private featureMap: Record<string, SkillFeature> = {}


	public isFeatureInstalled = async (featureCode: string) => {
		if (!this.featureMap[featureCode]) {
			return false
		}

		return this.featureMap[featureCode].isInstalled()
	}

	public registerFeature = async (featureCode: string, feature: SkillFeature) => {
		this.featureMap[featureCode] = feature
	}

	public checkHealth = async (): Promise<HealthCheckResults> => {
		const results: HealthCheckResults = {
			skill: {
				status: 'passed'
			}
		}

		await Promise.all(this.getFeaturesWithCode().map(async featureWithCode => {
			const isInstalled = await featureWithCode.feature.isInstalled()
			if (isInstalled) {
				const item = await featureWithCode.feature.checkHealth()
				//@ts-ignore
				results[featureWithCode.code] = item
			}

		}))

		return results
	}

	public execute = async () => {
		await Promise.all(this.getFeatures().map(feature => feature.execute()))
	}

	public getFeatures() {
		return Object.values(this.featureMap)
	}

	private getFeaturesWithCode() {
		return Object.keys(this.featureMap).map(code => ({ code, feature: this.featureMap[code] }))
	}
}


export default new Skill()
