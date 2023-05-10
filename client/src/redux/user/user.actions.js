import {UserActionTypes} from './user.types';

export const setToken=token=>({
    type:UserActionTypes.SET_TOKEN,
    payload:token
})

export const setId=id=>({
    type:UserActionTypes.SET_ID,
    payload:id
})