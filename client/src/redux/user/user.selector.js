import {createSelector} from 'reselect';

const user=state=>state.user;
// console.log(general);
export const getToken=createSelector(
    [user],
    user=>user.token  
)

export const getId=createSelector(
    [user],
    user=>user.id 
)