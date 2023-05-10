import {UserActionTypes} from './user.types';

const INITIAL_STATE={
    token:'',
    id:''
 }
 
 const userReducer=(state=INITIAL_STATE,action)=>{
     switch(action.type){
        case UserActionTypes.SET_TOKEN:
            return{
                ...state,
                token:action.payload
            }
        case UserActionTypes.SET_ID:
            return{
                ...state,
                id:action.payload
            }    
        default:
            return state;
        
     }

 }
 
 export default userReducer;