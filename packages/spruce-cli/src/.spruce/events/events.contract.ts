import authenticateEventContract, { AuthenticateEventContract } from '#spruce/events/mercuryApi/authenticate.contract'
import canListenEventContract, { CanListenEventContract } from '#spruce/events/mercuryApi/canListen.contract'
import confirmPinEventContract, { ConfirmPinEventContract } from '#spruce/events/mercuryApi/confirmPin.contract'
import createLocationEventContract, { CreateLocationEventContract } from '#spruce/events/mercuryApi/createLocation.contract'
import createOrganizationEventContract, { CreateOrganizationEventContract } from '#spruce/events/mercuryApi/createOrganization.contract'
import createRoleEventContract, { CreateRoleEventContract } from '#spruce/events/mercuryApi/createRole.contract'
import deleteLocationEventContract, { DeleteLocationEventContract } from '#spruce/events/mercuryApi/deleteLocation.contract'
import deleteOrganizationEventContract, { DeleteOrganizationEventContract } from '#spruce/events/mercuryApi/deleteOrganization.contract'
import deleteRoleEventContract, { DeleteRoleEventContract } from '#spruce/events/mercuryApi/deleteRole.contract'
import getEventContractsEventContract, { GetEventContractsEventContract } from '#spruce/events/mercuryApi/getEventContracts.contract'
import getLocationEventContract, { GetLocationEventContract } from '#spruce/events/mercuryApi/getLocation.contract'
import getOrganizationEventContract, { GetOrganizationEventContract } from '#spruce/events/mercuryApi/getOrganization.contract'
import getRoleEventContract, { GetRoleEventContract } from '#spruce/events/mercuryApi/getRole.contract'
import getSkillEventContract, { GetSkillEventContract } from '#spruce/events/mercuryApi/getSkill.contract'
import healthEventContract, { HealthEventContract } from '#spruce/events/mercuryApi/health.contract'
import installSkillEventContract, { InstallSkillEventContract } from '#spruce/events/mercuryApi/installSkill.contract'
import listLocationsEventContract, { ListLocationsEventContract } from '#spruce/events/mercuryApi/listLocations.contract'
import listOrganizationsEventContract, { ListOrganizationsEventContract } from '#spruce/events/mercuryApi/listOrganizations.contract'
import listRolesEventContract, { ListRolesEventContract } from '#spruce/events/mercuryApi/listRoles.contract'
import registerEventsEventContract, { RegisterEventsEventContract } from '#spruce/events/mercuryApi/registerEvents.contract'
import registerListenersEventContract, { RegisterListenersEventContract } from '#spruce/events/mercuryApi/registerListeners.contract'
import registerSkillEventContract, { RegisterSkillEventContract } from '#spruce/events/mercuryApi/registerSkill.contract'
import requestPinEventContract, { RequestPinEventContract } from '#spruce/events/mercuryApi/requestPin.contract'
import scrambleAccountEventContract, { ScrambleAccountEventContract } from '#spruce/events/mercuryApi/scrambleAccount.contract'
import unRegisterEventsEventContract, { UnRegisterEventsEventContract } from '#spruce/events/mercuryApi/unRegisterEvents.contract'
import unRegisterListenersEventContract, { UnRegisterListenersEventContract } from '#spruce/events/mercuryApi/unRegisterListeners.contract'
import uninstallSkillEventContract, { UninstallSkillEventContract } from '#spruce/events/mercuryApi/uninstallSkill.contract'
import updateLocationEventContract, { UpdateLocationEventContract } from '#spruce/events/mercuryApi/updateLocation.contract'
import updateOrganizationEventContract, { UpdateOrganizationEventContract } from '#spruce/events/mercuryApi/updateOrganization.contract'
import updateRoleEventContract, { UpdateRoleEventContract } from '#spruce/events/mercuryApi/updateRole.contract'
import whoAmIEventContract, { WhoAmIEventContract } from '#spruce/events/mercuryApi/whoAmI.contract'

export default [
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
    listLocationsEventContract,
    listOrganizationsEventContract,
    listRolesEventContract,
    registerEventsEventContract,
    registerListenersEventContract,
    registerSkillEventContract,
    requestPinEventContract,
    scrambleAccountEventContract,
    unRegisterEventsEventContract,
    unRegisterListenersEventContract,
    uninstallSkillEventContract,
    updateLocationEventContract,
    updateOrganizationEventContract,
    updateRoleEventContract,
    whoAmIEventContract,
]


export type EventContracts = AuthenticateEventContract & CanListenEventContract & ConfirmPinEventContract & CreateLocationEventContract & CreateOrganizationEventContract & CreateRoleEventContract & DeleteLocationEventContract & DeleteOrganizationEventContract & DeleteRoleEventContract & GetEventContractsEventContract & GetLocationEventContract & GetOrganizationEventContract & GetRoleEventContract & GetSkillEventContract & HealthEventContract & InstallSkillEventContract & ListLocationsEventContract & ListOrganizationsEventContract & ListRolesEventContract & RegisterEventsEventContract & RegisterListenersEventContract & RegisterSkillEventContract & RequestPinEventContract & ScrambleAccountEventContract & UnRegisterEventsEventContract & UnRegisterListenersEventContract & UninstallSkillEventContract & UpdateLocationEventContract & UpdateOrganizationEventContract & UpdateRoleEventContract & WhoAmIEventContract  