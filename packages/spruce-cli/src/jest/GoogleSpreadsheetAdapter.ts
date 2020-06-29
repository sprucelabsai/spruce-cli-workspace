import { GoogleSpreadsheet } from 'google-spreadsheet'
import { IGoogleSheetsAdapter, IGoogleSheetsOptions } from '../types/jest.types'
require('dotenv').config()

export default class GoogleSpreadsheetAdapter implements IGoogleSheetsAdapter {
	private serviceEmail: string
	private privateKey: string
	private spreedsheetInstancesById: Record<
		string,
		Promise<GoogleSpreadsheet>
	> = {}

	public constructor(options?: IGoogleSheetsOptions) {
		const email = options
			? options.serviceEmail
			: process.env.GOOGLE_SERVICE_EMAIL

		if (!email) {
			throw new Error(
				`GoogleSpreadsheetAdapter needs GOOGLE_SERVICE_EMAIL in the env or passed email to constructor`
			)
		}

		this.serviceEmail = email

		const privateKey = options
			? options.privateKey
			: process.env.GOOGLE_SERVICE_PRIVATE_KEY

		if (!privateKey) {
			throw new Error(
				'GoogleSpreadsheetAdapter needs GOOGLE_SERVICE_PRIVATE_KEY in the env or privateKey in constructor'
			)
		}

		this.privateKey = privateKey
	}

	public async updateCell(options: {
		sheetId: string
		worksheetId: number
		cell: string
		value: string | number | boolean
	}): Promise<void> {
		const { sheetId, worksheetId, value, cell: cellLookup } = options

		const { cell, sheet } = await this.fetchSheetAndCell(
			sheetId,
			worksheetId,
			cellLookup
		)

		cell.value = value

		await sheet.saveUpdatedCells()
	}

	private async fetchSheetAndCell(
		sheetId: string,
		worksheetId: number,
		cellLookup: string
	) {
		const spreadsheet = await this.fetchSpreadsheet(sheetId)
		const sheet = spreadsheet.sheetsById[worksheetId]

		await sheet.loadCells(cellLookup)

		const cell = sheet.getCellByA1(cellLookup)

		return { cell, sheet }
	}

	private async fetchSpreadsheet(sheetId: string) {
		if (this.spreedsheetInstancesById[sheetId]) {
			return this.spreedsheetInstancesById[sheetId]
		}

		const spreadsheet = this.uncachedFetchSpreadsheet(sheetId)

		this.spreedsheetInstancesById[sheetId] = spreadsheet

		return spreadsheet
	}

	private async uncachedFetchSpreadsheet(sheetId: string) {
		const doc = new GoogleSpreadsheet(sheetId)

		await doc.useServiceAccountAuth({
			// eslint-disable-next-line @typescript-eslint/camelcase
			client_email: this.serviceEmail,
			// eslint-disable-next-line @typescript-eslint/camelcase
			private_key: this.privateKey
		})

		await doc.loadInfo()

		return doc
	}
}
