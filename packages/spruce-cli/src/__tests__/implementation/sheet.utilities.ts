import { GoogleSpreadsheet } from 'google-spreadsheet'
require('dotenv').config()

async function loadSheet(sheetId: string) {
	const doc = new GoogleSpreadsheet(sheetId)
	await doc.useServiceAccountAuth({
		// eslint-disable-next-line @typescript-eslint/camelcase
		client_email: process.env.GOOGLE_SERVICE_EMAIL as string,
		// eslint-disable-next-line @typescript-eslint/camelcase
		private_key: process.env.GOOGLE_SERVICE_PRIVATE_KEY as string
	})
	await doc.loadInfo()
	return doc
}

const sheetUtil = {
	async fetchCellValue(sheetId: string, worksheetId: number, cell: string) {
		const sheet = await loadSheet(sheetId)
		const worksheet = sheet.sheetsById[worksheetId]

		await worksheet.loadCells(cell)

		const value = worksheet.getCellByA1(cell)

		return value.value
	},

	async generateRandomWorksheet(sheetId: string): Promise<number> {
		const name = `TEST.${Date.now()}`
		const sheet = await loadSheet(sheetId)

		const worksheet = await sheet.addWorksheet({ title: name })

		return parseInt(worksheet.sheetId, 10)
	},

	async deleteWorksheet(sheetId: string, worksheetId: number): Promise<void> {
		const sheet = await loadSheet(sheetId)

		const worksheet = sheet.sheetsById[worksheetId]

		await worksheet.delete()
	}
}

export default sheetUtil
