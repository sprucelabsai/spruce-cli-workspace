// AUTO-GENERATED. ALL CHANGES WILL BE OVERWRITTEN
import pathUtil from 'path'
import { HealthCheckResults, Skill as SkillDetails, SkillFeature, buildLog, Log } from '@sprucelabs/spruce-skill-utils'


export class Skill implements SkillDetails {
	
	public readonly rootDir = pathUtil.join(__dirname, '..', '..')
	public readonly activeDir = pathUtil.join(__dirname, '..')
	public readonly hashSpruceDir = pathUtil.join(__dirname, '..', '.spruce')

	private featureMap: Record<string, SkillFeature> = {}
	private log = buildLog('skill')


	public isFeatureInstalled = async (featureCode: string) => {
		if (!this.featureMap[featureCode]) {
			return false
		}

		return this.featureMap[featureCode].isInstalled()
	}

	public registerFeature = async (featureCode: string, feature: SkillFeature) => {
		
		this.log.info(`Registering feature.${featureCode}`)
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
				try {
					const item = await featureWithCode.feature.checkHealth()
					//@ts-ignore
					results[featureWithCode.code] = item
					
				} catch (err) {
					//@ts-ignore
					results[featureWithCode.code] = {
						status: 'failed',
						errors: [err]
					}
				}
			}

		}))

		return results
	}

	public execute = async () => {
		await Promise.all(this.getFeatures().map(feature => feature.execute()))
		this.log.info('All features have finished execution.')
		this.log.info('Shutting down.')
	}

	public getFeatures() {
		return Object.values(this.featureMap)
	}

	private getFeaturesWithCode() {
		return Object.keys(this.featureMap).map(code => ({ code, feature: this.featureMap[code] }))
	}

	public buildLog(...args: any[]): Log {
		//@ts-ignore
		return this.log.buildLog(...args)
	}
}


export default new Skill()
