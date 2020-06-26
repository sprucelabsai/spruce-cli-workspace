import ImportService from './ImportService'

export default class TypeCheckerService extends ImportService {
	public check = async (tsFile: string) => {
		await this.importAll(tsFile)
		// await this.execute(
		// 	`node_modules/.bin/ts-node --project ./tsconfig.json -r @sprucelabs/path-resolver/register ${tsFile}`
		// )
	}
}
