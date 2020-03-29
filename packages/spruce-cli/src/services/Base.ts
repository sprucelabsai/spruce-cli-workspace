import { Mercury } from '@sprucelabs/mercury'

export default abstract class BaseService {
	public mercury: Mercury

	public constructor(mercury: Mercury) {
		this.mercury = mercury
	}
}
