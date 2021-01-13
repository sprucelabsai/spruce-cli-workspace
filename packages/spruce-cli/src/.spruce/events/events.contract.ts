import didMessageEventContract, { DidMessageEventContract } from '#spruce/events/mercuryApi/didMessage.v2020_12_25.contract'
import authenticateEventContract, { AuthenticateEventContract } from '#spruce/events/mercuryApi/authenticate.v2020_12_25.contract'
import canListenEventContract, { CanListenEventContract } from '#spruce/events/mercuryApi/canListen.v2020_12_25.contract'
import confirmPinEventContract, { ConfirmPinEventContract } from '#spruce/events/mercuryApi/confirmPin.v2020_12_25.contract'
import createLocationEventContract, { CreateLocationEventContract } from '#spruce/events/mercuryApi/createLocation.v2020_12_25.contract'
import createOrganizationEventContract, { CreateOrganizationEventContract } from '#spruce/events/mercuryApi/createOrganization.v2020_12_25.contract'
import createRoleEventContract, { CreateRoleEventContract } from '#spruce/events/mercuryApi/createRole.v2020_12_25.contract'
import deleteLocationEventContract, { DeleteLocationEventContract } from '#spruce/events/mercuryApi/deleteLocation.v2020_12_25.contract'
import deleteOrganizationEventContract, { DeleteOrganizationEventContract } from '#spruce/events/mercuryApi/deleteOrganization.v2020_12_25.contract'
import deleteRoleEventContract, { DeleteRoleEventContract } from '#spruce/events/mercuryApi/deleteRole.v2020_12_25.contract'
import getEventContractsEventContract, { GetEventContractsEventContract } from '#spruce/events/mercuryApi/getEventContracts.v2020_12_25.contract'
import getLocationEventContract, { GetLocationEventContract } from '#spruce/events/mercuryApi/getLocation.v2020_12_25.contract'
import getOrganizationEventContract, { GetOrganizationEventContract } from '#spruce/events/mercuryApi/getOrganization.v2020_12_25.contract'
import getRoleEventContract, { GetRoleEventContract } from '#spruce/events/mercuryApi/getRole.v2020_12_25.contract'
import getSkillEventContract, { GetSkillEventContract } from '#spruce/events/mercuryApi/getSkill.v2020_12_25.contract'
import healthEventContract, { HealthEventContract } from '#spruce/events/mercuryApi/health.v2020_12_25.contract'
import installSkillEventContract, { InstallSkillEventContract } from '#spruce/events/mercuryApi/installSkill.v2020_12_25.contract'
import isSkillInstalledEventContract, { IsSkillInstalledEventContract } from '#spruce/events/mercuryApi/isSkillInstalled.v2020_12_25.contract'
import listLocationsEventContract, { ListLocationsEventContract } from '#spruce/events/mercuryApi/listLocations.v2020_12_25.contract'
import listOrganizationsEventContract, { ListOrganizationsEventContract } from '#spruce/events/mercuryApi/listOrganizations.v2020_12_25.contract'
import listRolesEventContract, { ListRolesEventContract } from '#spruce/events/mercuryApi/listRoles.v2020_12_25.contract'
import logoutEventContract, { LogoutEventContract } from '#spruce/events/mercuryApi/logout.v2020_12_25.contract'
import registerConversationTopicsEventContract, { RegisterConversationTopicsEventContract } from '#spruce/events/mercuryApi/registerConversationTopics.v2020_12_25.contract'
import registerEventsEventContract, { RegisterEventsEventContract } from '#spruce/events/mercuryApi/registerEvents.v2020_12_25.contract'
import registerListenersEventContract, { RegisterListenersEventContract } from '#spruce/events/mercuryApi/registerListeners.v2020_12_25.contract'
import registerSkillEventContract, { RegisterSkillEventContract } from '#spruce/events/mercuryApi/registerSkill.v2020_12_25.contract'
import requestPinEventContract, { RequestPinEventContract } from '#spruce/events/mercuryApi/requestPin.v2020_12_25.contract'
import scrambleAccountEventContract, { ScrambleAccountEventContract } from '#spruce/events/mercuryApi/scrambleAccount.v2020_12_25.contract'
import uninstallSkillEventContract, { UninstallSkillEventContract } from '#spruce/events/mercuryApi/uninstallSkill.v2020_12_25.contract'
import unregisterEventsEventContract, { UnregisterEventsEventContract } from '#spruce/events/mercuryApi/unregisterEvents.v2020_12_25.contract'
import unregisterListenersEventContract, { UnregisterListenersEventContract } from '#spruce/events/mercuryApi/unregisterListeners.v2020_12_25.contract'
import updateLocationEventContract, { UpdateLocationEventContract } from '#spruce/events/mercuryApi/updateLocation.v2020_12_25.contract'
import updateOrganizationEventContract, { UpdateOrganizationEventContract } from '#spruce/events/mercuryApi/updateOrganization.v2020_12_25.contract'
import updateRoleEventContract, { UpdateRoleEventContract } from '#spruce/events/mercuryApi/updateRole.v2020_12_25.contract'
import whoamiEventContract, { WhoamiEventContract } from '#spruce/events/mercuryApi/whoami.v2020_12_25.contract'

export default [
    didMessageEventContract,
    authenticateEventContract,
    canListenEventContract,
    confirmPinEventContract,
    createLocationEventContract,
    createOrganizationEventContract,
    createRoleEventContract,
    deleteLocationEventContract,
    deleteOrganizationEventContract,
    deleteRoleEventContract,
    getEventContractsEventContract,
    getLocationEventContract,
    getOrganizationEventContract,
    getRoleEventContract,
    getSkillEventContract,
    healthEventContract,
    installSkillEventContract,
    isSkillInstalledEventContract,
    listLocationsEventContract,
    listOrganizationsEventContract,
    listRolesEventContract,
    logoutEventContract,
    registerConversationTopicsEventContract,
    registerEventsEventContract,
    registerListenersEventContract,
    registerSkillEventContract,
    requestPinEventContract,
    scrambleAccountEventContract,
    uninstallSkillEventContract,
    unregisterEventsEventContract,
    unregisterListenersEventContract,
    updateLocationEventContract,
    updateOrganizationEventContract,
    updateRoleEventContract,
    whoamiEventContract,
]


export type EventContracts = DidMessageEventContract & AuthenticateEventContract & CanListenEventContract & ConfirmPinEventContract & CreateLocationEventContract & CreateOrganizationEventContract & CreateRoleEventContract & DeleteLocationEventContract & DeleteOrganizationEventContract & DeleteRoleEventContract & GetEventContractsEventContract & GetLocationEventContract & GetOrganizationEventContract & GetRoleEventContract & GetSkillEventContract & HealthEventContract & InstallSkillEventContract & IsSkillInstalledEventContract & ListLocationsEventContract & ListOrganizationsEventContract & ListRolesEventContract & LogoutEventContract & RegisterConversationTopicsEventContract & RegisterEventsEventContract & RegisterListenersEventContract & RegisterSkillEventContract & RequestPinEventContract & ScrambleAccountEventContract & UninstallSkillEventContract & UnregisterEventsEventContract & UnregisterListenersEventContract & UpdateLocationEventContract & UpdateOrganizationEventContract & UpdateRoleEventContract & WhoamiEventContract  