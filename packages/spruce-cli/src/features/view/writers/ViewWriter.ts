import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { ViewsOptions } from '../../../../../spruce-templates/build'
import SpruceError from '../../../errors/SpruceError'
import AbstractWriter from '../../../writers/AbstractWriter'

export default class ViewWriter extends AbstractWriter {
	public writeSkillViewController(
		cwd: string,
		options: {
			name: string
			namePascal: string
		}
	) {
		const { path } = this.buildViewControllerPath(
			cwd,
			'skillView',
			options.namePascal
		)

		return this.writeController(path, options)
	}

	public async writeCombinedViewsFile(cwd: string, options: ViewsOptions) {
		let { imports, ...rest } = options

		const destinationDir = diskUtil.resolveHashSprucePath(cwd, 'views')
		const destination = diskUtil.resolvePath(destinationDir, 'views.ts')

		imports = imports.map((i) => ({
			...i,
			path: pathUtil.relative(destinationDir, i.path).replace('.ts', ''),
		}))

		const contents = this.templates.views({ imports, ...rest })

		const results = await this.writeFileIfChangedMixinResults(
			destination,
			contents,
			'Used to export your controllers to Heartwood.'
		)

		return results
	}

	public writeViewController(
		cwd: string,
		options: {
			viewType: string
			namePascal: string
			viewModel: string
			name: string
		}
	) {
		const { path } = this.buildViewControllerPath(
			cwd,
			'view',
			options.namePascal
		)

		return this.writeController(path, options)
	}

	private async writeController(path: string, options: any) {
		const { namePascal, viewModel, viewType, name } = options

		if (diskUtil.doesFileExist(path)) {
			throw new SpruceError({
				code: 'SKILL_VIEW_EXISTS',
				name,
			})
		}

		const contents =
			viewType === 'skillView'
				? this.templates.skillViewController({ namePascal })
				: this.templates.viewController({ namePascal, viewModel })

		const results = this.writeFileIfChangedMixinResults(path, contents, 'Test')

		await this.lint(path)

		return results
	}

	public doesRootControllerExist(cwd: string) {
		const { path } = this.buildViewControllerPath(cwd, 'skillView', 'Root')
		return diskUtil.doesFileExist(path)
	}

	private buildViewControllerPath(
		cwd: string,
		viewType: string,
		namePascal: string
	) {
		const ext = viewType === 'skillView' ? '.svc.ts' : '.vc.ts'
		const filename = namePascal + ext
		const path = diskUtil.resolvePath(cwd, 'src', viewType + 's', filename)
		return { path, filename }
	}
}
