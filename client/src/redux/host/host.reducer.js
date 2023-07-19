import {HostActionTypes} from './host.types';

const INITIAL_STATE={
    hostList:[],
    activeHost:''
 }
 
 const hostReducer=(state=INITIAL_STATE,action)=>{
    console.log(action)
     switch(action.type){
        case HostActionTypes.SET_ACTIVE_HOST:
            return{
                ...state,
                activeHost:action.payload
            }
        case HostActionTypes.ADD_HOST:
            var hostList=hostList.push(action.payload)
            return{
                ...state,
                hostList
            }
        case HostActionTypes.SET_HOST_LIST:
            // var l=action.payload
            return{
                ...state,
                hostList:action.payload
            }
        case HostActionTypes.DELETE_HOST:
            console.log("State:", state);
            var hostList = state.hostList.filter((host) => {
                return host.hostname !== action.payload
            })
            return {
                ...state,
                hostList
            }

        default:
            return state;
        
     }

 }
 
 export default hostReducer;