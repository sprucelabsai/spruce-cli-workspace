import { Mercury } from '@sprucelabs/mercury'
import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../AbstractSchemaTest'
import { CORE_NAMESPACE, LOCAL_NAMESPACE } from '../../constants'
import ServiceFactory from '../../factories/ServiceFactory'
import SchemaStore from '../../stores/SchemaStore'
import diskUtil from '../../utilities/disk.utility'

export default class SchemaStoreTest extends AbstractSchemaTest {
	protected static schemaStore: SchemaStore

	protected static async beforeEach() {
		super.beforeEach()

		const serviceFactory = new ServiceFactory(new Mercury())
		const store = new SchemaStore(this.cwd, serviceFactory)

		this.schemaStore = store
	}

	@test()
	protected static async canInstantiateSchemaStore() {
		assert.isOk(this.schemaStore)
	}

	@test()
	protected static async hasFetchSchemaTemplateItemsMethod() {
		assert.isFunction(this.schemaStore.fetchSchemaTemplateItems)
	}

	@test()
	protected static async fetchesCoreSchemaTemplateItems() {
		const response = await this.schemaStore.fetchSchemaTemplateItems(
			this.resolvePath('nothing_found')
		)

		const { items } = response

		assert.isAbove(items.length, 0)

		const userTemplateItem = items.find(
			item => item.namespace === CORE_NAMESPACE && item.id === 'user'
		)

		assert.isOk(userTemplateItem)
	}

	@test()
	protected static async fetchesLocalSchemasToo() {
		await this.bootCliInstallSchemasAndSetCwd('local-schema-loading')
		diskUtil.copyDir(
			this.resolveTestPath('testSchemas'),
			this.resolvePath('schemas')
		)

		const results = await this.schemaStore.fetchSchemaTemplateItems(
			this.resolvePath('schemas')
		)

		const { items } = results

		const localItems = items.filter(item => item.namespace === LOCAL_NAMESPACE)
		assert.isEqual(localItems.length, 2)
	}
}
