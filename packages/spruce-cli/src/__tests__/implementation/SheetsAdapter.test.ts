import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import GoogleSpreadsheetAdapter from '../../jest/GoogleSpreadsheetAdapter'
import { IGoogleSheetsAdapter } from '../../types/jest.types'
import sheetUtil from './sheet.utilities'
require('dotenv').config()

export default class SheetsAdapterTest extends AbstractSpruceTest {
	private static adapter: IGoogleSheetsAdapter
	private static sheetId = '1MFb9AkB8sm7rurYew8hgzrXTz3JDxOFhl4kN9sNQVxw'
	private static worksheetId: number

	protected static async beforeEach() {
		super.beforeEach()

		const email = process.env.GOOGLE_SERVICE_EMAIL_TEST as string
		const key = process.env.GOOGLE_SERVICE_PRIVATE_KEY_TEST as string

		this.adapter = new GoogleSpreadsheetAdapter({
			serviceEmail: email,
			privateKey: key,
		})

		sheetUtil.serviceEmail = email
		sheetUtil.privateKey = key
	}

	protected static async beforeAll() {
		this.worksheetId = await sheetUtil.generateRandomWorksheet(this.sheetId)
	}

	protected static async afterAll() {
		await super.afterAll()
		await sheetUtil.deleteWorksheet(this.sheetId, this.worksheetId)
	}

	@test('can set number value', 100)
	@test('can set a boolean value', true)
	@test('can set string value', 'it worked!')
	protected static async canUpdateCell(expected: string | number | boolean) {
		const sheetId = this.sheetId
		const worksheetId = this.worksheetId

		await this.adapter.updateCell({
			sheetId,
			worksheetId,
			cell: 'A1',
			value: expected,
		})

		// make sure it actually worked
		const actualValue = await sheetUtil.fetchCellValue(
			sheetId,
			worksheetId,
			'A1'
		)

		assert.isEqual(actualValue, expected)
	}
}
