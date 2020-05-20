/* eslint-disable spruce/prefer-pascal-case-enums */
// Import base class
import AbstractService from '#spruce/../src/services/AbstractService'
// Import necessary interface(s)
import { IServiceOptions } from '#spruce/../src/services/AbstractService'
// Import each matching class that will be autoloaded
import ChildService from '#spruce/../src/services/ChildService'
import FeatureService from '#spruce/../src/services/FeatureService'
import LintService from '#spruce/../src/services/LintService'
import PinService from '#spruce/../src/services/PinService'
import PkgService from '#spruce/../src/services/PkgService'
import ValueTypeService from '#spruce/../src/services/ValueTypeService'
import VmService from '#spruce/../src/services/VmService'
import VsCodeService from '#spruce/../src/services/VsCodeService'


export type Services = ChildService | FeatureService | LintService | PinService | PkgService | ValueTypeService | VmService | VsCodeService

export interface IServices {
	child: ChildService
	feature: FeatureService
	lint: LintService
	pin: PinService
	pkg: PkgService
	valueType: ValueTypeService
	vm: VmService
	vsCode: VsCodeService
}

export enum Service {
	Child = 'child',
	Feature = 'feature',
	Lint = 'lint',
	Pin = 'pin',
	Pkg = 'pkg',
	ValueType = 'valueType',
	Vm = 'vm',
	VsCode = 'vsCode',
}

export default async function autoloader<
	K extends Service[]
>(options: {
	constructorOptions:   IServiceOptions
	after?: (instance: AbstractService) => Promise<void>
	only?: K
}): Promise<K extends undefined ? IServices : Pick<IServices, K[number]>> {
	const { constructorOptions, after, only } = options
	const siblings:Partial<IServices> = {}

	if (!only || only.indexOf(Service.Child) === -1) {
		const childService = new ChildService(constructorOptions)
		if (after) {
			await after(childService)
		}
		siblings.child = childService
	}
	if (!only || only.indexOf(Service.Feature) === -1) {
		const featureService = new FeatureService(constructorOptions)
		if (after) {
			await after(featureService)
		}
		siblings.feature = featureService
	}
	if (!only || only.indexOf(Service.Lint) === -1) {
		const lintService = new LintService(constructorOptions)
		if (after) {
			await after(lintService)
		}
		siblings.lint = lintService
	}
	if (!only || only.indexOf(Service.Pin) === -1) {
		const pinService = new PinService(constructorOptions)
		if (after) {
			await after(pinService)
		}
		siblings.pin = pinService
	}
	if (!only || only.indexOf(Service.Pkg) === -1) {
		const pkgService = new PkgService(constructorOptions)
		if (after) {
			await after(pkgService)
		}
		siblings.pkg = pkgService
	}
	if (!only || only.indexOf(Service.ValueType) === -1) {
		const valueTypeService = new ValueTypeService(constructorOptions)
		if (after) {
			await after(valueTypeService)
		}
		siblings.valueType = valueTypeService
	}
	if (!only || only.indexOf(Service.Vm) === -1) {
		const vmService = new VmService(constructorOptions)
		if (after) {
			await after(vmService)
		}
		siblings.vm = vmService
	}
	if (!only || only.indexOf(Service.VsCode) === -1) {
		const vsCodeService = new VsCodeService(constructorOptions)
		if (after) {
			await after(vsCodeService)
		}
		siblings.vsCode = vsCodeService
	}

	return siblings as K extends undefined ? IServices : Pick<IServices, K[number]>
}
