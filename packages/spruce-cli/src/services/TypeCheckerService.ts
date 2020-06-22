import CommandService from './CommandService'

export default class TypeCheckerService extends CommandService {
	public check = async (tsFile: string) => {
		await this.execute(
			`node_modules/.bin/ts-node --project ./tsconfig.json ${tsFile}`
		)
	}
}
