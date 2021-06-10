import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const themeSchema: SpruceSchemas.Heartwood.v2021_02_11.ThemeSchema  = {
	id: 'theme',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Theme',
	    fields: {
	            /** Color 1. Used to color anything overlayed on the background (color1Inverse or color1InverseGradient). */
	            'color1': {
	                label: 'Color 1',
	                type: 'text',
	                hint: 'Used to color anything overlayed on the background (color1Inverse or color1InverseGradient).',
	                options: undefined
	            },
	            /** Color 1 (inverse). Background color of the view if color1InverseGradient is not set */
	            'color1Inverse': {
	                label: 'Color 1 (inverse)',
	                type: 'text',
	                hint: 'Background color of the view if color1InverseGradient is not set',
	                options: undefined
	            },
	            /** Color 1 Gradient (inverse). Background griedent applied to view. */
	            'color1InverseGradient': {
	                label: 'Color 1 Gradient (inverse)',
	                type: 'text',
	                hint: 'Background griedent applied to view.',
	                options: undefined
	            },
	            /** Color 2. The color of anything overlayed on the background of a card (color2Inverse) */
	            'color2': {
	                label: 'Color 2',
	                type: 'text',
	                hint: 'The color of anything overlayed on the background of a card (color2Inverse)',
	                options: undefined
	            },
	            /** Color 2 (inverse with transparency). Background color used when some transparency is needed for context. */
	            'color2InverseTransparent': {
	                label: 'Color 2 (inverse with transparency)',
	                type: 'text',
	                hint: 'Background color used when some transparency is needed for context.',
	                options: undefined
	            },
	            /** Color. Background color of cards. */
	            'color2Inverse': {
	                label: 'Color',
	                type: 'text',
	                hint: 'Background color of cards.',
	                options: undefined
	            },
	            /** Color 3. Subtitle and label colors. */
	            'color3': {
	                label: 'Color 3',
	                type: 'text',
	                hint: 'Subtitle and label colors.',
	                options: undefined
	            },
	            /** Color 4. Buttons, borders, outlines, and highlights */
	            'color4': {
	                label: 'Color 4',
	                type: 'text',
	                hint: 'Buttons, borders, outlines, and highlights',
	                options: undefined
	            },
	            /** Color. Should compliment color 4 */
	            'color4Inverse': {
	                label: 'Color',
	                type: 'text',
	                hint: 'Should compliment color 4',
	                options: undefined
	            },
	            /** Color. The background color of the control bar. */
	            'controlBarBg': {
	                label: 'Color',
	                type: 'text',
	                hint: 'The background color of the control bar.',
	                options: undefined
	            },
	            /** Color. Errors overlayed on a background colored with errorColor1Inverse. */
	            'errorColor1': {
	                label: 'Color',
	                type: 'text',
	                hint: 'Errors overlayed on a background colored with errorColor1Inverse.',
	                options: undefined
	            },
	            /** Color. The background used when rendering errors. */
	            'errorColor1Inverse': {
	                label: 'Color',
	                type: 'text',
	                hint: 'The background used when rendering errors.',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(themeSchema)

export default themeSchema
