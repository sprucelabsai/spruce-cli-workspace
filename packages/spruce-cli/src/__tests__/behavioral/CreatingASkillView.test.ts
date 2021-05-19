import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import CreateAction from '../../features/view/actions/CreateAction'
import AbstractSkillTest from '../../tests/AbstractSkillTest'
import testUtil from '../../tests/utilities/test.utility'

export default class CreatingASkillViewTest extends AbstractSkillTest {
	protected static skillCacheKey = 'views'
	private static action: CreateAction
	private static rootSvc: string
	public static appointmentsCard: string

	protected static async beforeEach() {
		await super.beforeEach()
		this.action = this.cli.getFeature('view').Action('create') as CreateAction
	}

	@test()
	protected static hasCreateAction() {
		assert.isFunction(this.action.execute)
	}

	@test()
	protected static async asksIfRootSkillViewIfNotYetCreated() {
		void this.action.execute({
			viewType: 'skillView',
		})

		await this.waitForInput()

		const last = this.ui.lastInvocation()

		assert.isEqual(last.command, 'confirm')

		this.ui.reset()
	}

	@test()
	protected static async canCreateRootSkillView() {
		const results = await this.action.execute({
			viewType: 'skillView',
			isRoot: true,
		})

		this.rootSvc = testUtil.assertsFileByNameInGeneratedFiles(
			'Root.svc.ts',
			results.files
		)

		assert.doesInclude(this.rootSvc, 'skillViews')
	}

	@test()
	protected static async generatesValidRootSkillView() {
		await this.Service('typeChecker').check(this.rootSvc)
	}

	@test()
	protected static async rootSkillViewExtendsAbstractSkillViewController() {
		const contents = diskUtil.readFile(this.rootSvc)
		assert.doesInclude(
			contents,
			'export default class RootSkillViewController extends AbstractSkillViewController'
		)
	}

	@test()
	protected static async cantCreateTwoRootSvcs() {
		const err = await assert.doesThrowAsync(() =>
			this.action.execute({
				viewType: 'skillView',
				isRoot: true,
			})
		)

		errorAssertUtil.assertError(err, 'SKILL_VIEW_EXISTS', {
			name: 'Root',
		})
	}

	@test()
	protected static async asksForNamesIfCreatingSkillViewNotRoot() {
		const promise = this.action.execute({
			viewType: 'skillView',
		})

		await this.waitForInput()

		let last = this.ui.lastInvocation()

		assert.isEqual(last.command, 'prompt')

		await this.ui.sendInput('Dashboard')
		await this.ui.sendInput('\n')

		const results = await promise

		testUtil.assertsFileByNameInGeneratedFiles(
			'Dashboard.svc.ts',
			results.files
		)

		this.ui.reset()
	}

	@test()
	protected static async asksForViewModelWhenCreatingSkillView() {
		const promise = this.action.execute({
			viewType: 'view',
			nameReadable: 'Appointments card',
		})

		await this.waitForInput()

		const last = this.ui.lastInvocation()

		assert.isEqual(last.command, 'prompt')
		assert.doesInclude(last.options.options.choices, {
			value: 'Card',
		})

		await this.ui.sendInput('Card')

		const results = await promise

		this.appointmentsCard = testUtil.assertsFileByNameInGeneratedFiles(
			'AppointmentsCard.vc.ts',
			results.files
		)
	}

	@test()
	protected static skillViewExtendsAbstractViewControllerWithProperView() {
		const contents = diskUtil.readFile(this.appointmentsCard)
		assert.doesInclude(
			contents,
			'export default class AppointmentsCardViewController extends AbstractViewController<Card>'
		)
	}
}
