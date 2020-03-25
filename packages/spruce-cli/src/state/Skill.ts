import config, { ConfigScope, RemoteType } from '../utilities/Config'

/** The currently authenticated skill */
export class Skill {
	public id?: string
	public apiKey?: string
	public host?: string
	public name?: string
	public description?: string
	public slug?: string
	public interfaceUrl?: string
	public serverUrl?: string
	public remote?: RemoteType

	private readonly stateKey = 'Skill'

	/** Whether there is a skill set for the current directory */
	public isSet(): boolean {
		this.loadSavedSkill()
		return (
			typeof this.id === 'string' &&
			typeof this.apiKey === 'string' &&
			typeof this.name === 'string' &&
			typeof this.slug === 'string' &&
			typeof this.remote === 'string'
		)
	}

	public toData() {
		return {
			id: this.id,
			apiKey: this.apiKey,
			host: this.host,
			name: this.name,
			description: this.description,
			slug: this.slug,
			interfaceUrl: this.interfaceUrl,
			serverUrl: this.serverUrl,
			remote: this.remote
		}
	}

	public save() {
		config.save(
			{
				[this.stateKey]: this.toData()
			},
			ConfigScope.Directory
		)
		this.loadSavedSkill()
	}

	public resetState() {
		config.save(
			{
				[this.stateKey]: {}
			},
			ConfigScope.Directory
		)
		this.loadSavedSkill()
	}

	public set(options: {
		id?: string
		apiKey?: string
		host?: string
		name?: string
		description?: string
		slug?: string
		interfaceUrl?: string
		serverUrl?: string
		remote?: RemoteType
	}) {
		const {
			id,
			apiKey,
			host,
			name,
			description,
			slug,
			interfaceUrl,
			serverUrl,
			remote
		} = options

		if (typeof id !== 'undefined') {
			this.id = id
		}
		if (typeof apiKey !== 'undefined') {
			this.apiKey = apiKey
		}
		if (typeof host !== 'undefined') {
			this.host = host
		}
		if (typeof name !== 'undefined') {
			this.name = name
		}
		if (typeof description !== 'undefined') {
			this.description = description
		}
		if (typeof slug !== 'undefined') {
			this.slug = slug
		}
		if (typeof interfaceUrl !== 'undefined') {
			this.interfaceUrl = interfaceUrl
		}
		if (typeof serverUrl !== 'undefined') {
			this.serverUrl = serverUrl
		}
		if (typeof remote !== 'undefined') {
			this.remote = remote
		}

		this.save()
	}

	/** Prints info about the current skill */
	public async printInfo() {
		this.loadSavedSkill()
		if (!this.isSet()) {
			log.fatal(
				`A skill has not been set for ${process.cwd()}\n\nTry "spruce skill:create"`
			)
			return
		}
		const skillName = this.name || 'Skill'
		log.printState({
			headline: skillName,
			state: this.toData()
		})
	}

	/** Loads saved skill from saved config */
	private loadSavedSkill() {
		const skill = config.get(this.stateKey, ConfigScope.Directory) || {}

		if (skill) {
			this.id = skill.id
			this.apiKey = skill.apiKey
			this.host = skill.host
			this.name = skill.name
			this.description = skill.description
			this.slug = skill.slug
			this.interfaceUrl = skill.interfaceUrl
			this.serverUrl = skill.serverUrl
			this.remote = skill.remote
		}
	}
}

const skill = new Skill()
export default skill
