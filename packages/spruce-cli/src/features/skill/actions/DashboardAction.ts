import { buildSchema } from '@sprucelabs/schema'
import blessed from 'blessed'
import contrib from 'blessed-contrib'
// @ts-ignore
import fonts from 'cfonts'
import chalk from 'chalk'
import Theme from '../../../widgets/Theme'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

export const dashboardActionOptionsDefinition = buildSchema({
	id: 'dashboard',
	name: 'Skill dashboard',
	fields: {},
})

export type IDashboardActionDefinition = typeof dashboardActionOptionsDefinition

export default class DashboardAction extends AbstractFeatureAction<
	IDashboardActionDefinition
> {
	public name = 'dashboard'
	public optionsSchema = dashboardActionOptionsDefinition

	private interactiveElementOptions = {
		keys: true,
		interactive: true,
		mouse: true,
	}

	private colorElementOptions = {
		fg: Theme.primaryColor,
		bg: Theme.backgroundColor,
	}

	private inverseColorElementOptions = {
		fg: Theme.backgroundColor,
		bg: Theme.primaryColor,
	}

	private buttonElementOptions = {
		style: {
			...this.inverseColorElementOptions,
			label: this.inverseColorElementOptions,
		},
	}

	private universalElementOptions = {
		...this.colorElementOptions,
		selectedFg: Theme.backgroundColor,
		selectedBg: Theme.primaryColor,
		style: {
			fg: Theme.primaryColor,
			bg: Theme.backgroundColor,
			label: { bg: Theme.backgroundColor },
		},
		border: {
			type: 'line',
			fg: Theme.primaryColor,
			bg: Theme.backgroundColor,
		},
	}

	public async execute(): Promise<FeatureActionResponse> {
		const screen = blessed.screen({
			smartCSR: true,
		})

		screen.title = 'SKX'
		screen.key(['escape', 'q', 'C-c'], function () {
			return process.exit(0)
		})

		this.renderBackground(screen)

		let grid = new contrib.grid({
			rows: 12,
			cols: 12,
			screen,
			hideBorder: true,
		})

		this.renderTitle(grid)
		await this.renderFeaturesTable(grid)
		this.renderSchemasTable(grid)
		this.renderErrorsTable(grid)
		this.renderQualityLog(grid)

		screen.render()

		return new Promise(() => {})
	}

	private renderQualityLog(grid: contrib.grid) {
		const log = grid.set(0.9, 8, 8, 4, contrib.log, {
			...this.universalElementOptions,
			label: this.styleBoxLabel('Quality'),
			padding: {
				top: 1,
				left: 1,
				right: 1,
				bottom: 1,
			},
		})

		const items = [
			'PASS  build/__tests__/behavioral/errors/CreatingANewErrorBuilder.test.js (45.125 s)',
			'PASS  build/__tests__/behavioral/schemas/CreatingANewSchemaBuilder.test.js (45.384 s)',
			'PASS  build/__tests__/behavioral/errors/KeepingErrorsInSync.test.js (68.095 s)',
			'PASS  build/__tests__/behavioral/schemas/KeepingSchemasInSync.test.js (70.338 s)',
			'PASS  build/__tests__/implementation/ErrorFileGeneration.test.js (30.457 s)',
			'PASS  build/__tests__/implementation/SchemaValueTypeGeneration.test.js (36.714 s)',
			'PASS  build/__tests__/behavioral/schemas/HandlingBadLocalSchemasGracefully.test.js (9.534 s)',
			'PASS  build/__tests__/implementation/FeatureCommandExecuter.test.js (18.866 s)',
			'PASS  build/__tests__/implementation/SchemaStore.test.js (7.668 s)',
			'PASS  build/__tests__/implementation/Services.test.js (6.17 s)',
			'PASS  build/__tests__/behavioral/SettingUpASkill.test.js (23.128 s)',
			'PASS  build/__tests__/implementation/SchemaTemplateItemBuilder.test.js',
			'PASS  build/__tests__/implementation/FeatureCommandAttacher.test.js',
			'PASS  build/__tests__/implementation/FeatureInstaller.test.js',
			'PASS  build/__tests__/implementation/CommandOptionBuilder.test.js',
			'PASS  build/__tests__/implementation/ServiceFactory.test.js',
			'PASS  build/__tests__/implementation/DeletingOrphanedSchemaDefinitions.test.js',
			'PASS  build/__tests__/behavioral/BootingTheCli.test.js',
			'PASS  build/__tests__/behavioral/schemas/UsingSchemasInCli.test.js',
			'PASS  build/__tests__/behavioral/HandlingVersions.test.js',
			'PASS  build/__tests__/behavioral/schemas/SettingUpSchemas.test.js (18.438 s)',
			'PASS  build/__tests__/behavioral/errors/SettingUpErrors.test.js (7.978 s)',
		]

		const writeNext = () => {
			let line = items.shift()
			if (line) {
				line = line.replace(
					'PASS ',
					chalk.bgHex(Theme.primaryColor).hex(Theme.backgroundColor)('PASS')
				)

				line = line.replace('build/__tests__/', '')

				log.log(line)
				setTimeout(writeNext, 1000)
			}
		}

		writeNext()

		let label = 'On'
		const button = blessed.button({
			...this.interactiveElementOptions,
			...this.buttonElementOptions,
			width: 8,
			height: 1,
			right: 1,
			align: 'center',
			bottom: -1,
			label: this.styleButtonLabel(label),
		})

		button.on('click', () => {
			log.log('Click')
			label = label === 'On' ? 'Off' : 'On'
			button.setLabel(label)
			button.screen.render()
		})

		log.append(button)
	}

	private renderSchemasTable(grid: contrib.grid) {
		const table = grid.set(0.9, 4, 4, 4, contrib.table, {
			...this.universalElementOptions,
			label: this.styleBoxLabel('Schemas'),
			columnSpacing: 5,
			columnWidth: [15, 10, 10, 10],
			data: {
				headers: [
					' ',
					this.styleHeading('NAMESPACE'),
					this.styleHeading('VERSION'),
					this.styleHeading('HEALTH'),
				],
				data: [],
			},
		})

		const button = blessed.button({
			...this.interactiveElementOptions,
			...this.buttonElementOptions,
			width: 8,
			height: 1,
			right: 1,
			align: 'center',
			bottom: 0,

			label: this.styleButtonLabel('New'),
		})

		table.append(button)
	}

	private renderErrorsTable(grid: contrib.grid) {
		const table = grid.set(4.8, 4, 4.2, 4, contrib.table, {
			...this.universalElementOptions,
			label: this.styleBoxLabel('Errors'),
			columnSpacing: 5,
			columnWidth: [15, 10, 10, 10],
			data: {
				headers: [
					' ',
					this.styleHeading('NAMESPACE'),
					this.styleHeading('VERSION'),
					this.styleHeading('HEALTH'),
				],
				data: [],
			},
		})

		const button = blessed.button({
			...this.interactiveElementOptions,
			...this.buttonElementOptions,
			width: 8,
			height: 1,
			right: 1,
			align: 'center',
			bottom: 0,
			label: this.styleButtonLabel('New'),
		})

		table.append(button)
	}

	private styleBoxLabel(label: string) {
		return chalk.hex(Theme.primaryColor).bold(label)
	}

	private styleButtonLabel(label: string) {
		return chalk.black(label)
	}

	private styleHeading(heading: string) {
		return chalk.hex(Theme.primaryColor).bold(heading)
	}

	private renderBackground(screen: blessed.Widgets.Screen) {
		const box = blessed.box({
			left: 0,
			right: 0,
			bottom: 0,
			top: 0,
			style: { bg: 'black' },
		})
		screen.append(box)
	}

	private renderTitle(grid: contrib.grid) {
		const header = fonts.render('SKX', {
			align: 'left',
			font: 'tiny',
			space: false,
		}).string

		grid.set(0.3, 0, 1.2, 5, blessed.box, {
			content: header,
			left: 1,
			top: 1,
			width: 50,
			height: 10,
			hideBorder: true,
			style: {
				fg: Theme.primaryColor,
				bg: Theme.backgroundColor,
			},
		})
	}

	private async renderFeaturesTable(grid: contrib.grid) {
		const featureCodes = this.getFeatureCodes()
		const tableRows = await Promise.all(
			featureCodes.map(async (code) => {
				const feature = this.getFeature(code)
				const isInstalled = await this.featureInstaller.isInstalled(code)
				return [
					feature.nameReadable ?? code,
					isInstalled ? 'Pass' : 'Not Installed',
				]
			})
		)

		let table = grid.set(0.9, 0, 4, 4, contrib.table, {
			...this.universalElementOptions,
			label: chalk.hex(Theme.primaryColor).bold('Features'),
			columnSpacing: 5,
			columnWidth: [25, 15],
			data: {
				headers: [' ', chalk.hex(Theme.primaryColor).bold('HEALTH')],
				data: tableRows,
			},
		})

		// const headerBox = blessed.box({
		// 	content: chalk.bold('                             HEALTH'),
		// 	left: 1,
		// 	top: 0,
		// 	right: 0,
		// 	height: 1,
		// 	align: 'center',
		// 	style: {
		// 		fg: Theme.backgroundColor,
		// 		bg: Theme.primaryColor,
		// 		width: '100%',
		// 	},
		// })

		// table.append(headerBox)
		table.focus()
	}
}
