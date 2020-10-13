import { buildSchema, schemaChoicesToHash } from '@sprucelabs/schema'
import { roleSchema } from '@sprucelabs/spruce-core-schemas'
export const authorizerStatuses = [
	{
		name: 'clockedIn',
		label: 'Clocked in',
		hint: 'Is the person clocked in and ready to rock?',
	},
	{
		name: 'clockedOut',
		label: 'Clocked out',
		hint: 'When someone is not working (off the clock).',
	},
	{
		name: 'onPrem',
		label: 'On premise',
		hint: 'Are they at work (maybe working, maybe visiting).',
	},
	{
		name: 'offPrem',
		label: 'Off premise',
		hint: "They aren't at the office or shop.",
	},
] as const

const statusFields = authorizerStatuses.reduce((fields, status) => {
	const { name, ...props } = status
	// @ts-ignore
	fields[name] = {
		...props,
		type: 'boolean',
	}

	return fields
}, {})

const statusFlagsSchema = buildSchema({
	id: 'statusFlags',
	fields: {
		default: {
			type: 'boolean',
		},
		...statusFields,
	},
})

const roleBases = schemaChoicesToHash(roleSchema, 'base')

const defaultsByRoleSchema = buildSchema({
	id: 'defaultsByRole',
	fields: {
		...Object.keys(roleBases).reduce((fields, baseSlug) => {
			//@ts-ignore
			fields[baseSlug] = {
				type: 'boolean',
			}
			return fields
		}, {}),
	},
})

export default buildSchema({
	id: 'permissionContract',
	name: 'Permission Contract',
	description: '',
	fields: {
		requireAllPermissions: {
			type: 'boolean',
			defaultValue: false,
		},
		permissions: {
			type: 'schema',
			isRequired: true,
			isArray: true,
			options: {
				schema: {
					id: 'permission',
					name: 'Permission',
					fields: {
						name: {
							type: 'text',
							label: 'Permission name',
							isRequired: true,
							hint:
								'Hyphen separated name for this permission, e.g. can-unlock-doors',
						},
						requireAllStatuses: {
							type: 'boolean',
							label: 'Require all statuses',
							defaultValue: false,
						},
						defaultsByRoleBase: {
							type: 'schema',
							options: {
								schema: defaultsByRoleSchema,
							},
						},
						can: {
							type: 'schema',
							options: {
								schema: statusFlagsSchema,
							},
						},
					},
				},
			},
		},
	},
})
