import authenticateEventContract, { AuthenticateEventContract } from '#spruce/events/spruce/authenticate.contract'
import canListenEventContract, { CanListenEventContract } from '#spruce/events/spruce/canListen.contract'
import confirmPinEventContract, { ConfirmPinEventContract } from '#spruce/events/spruce/confirmPin.contract'
import createLocationEventContract, { CreateLocationEventContract } from '#spruce/events/spruce/createLocation.contract'
import createOrganizationEventContract, { CreateOrganizationEventContract } from '#spruce/events/spruce/createOrganization.contract'
import createRoleEventContract, { CreateRoleEventContract } from '#spruce/events/spruce/createRole.contract'
import deleteLocationEventContract, { DeleteLocationEventContract } from '#spruce/events/spruce/deleteLocation.contract'
import deleteOrganizationEventContract, { DeleteOrganizationEventContract } from '#spruce/events/spruce/deleteOrganization.contract'
import deleteRoleEventContract, { DeleteRoleEventContract } from '#spruce/events/spruce/deleteRole.contract'
import getEventContractsEventContract, { GetEventContractsEventContract } from '#spruce/events/spruce/getEventContracts.contract'
import getLocationEventContract, { GetLocationEventContract } from '#spruce/events/spruce/getLocation.contract'
import getOrganizationEventContract, { GetOrganizationEventContract } from '#spruce/events/spruce/getOrganization.contract'
import getRoleEventContract, { GetRoleEventContract } from '#spruce/events/spruce/getRole.contract'
import healthEventContract, { HealthEventContract } from '#spruce/events/spruce/health.contract'
import installSkillEventContract, { InstallSkillEventContract } from '#spruce/events/spruce/installSkill.contract'
import listLocationsEventContract, { ListLocationsEventContract } from '#spruce/events/spruce/listLocations.contract'
import listOrganizationsEventContract, { ListOrganizationsEventContract } from '#spruce/events/spruce/listOrganizations.contract'
import listRolesEventContract, { ListRolesEventContract } from '#spruce/events/spruce/listRoles.contract'
import registerEventsEventContract, { RegisterEventsEventContract } from '#spruce/events/spruce/registerEvents.contract'
import registerListenersEventContract, { RegisterListenersEventContract } from '#spruce/events/spruce/registerListeners.contract'
import registerSkillEventContract, { RegisterSkillEventContract } from '#spruce/events/spruce/registerSkill.contract'
import requestPinEventContract, { RequestPinEventContract } from '#spruce/events/spruce/requestPin.contract'
import scrambleAccountEventContract, { ScrambleAccountEventContract } from '#spruce/events/spruce/scrambleAccount.contract'
import unRegisterEventsEventContract, { UnRegisterEventsEventContract } from '#spruce/events/spruce/unRegisterEvents.contract'
import unRegisterListenersEventContract, { UnRegisterListenersEventContract } from '#spruce/events/spruce/unRegisterListeners.contract'
import uninstallSkillEventContract, { UninstallSkillEventContract } from '#spruce/events/spruce/uninstallSkill.contract'
import updateLocationEventContract, { UpdateLocationEventContract } from '#spruce/events/spruce/updateLocation.contract'
import updateOrganizationEventContract, { UpdateOrganizationEventContract } from '#spruce/events/spruce/updateOrganization.contract'
import updateRoleEventContract, { UpdateRoleEventContract } from '#spruce/events/spruce/updateRole.contract'
import whoAmIEventContract, { WhoAmIEventContract } from '#spruce/events/spruce/whoAmI.contract'

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


export type EventContracts = AuthenticateEventContract & CanListenEventContract & ConfirmPinEventContract & CreateLocationEventContract & CreateOrganizationEventContract & CreateRoleEventContract & DeleteLocationEventContract & DeleteOrganizationEventContract & DeleteRoleEventContract & GetEventContractsEventContract & GetLocationEventContract & GetOrganizationEventContract & GetRoleEventContract & HealthEventContract & InstallSkillEventContract & ListLocationsEventContract & ListOrganizationsEventContract & ListRolesEventContract & RegisterEventsEventContract & RegisterListenersEventContract & RegisterSkillEventContract & RequestPinEventContract & ScrambleAccountEventContract & UnRegisterEventsEventContract & UnRegisterListenersEventContract & UninstallSkillEventContract & UpdateLocationEventContract & UpdateOrganizationEventContract & UpdateRoleEventContract & WhoAmIEventContract  