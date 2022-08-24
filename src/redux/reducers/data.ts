import {fromJS} from 'immutable';

const defaultState=fromJS({
    count:1000
})
export const data=(state:any=defaultState,action:any)=>{
    const {type,payload}=action;
    switch(type){
        case "changeCount":
            return state.update('count',(x:any)=>x+payload);
        default:
            return state;
    }
}