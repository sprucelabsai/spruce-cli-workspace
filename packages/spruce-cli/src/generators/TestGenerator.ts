import pathUtil from 'path'
import { ITestOptions } from '@sprucelabs/spruce-templates'
import AbstractGenerator from './AbstractGenerator'

export default class TestGenerator extends AbstractGenerator {
	public generateTest(
		destinationDir: string,
		options: ITestOptions & { type: string }
	) {
		const { namePascal } = options
		const filename = `${namePascal}.test.ts`

		const resolvedDestination = pathUtil.join(destinationDir, filename)
		const testContent = this.templates.test(options)

		const results = this.writeFileIfChangedMixinResults(
			resolvedDestination,
			testContent,
			`Your ${options.type} test.`
		)

		return results
	}
}
