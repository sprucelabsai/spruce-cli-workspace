import authenticateEventContract, { AuthenticateEventContract } from '#spruce/events/spruce/authenticate.contract.ts'
import canListenEventContract, { CanListenEventContract } from '#spruce/events/spruce/canListen.contract.ts'
import confirmPinEventContract, { ConfirmPinEventContract } from '#spruce/events/spruce/confirmPin.contract.ts'
import createLocationEventContract, { CreateLocationEventContract } from '#spruce/events/spruce/createLocation.contract.ts'
import createOrganizationEventContract, { CreateOrganizationEventContract } from '#spruce/events/spruce/createOrganization.contract.ts'
import createRoleEventContract, { CreateRoleEventContract } from '#spruce/events/spruce/createRole.contract.ts'
import deleteLocationEventContract, { DeleteLocationEventContract } from '#spruce/events/spruce/deleteLocation.contract.ts'
import deleteOrganizationEventContract, { DeleteOrganizationEventContract } from '#spruce/events/spruce/deleteOrganization.contract.ts'
import deleteRoleEventContract, { DeleteRoleEventContract } from '#spruce/events/spruce/deleteRole.contract.ts'
import getEventContractsEventContract, { GetEventContractsEventContract } from '#spruce/events/spruce/getEventContracts.contract.ts'
import getLocationEventContract, { GetLocationEventContract } from '#spruce/events/spruce/getLocation.contract.ts'
import getOrganizationEventContract, { GetOrganizationEventContract } from '#spruce/events/spruce/getOrganization.contract.ts'
import getRoleEventContract, { GetRoleEventContract } from '#spruce/events/spruce/getRole.contract.ts'
import healthEventContract, { HealthEventContract } from '#spruce/events/spruce/health.contract.ts'
import installSkillEventContract, { InstallSkillEventContract } from '#spruce/events/spruce/installSkill.contract.ts'
import listLocationsEventContract, { ListLocationsEventContract } from '#spruce/events/spruce/listLocations.contract.ts'
import listOrganizationsEventContract, { ListOrganizationsEventContract } from '#spruce/events/spruce/listOrganizations.contract.ts'
import listRolesEventContract, { ListRolesEventContract } from '#spruce/events/spruce/listRoles.contract.ts'
import registerEventsEventContract, { RegisterEventsEventContract } from '#spruce/events/spruce/registerEvents.contract.ts'
import registerListenersEventContract, { RegisterListenersEventContract } from '#spruce/events/spruce/registerListeners.contract.ts'
import registerSkillEventContract, { RegisterSkillEventContract } from '#spruce/events/spruce/registerSkill.contract.ts'
import requestPinEventContract, { RequestPinEventContract } from '#spruce/events/spruce/requestPin.contract.ts'
import scrambleAccountEventContract, { ScrambleAccountEventContract } from '#spruce/events/spruce/scrambleAccount.contract.ts'
import unRegisterEventsEventContract, { UnRegisterEventsEventContract } from '#spruce/events/spruce/unRegisterEvents.contract.ts'
import unRegisterListenersEventContract, { UnRegisterListenersEventContract } from '#spruce/events/spruce/unRegisterListeners.contract.ts'
import uninstallSkillEventContract, { UninstallSkillEventContract } from '#spruce/events/spruce/uninstallSkill.contract.ts'
import updateLocationEventContract, { UpdateLocationEventContract } from '#spruce/events/spruce/updateLocation.contract.ts'
import updateOrganizationEventContract, { UpdateOrganizationEventContract } from '#spruce/events/spruce/updateOrganization.contract.ts'
import updateRoleEventContract, { UpdateRoleEventContract } from '#spruce/events/spruce/updateRole.contract.ts'
import whoAmIEventContract, { WhoAmIEventContract } from '#spruce/events/spruce/whoAmI.contract.ts'

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