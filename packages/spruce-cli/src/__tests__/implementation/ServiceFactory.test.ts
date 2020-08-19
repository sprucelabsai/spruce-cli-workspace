import { Mercury } from '@sprucelabs/mercury'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import ServiceFactory, { Service } from '../../services/ServiceFactory'

export default class ServiceFactoryTest extends AbstractCliTest {
	private static factory: ServiceFactory

	protected static async beforeEach() {
		this.factory = new ServiceFactory({ mercury: new Mercury() })
		super.beforeEach()
	}

	@test('can build pin service', 'pin', 'requestPin')
	@test('can build pin service', 'pkg', 'readPackage')
	@test('can build pin service', 'vsCode', 'installExtensions')
	protected static canBuild(type: Service, functionName: string) {
		const service = this.factory.Service(this.cwd, type)
		assert.hasAllFunctions(service, [functionName])
	}
}
