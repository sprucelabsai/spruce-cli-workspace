import PinService from './PinService'
import VmService from './VmService'
import YarnService from './Yarn'

export interface IServices {
	pin: PinService
	vm: VmService
	yarn: YarnService
}
