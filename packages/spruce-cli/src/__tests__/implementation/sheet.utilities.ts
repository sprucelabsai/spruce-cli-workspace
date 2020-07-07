import { GoogleSpreadsheet } from 'google-spreadsheet'
require('dotenv').config()

async function loadSheet(
	serviceEmail: string,
	privateKey: string,
	sheetId: string
) {
	const doc = new GoogleSpreadsheet(sheetId)
	await doc.useServiceAccountAuth({
		// eslint-disable-next-line @typescript-eslint/camelcase
		client_email: serviceEmail,
		// eslint-disable-next-line @typescript-eslint/camelcase
		private_key: privateKey,
	})
	await doc.loadInfo()
	return doc
}

const sheetUtil = {
	serviceEmail: process.env.GOOGLE_SERVICE_EMAIL as string,
	privateKey: process.env.GOOGLE_SERVICE_PRIVATE_KEY as string,

	async fetchCellValue(sheetId: string, worksheetId: number, cell: string) {
		const sheet = await loadSheet(this.serviceEmail, this.privateKey, sheetId)
		const worksheet = sheet.sheetsById[worksheetId]

		await worksheet.loadCells(cell)

		const value = worksheet.getCellByA1(cell)

		return value.value
	},

	async generateRandomWorksheet(sheetId: string): Promise<number> {
		const name = `TEST.${Date.now()}`
		const sheet = await loadSheet(this.serviceEmail, this.privateKey, sheetId)

		const worksheet = await sheet.addWorksheet({ title: name })

		return parseInt(worksheet.sheetId, 10)
	},

	async deleteWorksheet(sheetId: string, worksheetId: number): Promise<void> {
		const sheet = await loadSheet(this.serviceEmail, this.privateKey, sheetId)

		const worksheet = sheet.sheetsById[worksheetId]

		await worksheet.delete()
	},
}

export default sheetUtil
