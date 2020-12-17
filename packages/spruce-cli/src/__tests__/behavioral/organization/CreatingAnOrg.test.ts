import { eventResponseUtil } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../../tests/AbstractCliTest'

export default class CreatingAnOrgTest extends AbstractCliTest {
	@test()
	protected static async hasCreateAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('organization').Action('create').execute)
	}

	@test()
	protected static async createsAnOrg() {
		const slug = `my-org-${new Date().getTime()}`

		const cli = await this.FeatureFixture().installCachedFeatures(
			'organizations'
		)

		await this.PersonFixture().loginAsDummyPerson()

		const results = await cli
			.getFeature('organization')
			.Action('create')
			.execute({
				nameReadable: 'My new org',
				nameKebab: slug,
			})

		assert.isFalsy(results.errors)

		const { organization } = results.meta ?? {}

		assert.isTruthy(organization)

		const client = await this.connectToApi()

		const orgResults = await client.emit('get-organization', {
			payload: {
				id: organization.id,
			},
		})

		const {
			organization: getOrganization,
		} = eventResponseUtil.getFirstResponseOrThrow(orgResults)

		assert.isEqual(getOrganization.slug, slug)
	}
}
