import { TemplateRenderAs, FieldDefinition } from '@sprucelabs/schema'
import sha1 from 'sha1'

export default class KeyGeneratorUtility {
	public static generateFieldKey(
		renderAs: TemplateRenderAs,
		definition: FieldDefinition
	) {
		return renderAs + '-' + sha1(`${JSON.stringify(definition)}`)
	}
}
