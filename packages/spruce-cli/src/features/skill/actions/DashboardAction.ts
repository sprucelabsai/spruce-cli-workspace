import { buildSchemaDefinition } from '@sprucelabs/schema'
import blessed from 'blessed'
// @ts-ignore
import fonts from 'cfonts'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'
import Theme from '../Theme'

export const dashboardActionOptionsDefinition = buildSchemaDefinition({
	id: 'dashboard',
	name: 'Skill dashboard',
	fields: {},
})

export type IDashboardActionDefinition = typeof dashboardActionOptionsDefinition

export default class DashboardAction extends AbstractFeatureAction<
	IDashboardActionDefinition
> {
	public name = 'dashboard'
	public optionsDefinition = dashboardActionOptionsDefinition

	public execute(): Promise<IFeatureActionExecuteResponse> {
		const screen = blessed.screen({
			smartCSR: true,
		})

		screen.title = 'SKX'
		screen.key(['escape', 'q', 'C-c'], function () {
			return process.exit(0)
		})

		const content = fonts.render('SKX', {
			align: 'left',
			font: 'tiny',
			space: false,
		}).string

		const text = blessed.box({
			content,
			left: 1,
			top: 1,
			width: 50,
			height: 10,
			style: {
				fg: Theme.primaryColor,
			},
		})

		screen.append(text)

		// let grid = new contrib.grid({ rows: 12, cols: 12, screen })

		// grid.set(0, 0, 1, 2, blessed.bigtext, {
		// 	content: 'SXK',
		// })

		screen.render()

		return new Promise(() => {})
	}
}
