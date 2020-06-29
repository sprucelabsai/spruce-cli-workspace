import { GoogleSpreadsheet } from 'google-spreadsheet'
import { IGoogleSheetsAdapter, IGoogleSheetsOptions } from '../types/jest.types'

export default class GoogleSpreadsheetAdapter implements IGoogleSheetsAdapter {
	private serviceEmail: string
	private privateKey: string

	public constructor(options: IGoogleSheetsOptions) {
		this.serviceEmail = options.serviceEmail
		this.privateKey = options.privateKey
	}

	public async updateCell(options: {
		sheetId: string
		worksheetId: number
		cell: string
		value: string | number
	}): Promise<void> {
		const { sheetId } = options

		const doc = new GoogleSpreadsheet(sheetId)

		await doc.useServiceAccountAuth({
			// eslint-disable-next-line @typescript-eslint/camelcase
			client_email: this.serviceEmail,
			// eslint-disable-next-line @typescript-eslint/camelcase
			private_key: this.privateKey
		})

		await doc.loadInfo()

		debugger
	}
}
