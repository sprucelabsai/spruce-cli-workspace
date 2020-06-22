import { Mercury } from '@sprucelabs/mercury'
import { test, assert } from '@sprucelabs/test'
// import uuid from 'uuid'
import BaseCliTest from '../../BaseCliTest'
import FeatureManager, { FeatureCode } from '../../FeatureManager'
import SkillFeature from '../../features/SkillFeature'
import FeatureManagerTest from './FeatureManager.test'

export default class SkillFeatureTest extends BaseCliTest {
	private static feature: SkillFeature
	private static featureManager: FeatureManager

	public static async beforeEach() {
		super.beforeEach()

		const featureManager = FeatureManagerTest.FeatureManager()
		this.feature = featureManager.getFeature(FeatureCode.Skill)
	}

	@test()
	protected static canGetSkillFeature() {
		assert.instanceOf(this.feature, SkillFeature)
	}

	@test()
	protected static knowsNotInstalled() {
		const isInstalled = this.feature.isInstalled()
		assert.isFalse(isInstalled)
	}
}
