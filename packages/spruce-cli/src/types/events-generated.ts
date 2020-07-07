/* eslint-disable */
// DO NOT EDIT. THIS FILE IS GENERATED FROM https://local-api.spruce.ai//api/2.0/types/events
// import { IHWCalendarEvent, IHWCalendarEventDetailsItem, IHWAction, ISpruceSettingsSection } from '@sprucelabs/spruce-types'


/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Get schemas used in the spruce platform 
 */
export namespace SpruceEvents.Core.GetSchemas {
	/** The event name  */
	export const name = 'get-schemas'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.GetSchemas.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.GetSchemas.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Get skills where the user is a developer
 */
export namespace SpruceEvents.Core.GetDeveloperSkills {
	/** The event name  */
	export const name = 'get-developer-skills'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.GetDeveloperSkills.eventName', payload))
	*/
	export interface IPayload {

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.GetDeveloperSkills.IResponseBody = { ... }
	 */
	export interface IResponseBody {
		/**
		 * 
		 */
		skills: {
			/**
			 * Your skill id
			 */
			id: string
			/**
			 * Your skill api key. This should never be exposed publicly
			 */
			apiKey: string
			/**
			 * Your skill name
			 */
			name: string
			/**
			 * Your skill description
			 */
			description: string
			/**
			 * Your skill slug
			 */
			slug?: string
		}[]
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Register a new skill with the api
 */
export namespace SpruceEvents.Core.RegisterSkill {
	/** The event name  */
	export const name = 'register-skill'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.RegisterSkill.eventName', payload))
	*/
	export interface IPayload {
		/**
		 * The name of your skill
		 */
		name: string
		/**
		 * A description of your skill
		 */
		description: string
		/**
		 * The desired skill slug
		 */
		slug?: string

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.RegisterSkill.IResponseBody = { ... }
	 */
	export interface IResponseBody {
		/**
		 * Your skill id
		 */
		id: string
		/**
		 * Your skill api key. This should never be exposed publicly
		 */
		apiKey: string
		/**
		 * Your skill name
		 */
		name: string
		/**
		 * Your skill description
		 */
		description: string
		/**
		 * Your skill slug
		 */
		slug?: string
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Un-register a skill
 */
export namespace SpruceEvents.Core.UnregisterSkill {
	/** The event name  */
	export const name = 'unregister-skill'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.UnregisterSkill.eventName', payload))
	*/
	export interface IPayload {
		/**
		 * Your skill id
		 */
		id: string
		/**
		 * Your skill api key. This should never be exposed publicly
		 */
		apiKey: string

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.UnregisterSkill.IResponseBody = { ... }
	 */
	export interface IResponseBody {
		/**
		 * Will be &quot;success&quot; if it has been unregistered
		 */
		status: string
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * ** Missing event description **
 */
export namespace SpruceEvents.Core.AddDeveloper {
	/** The event name  */
	export const name = 'add-developer'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.AddDeveloper.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.AddDeveloper.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * ** Missing event description **
 */
export namespace SpruceEvents.Core.RemoveDeveloper {
	/** The event name  */
	export const name = 'remove-developer'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.RemoveDeveloper.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.RemoveDeveloper.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Make a gql request to the api
 */
export namespace SpruceEvents.Core.Gql {
	/** The event name  */
	export const name = 'gql'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.Gql.eventName', payload))
	*/
	export interface IPayload {
		/**
		 * The gql query
		 */
		query: string
		/**
		 * GQL variables
		 */
		variables: Record<string, any>

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.Gql.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Login with a phone number and pin
 */
export namespace SpruceEvents.Core.Login {
	/** The event name  */
	export const name = 'login'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.Login.eventName', payload))
	*/
	export interface IPayload {
		/**
		 * The phone number of the user
		 */
		phoneNumber: string
		/**
		 * The code that was sent to the user when login was requested
		 */
		code?: string

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.Login.IResponseBody = { ... }
	 */
	export interface IResponseBody {
		/**
		 * The JWT which is used to authenticate the User during future requests
		 */
		jwt?: string
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Request login
 */
export namespace SpruceEvents.Core.RequestLogin {
	/** The event name  */
	export const name = 'request-login'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.RequestLogin.eventName', payload))
	*/
	export interface IPayload {
		/**
		 * The phone number of the user that is logging in
		 */
		phoneNumber: string
		/**
		 * Either &quot;pin&quot; or &quot;magiclink&quot;
		 */
		method: string
		/**
		 * Optional redirect path
		 */
		redirect?: string
		/**
		 * Optional query string to include
		 */
		query?: string

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.RequestLogin.IResponseBody = { ... }
	 */
	export interface IResponseBody {
		/**
		 * Will be &quot;success&quot;. On failure, check errors
		 */
		status: string
		/**
		 * The formatted phone number
		 */
		phoneNumber: string
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Get API configuration
 */
export namespace SpruceEvents.Core.GetApiConfig {
	/** The event name  */
	export const name = 'get-api-config'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.GetApiConfig.eventName', payload))
	*/
	export interface IPayload {

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.GetApiConfig.IResponseBody = { ... }
	 */
	export interface IResponseBody {
		/**
		 * The base url for the api
		 */
		baseUrl: string
		/**
		 * The base url for spruce web
		 */
		baseWebUrl: string
		/**
		 * The minimum cli version needed to interact with the api
		 */
		cliVersion: string
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Get UI enhancements
 */
export namespace SpruceEvents.Core.GetUiEnhancements {
	/** The event name  */
	export const name = 'get-ui-enhancements'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.GetUiEnhancements.eventName', payload))
	*/
	export interface IPayload {
		/**
		 * The view that is being displayed. booking:create-appointment for example
		 */
		view: string

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.GetUiEnhancements.IResponseBody = { ... }
	 */
	export interface IResponseBody {
		/**
		 * 
		 */
		sections: {
			/**
			 * The section id for this enhancement
			 */
			id: string
			/**
			 * Event detail items to place in this section
			 */
			// eventDetailsItems?: IHWCalendarEventDetailsItem[] | null
			/**
			 * Actions that should be added to the context menu of this section
			 */
			// actions?: IHWAction[] | null
		}[]
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Emit this event when a new calendar event was created
 */
export namespace SpruceEvents.Core.DidCreateCalendarEvent {
	/** The event name  */
	export const name = 'did-create-calendar-event'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API emits this event. You'll receive a payload in your event handler (server/events/did-create-calendar-event.ts)
	 * You'll create an event handler that receives this payload.
	 * Don't forget to subscribe to this event in config/eventContract.ts
	*/
	export interface IPayload {
		/**
		 * The id of the calendar that this event should be added to
		 */
		calendarId: string
		/**
		 * The calendar event that was created
		 */
		// calendarEvent: IHWCalendarEvent

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill will respond to this event with this data in the body.
	 */
	export interface IResponseBody {
		/**
		 * Will be set to &quot;success&quot; if the event is received and processed
		 */
		status: string
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Core asks for settings to display on a page
 */
export namespace SpruceEvents.Core.GetSettings {
	/** The event name  */
	export const name = 'get-settings'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.GetSettings.eventName', payload))
	*/
	export interface IPayload {
		/**
		 * The page where settings are being requested. This will be one of:
		 * * skill_settings_user
		 * * skill_settings_user_org
		 * * skill_settings_user_location
		 * * skill_settings_org
		 * * skill_settings_location
		 */
		page?: string

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.GetSettings.IResponseBody = { ... }
	 */
	export interface IResponseBody {
		/**
		 * Array of settings to display
		 */
		settings?: {
			/**
			 * The title for these settings
			 */
			title: string
			/**
			 * The page these settings should appear on
			 */
			page: string
			/**
			 * A unique identifier for these settings
			 */
			id: string
			/**
			 * The settings sections.
			 */
			// sections?: ISpruceSettingsSection[]
		}[]
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * This is an opportunity to enrich user data. Set the user name, profile image, create a note, etc.
 */
export namespace SpruceEvents.Core.EnrichUser {
	/** The event name  */
	export const name = 'enrich-user'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.EnrichUser.eventName', payload))
	*/
	export interface IPayload {
		/**
		 * The user id to enrich
		 */
		enrichUserId?: string

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.EnrichUser.IResponseBody = { ... }
	 */
	export interface IResponseBody {
		/**
		 * Respond with &quot;success&quot; to indicate you received the event.
		 */
		status: string
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Core asks for settings validation
 */
export namespace SpruceEvents.Core.ValidateSettings {
	/** The event name  */
	export const name = 'validate-settings'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.ValidateSettings.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.ValidateSettings.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Core asks for views to display on a page
 */
export namespace SpruceEvents.Core.GetViews {
	/** The event name  */
	export const name = 'get-views'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.GetViews.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.GetViews.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Core asks this skill to provide cards
 */
export namespace SpruceEvents.Core.GetCards {
	/** The event name  */
	export const name = 'get-cards'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.GetCards.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.GetCards.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When the skill is installed to a location
 */
export namespace SpruceEvents.Core.WasInstalled {
	/** The event name  */
	export const name = 'was-installed'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.WasInstalled.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.WasInstalled.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When a guest joins wifi at a location for the first time
 */
export namespace SpruceEvents.Core.DidSignup {
	/** The event name  */
	export const name = 'did-signup'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.DidSignup.eventName', payload))
	*/
	export interface IPayload {
		/**
		 * 
		 */
		locationIds: string[]

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.DidSignup.IResponseBody = { ... }
	 */
	export interface IResponseBody {
		/**
		 * Respond with &quot;success&quot; to indicate you received the event.
		 */
		status: string
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Will fire before a guest signs up and gives skills the opportunity to block signup.
 */
export namespace SpruceEvents.Core.WillSignup {
	/** The event name  */
	export const name = 'will-signup'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.WillSignup.eventName', payload))
	*/
	export interface IPayload {
		/**
		 * 
		 */
		locationIds: string[]

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.WillSignup.IResponseBody = { ... }
	 */
	export interface IResponseBody {
		/**
		 * Set to true to block the user from signing up.
		 */
		preventDefault?: boolean
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When a guest returns and their phone hits the wifi
 */
export namespace SpruceEvents.Core.DidEnter {
	/** The event name  */
	export const name = 'did-enter'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.DidEnter.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.DidEnter.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Triggered an hour after a guest leaves
 */
export namespace SpruceEvents.Core.DidLeave {
	/** The event name  */
	export const name = 'did-leave'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.DidLeave.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.DidLeave.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * A guest has sent a text to Sprucebot
 */
export namespace SpruceEvents.Core.DidMessage {
	/** The event name  */
	export const name = 'did-message'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.DidMessage.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.DidMessage.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When a guest adds a new device to a location. Like adding their laptop
 */
export namespace SpruceEvents.Core.DidAddDevice {
	/** The event name  */
	export const name = 'did-add-device'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.DidAddDevice.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.DidAddDevice.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When any user updates their first or last name
 */
export namespace SpruceEvents.Core.DidUpdateUser {
	/** The event name  */
	export const name = 'did-update-user'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.DidUpdateUser.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.DidUpdateUser.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When any guest opts out of a location. By now you have already lost access to their meta data.
 */
export namespace SpruceEvents.Core.DidOptOut {
	/** The event name  */
	export const name = 'did-opt-out'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.DidOptOut.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.DidOptOut.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * They had, at one time, opted out. But, now they have remotely opted back in
 */
export namespace SpruceEvents.Core.DidRemoteRejoin {
	/** The event name  */
	export const name = 'did-remote-rejoin'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.DidRemoteRejoin.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.DidRemoteRejoin.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Sprucebot has made the decision that now is the perfect time to send training material
 */
export namespace SpruceEvents.Core.WillSendTraining {
	/** The event name  */
	export const name = 'will-send-training'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.WillSendTraining.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.WillSendTraining.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Provide your own search results in the platform
 */
export namespace SpruceEvents.Core.BigSearch {
	/** The event name  */
	export const name = 'big-search'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.BigSearch.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.BigSearch.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Give people the power import your search results into the platform
 */
export namespace SpruceEvents.Core.ImportFromBigSearch {
	/** The event name  */
	export const name = 'import-from-big-search'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.Core.ImportFromBigSearch.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.Core.ImportFromBigSearch.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

