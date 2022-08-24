import {observable,action,computed,autorun,makeObservable} from 'mobx'
import { makePersistable } from 'mobx-persist-store';
import {Ajax} from '@/api'
 
class MyInfo {
    // 解决数据变化时，视图不变化的问题
    constructor(){
        makeObservable(this)
        makePersistable(this,{name:'UserInfo',properties:['userInfo','roleList'],storage:window.sessionStorage})  
    }

    @observable userInfo :any =  null;

    @observable roleList:any = [];


    @action  getUserInfoAsync = async  (payload:any)=>{
        let res:any = await Ajax.getuserinfo(payload)
        if(res.code==200){
            this.userInfo = res.result;
        }
    }

    @action  getRoleListAsync = async  (payload:any)=>{
        let res:any = await Ajax.getrolelist(payload)
        if(res.code==200){
            this.roleList = res.result;
        }
        this.getUserInfoAsync({})
        
    }

    @action  changeUserInfo =   (payload:any)=>{
        this.userInfo = payload
    }
}

export default new MyInfo()