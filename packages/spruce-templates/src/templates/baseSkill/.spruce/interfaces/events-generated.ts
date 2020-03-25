/* eslint-disable */
// DO NOT EDIT. THIS FILE IS GENERATED FROM https://local-api.spruce.ai//api/2.0/types/events
import { IHWCalendarEvent, IHWCalendarEventDetailsItem, IHWAction, ISpruceSettingsSection } from '@sprucelabs/spruce-types'
import { DocumentNode } from 'graphql'


/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Get skills where the user is a developer
 */
export namespace SpruceEvents.core.GetDeveloperSkills {
	/** The event name  */
	export const name = 'get-developer-skills'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.GetDeveloperSkills.eventName', payload))
	*/
	export interface IPayload {

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.GetDeveloperSkills.IResponseBody = { ... }
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
export namespace SpruceEvents.core.RegisterSkill {
	/** The event name  */
	export const name = 'register-skill'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.RegisterSkill.eventName', payload))
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
	 * ctx.body: SpruceEvents.core.RegisterSkill.IResponseBody = { ... }
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
export namespace SpruceEvents.core.UnregisterSkill {
	/** The event name  */
	export const name = 'unregister-skill'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.UnregisterSkill.eventName', payload))
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
	 * ctx.body: SpruceEvents.core.UnregisterSkill.IResponseBody = { ... }
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
export namespace SpruceEvents.core.AddDeveloper {
	/** The event name  */
	export const name = 'add-developer'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.AddDeveloper.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.AddDeveloper.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * ** Missing event description **
 */
export namespace SpruceEvents.core.RemoveDeveloper {
	/** The event name  */
	export const name = 'remove-developer'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.RemoveDeveloper.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.RemoveDeveloper.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Make a gql request to the api
 */
export namespace SpruceEvents.core.Gql {
	/** The event name  */
	export const name = 'gql'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.Gql.eventName', payload))
	*/
	export interface IPayload {
		/**
		 * The gql query
		 */
		query: string | DocumentNode
		/**
		 * GQL variables
		 */
		variables: Record<string, any>

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.Gql.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * 🌲🤖 Core: Login with a phone number and pin
 */
export namespace SpruceEvents.core.Login {
	/** The event name  */
	export const name = 'login'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.Login.eventName', payload))
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
	 * ctx.body: SpruceEvents.core.Login.IResponseBody = { ... }
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
export namespace SpruceEvents.core.RequestLogin {
	/** The event name  */
	export const name = 'request-login'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.RequestLogin.eventName', payload))
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
	 * ctx.body: SpruceEvents.core.RequestLogin.IResponseBody = { ... }
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
export namespace SpruceEvents.core.GetApiConfig {
	/** The event name  */
	export const name = 'get-api-config'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.GetApiConfig.eventName', payload))
	*/
	export interface IPayload {

	}

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.GetApiConfig.IResponseBody = { ... }
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
export namespace SpruceEvents.core.GetUiEnhancements {
	/** The event name  */
	export const name = 'get-ui-enhancements'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.GetUiEnhancements.eventName', payload))
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
	 * ctx.body: SpruceEvents.core.GetUiEnhancements.IResponseBody = { ... }
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
			eventDetailsItems?: IHWCalendarEventDetailsItem[] | null
			/**
			 * Actions that should be added to the context menu of this section
			 */
			actions?: IHWAction[] | null
		}[]
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Emit this event when a new calendar event was created
 */
export namespace SpruceEvents.core.DidCreateCalendarEvent {
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
		calendarEvent: IHWCalendarEvent

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
export namespace SpruceEvents.core.GetSettings {
	/** The event name  */
	export const name = 'get-settings'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.GetSettings.eventName', payload))
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
	 * ctx.body: SpruceEvents.core.GetSettings.IResponseBody = { ... }
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
			sections?: ISpruceSettingsSection[]
		}[]
	}


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * This is an opportunity to enrich user data. Set the user name, profile image, create a note, etc.
 */
export namespace SpruceEvents.core.EnrichUser {
	/** The event name  */
	export const name = 'enrich-user'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.EnrichUser.eventName', payload))
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
	 * ctx.body: SpruceEvents.core.EnrichUser.IResponseBody = { ... }
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
export namespace SpruceEvents.core.ValidateSettings {
	/** The event name  */
	export const name = 'validate-settings'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.ValidateSettings.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.ValidateSettings.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Core asks for views to display on a page
 */
export namespace SpruceEvents.core.GetViews {
	/** The event name  */
	export const name = 'get-views'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.GetViews.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.GetViews.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Core asks this skill to provide cards
 */
export namespace SpruceEvents.core.GetCards {
	/** The event name  */
	export const name = 'get-cards'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.GetCards.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.GetCards.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When the skill is installed to a location
 */
export namespace SpruceEvents.core.WasInstalled {
	/** The event name  */
	export const name = 'was-installed'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.WasInstalled.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.WasInstalled.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When a guest joins wifi at a location for the first time
 */
export namespace SpruceEvents.core.DidSignup {
	/** The event name  */
	export const name = 'did-signup'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidSignup.eventName', payload))
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
	 * ctx.body: SpruceEvents.core.DidSignup.IResponseBody = { ... }
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
export namespace SpruceEvents.core.WillSignup {
	/** The event name  */
	export const name = 'will-signup'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.WillSignup.eventName', payload))
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
	 * ctx.body: SpruceEvents.core.WillSignup.IResponseBody = { ... }
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
export namespace SpruceEvents.core.DidEnter {
	/** The event name  */
	export const name = 'did-enter'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidEnter.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidEnter.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Triggered an hour after a guest leaves
 */
export namespace SpruceEvents.core.DidLeave {
	/** The event name  */
	export const name = 'did-leave'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidLeave.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidLeave.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * A guest has sent a text to Sprucebot
 */
export namespace SpruceEvents.core.DidMessage {
	/** The event name  */
	export const name = 'did-message'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidMessage.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidMessage.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When a guest adds a new device to a location. Like adding their laptop
 */
export namespace SpruceEvents.core.DidAddDevice {
	/** The event name  */
	export const name = 'did-add-device'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidAddDevice.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidAddDevice.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When any user updates their first or last name
 */
export namespace SpruceEvents.core.DidUpdateUser {
	/** The event name  */
	export const name = 'did-update-user'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidUpdateUser.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidUpdateUser.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * When any guest opts out of a location. By now you have already lost access to their meta data.
 */
export namespace SpruceEvents.core.DidOptOut {
	/** The event name  */
	export const name = 'did-opt-out'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidOptOut.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidOptOut.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * They had, at one time, opted out. But, now they have remotely opted back in
 */
export namespace SpruceEvents.core.DidRemoteRejoin {
	/** The event name  */
	export const name = 'did-remote-rejoin'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.DidRemoteRejoin.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.DidRemoteRejoin.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Sprucebot has made the decision that now is the perfect time to send training material
 */
export namespace SpruceEvents.core.WillSendTraining {
	/** The event name  */
	export const name = 'will-send-training'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.WillSendTraining.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.WillSendTraining.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Provide your own search results in the platform
 */
export namespace SpruceEvents.core.BigSearch {
	/** The event name  */
	export const name = 'big-search'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.BigSearch.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.BigSearch.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

/**
 * The Spruce Core API. Visit https://developer.spruce.ai for more information.
 *
 * Give people the power import your search results into the platform
 */
export namespace SpruceEvents.core.ImportFromBigSearch {
	/** The event name  */
	export const name = 'import-from-big-search'

	/**
	 * Event Payload
	 *
	 * The Spruce Core API listens for this event. You'll emit an event with this payload (ctx.sb.emit('SpruceEvents.core.ImportFromBigSearch.eventName', payload))
	*/
	export type IPayload = any

	/**
	 * Event Response
	 *
	 * The Spruce Core API Skill expects your skill to respond with this data in your event handler:
	 * ctx.body: SpruceEvents.core.ImportFromBigSearch.IResponseBody = { ... }
	 */
	export type IResponseBody = any


}

