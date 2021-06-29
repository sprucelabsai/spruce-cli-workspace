import AbstractSpruceError from '@sprucelabs/error'
import { Schema } from '@sprucelabs/schema'
// @ts-ignore
import fonts from 'cfonts'
import chalk from 'chalk'
import { filter } from 'lodash'
import { FieldDefinitions } from '#spruce/schemas/fields/fields.types'
import { CLI_HERO } from '../constants'
import { FeatureAction } from '../features/features.types'
import { GraphicsInterface } from '../types/cli.types'
import { GraphicsTextEffect } from '../types/graphicsInterface.types'

const uiUtil = {
	renderActionMastHead(ui: GraphicsInterface, action: FeatureAction<Schema>) {
		return this.renderMasthead({
			ui,
			headline: action.invocationMessage,
		})
	},
	renderMasthead(options: {
		ui: GraphicsInterface
		hero?: string
		headline: string
	}) {
		const { ui, hero, headline } = options

		ui.clear()
		ui.renderHero(hero ?? CLI_HERO)
		ui.renderHeadline(headline)
	},
	renderHero(message: string, effects?: GraphicsTextEffect[]) {
		fonts.say(message, {
			// Font: 'tiny',
			align: 'left',
			gradient: [GraphicsTextEffect.Red, GraphicsTextEffect.Blue],
			colors: effects ? uiUtil.filterEffectsForCFonts(effects) : undefined,
		})
	},
	filterEffectsForCFonts(effects: GraphicsTextEffect[]) {
		return filter(
			effects,
			(effect) =>
				[
					GraphicsTextEffect.SpruceHeader,
					GraphicsTextEffect.Reset,
					GraphicsTextEffect.Bold,
					GraphicsTextEffect.Dim,
					GraphicsTextEffect.Italic,
					GraphicsTextEffect.Underline,
					GraphicsTextEffect.Inverse,
					GraphicsTextEffect.Hidden,
					GraphicsTextEffect.Strikethrough,
					GraphicsTextEffect.Visible,
				].indexOf(effect) === -1
		)
	},
	generatePromptLabel(fieldDefinition: FieldDefinitions): any {
		let label = fieldDefinition.label

		if (fieldDefinition.hint) {
			label = `${label} ${chalk.italic.dim(`(${fieldDefinition.hint})`)}`
		}

		label = label + ': '

		return label
	},
	cleanStack(err: Error) {
		const message = err.message
		let stack = err.stack ? err.stack.replace(message, '') : ''

		if (err instanceof AbstractSpruceError) {
			let original = err.originalError
			while (original) {
				stack = stack.replace('Error: ' + original.message, '')
				original = (original as AbstractSpruceError).originalError
			}
		}

		const stackLines = stack.split('\n')

		return stackLines
	},
}

export default uiUtil
