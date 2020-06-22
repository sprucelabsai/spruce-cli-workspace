import { test, assert } from '@sprucelabs/test'
import BaseCliTest from '../../BaseCliTest'
import FeatureManager from '../../FeatureManager'
import PkgService from '../../services/PkgService'
import VsCodeService from '../../services/VsCodeService'

export default class ErrorFileValidationTest extends BaseCliTest {
	@test('the generated file is valid')
	protected static async generatedFileIsvValid() {
		const pgkService = new PkgService(this.cwd)
		const vsCodeService = new VsCodeService(this.cwd)
		const featureManager = FeatureManager.WithAllFeatures({
			cwd: this.cwd,
			pkgService,
			vsCodeService
		})
	}
}
