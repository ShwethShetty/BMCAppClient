import {HostActionTypes} from './host.types';

export const setActiveHost=hostName=>({
    type:HostActionTypes.SET_ACTIVE_HOST,
    payload:hostName
})

export const addHost=hostname=>({
    type:HostActionTypes.ADD_HOST,
    payload:hostname
})

export const setHostList=hostList=>({
    type:HostActionTypes.SET_HOST_LIST,
    payload:hostList
})