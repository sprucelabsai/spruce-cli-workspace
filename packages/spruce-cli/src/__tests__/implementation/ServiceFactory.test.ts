import { Mercury } from '@sprucelabs/mercury'
import { test, assert, ISpruce } from '@sprucelabs/test'
import BaseCliTest from '../../BaseCliTest'
import ServiceFactory, { Service } from '../../factories/ServiceFactory'

export default class ServiceFactoryTest extends BaseCliTest {
	private static factory: ServiceFactory

	protected static async beforeEach() {
		this.factory = new ServiceFactory(new Mercury())
		super.beforeEach()
	}

	@test('can build pin service', Service.Pin, 'requestPin')
	@test('can build pin service', Service.Pkg, 'readPackage')
	@test('can build pin service', Service.VsCode, 'installExtensions')
	protected static canBuild(
		spruce: ISpruce,
		type: Service,
		functionName: string
	) {
		const service = this.factory.Service(this.cwd, type)
		assert.hasAllFunctions(service, [functionName])
	}
}
