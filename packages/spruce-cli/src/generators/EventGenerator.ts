import pathUtil from 'path'
import { IEventListenerOptions } from '@sprucelabs/spruce-templates'
import namesUtil from '../utilities/names.utility'
import AbstractGenerator from './AbstractGenerator'

export default class EventGenerator extends AbstractGenerator {
	public generateListener(
		destinationDir: string,
		options: Omit<IEventListenerOptions, 'nameConst'> & { version: string }
	) {
		const { eventName, eventNamespace, version } = options
		const filename = `${eventName}.listener.ts`

		const resolvedDestination = pathUtil.join(
			destinationDir,
			version,
			eventNamespace,
			filename
		)
		const listenerContents = this.templates.listener({
			...options,
			nameConst: namesUtil.toConst(`${eventNamespace}_${eventName}`),
		})

		const results = this.writeFileIfChangedMixinResults(
			resolvedDestination,
			listenerContents,
			`Listener for  ${eventNamespace}.${eventName}.`
		)

		return results
	}
}
