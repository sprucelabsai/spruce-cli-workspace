import ImportService from './ImportService'

export default class TypeCheckerService extends ImportService {
	public check = async (tsFile: string) => {
		await this.importAll(tsFile)
	}
}
