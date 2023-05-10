import {createSelector} from 'reselect';

const host=state=>state.host;
// console.log(general);
export const getActiveHost=createSelector(
    [host],
    host=>host.activeHost 
)

export const getHostList=createSelector(
    [host],
    host=>host.hostList
)