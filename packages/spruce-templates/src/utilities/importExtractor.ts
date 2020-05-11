import { IFieldTemplateItem } from '@sprucelabs/schema'
import uniqWith from 'lodash/uniqWith'

export interface ISchemaImport {
	package: string
	importAs: string
}

/** Take all the field template items map them to imports */
export default function(fields: IFieldTemplateItem[]): ISchemaImport[] {
	const imports: (ISchemaImport & { pascalName: string })[] = fields.map(
		item => ({
			package: item.package,
			importAs: item.importAs,
			pascalName: item.pascalName
		})
	)

	const uniqueImports = uniqWith(
		imports,
		(i1, i2) => i1.package === i2.package && i1.importAs === i2.importAs
	)

	// Lets do some tests catch some error
	const schemaName = uniqueImports.find(
		i => i.importAs.toLowerCase() === 'schema'
	)
	if (schemaName) {
		throw new Error(
			`${schemaName.pascalName} has importAs="Schema", which is a reserved word`
		)
	}

	// See if there are any duplicate exportAs
	const aliases: Record<string, string> = {}
	uniqueImports.forEach(item => {
		if (item.importAs in aliases) {
			throw new Error(
				`${item.pascalName} has a public importAs="${item.importAs}"`
			)
		}
	})

	return uniqueImports
}
