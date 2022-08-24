import {observable,action,computed,autorun,makeObservable} from 'mobx'
import { makePersistable } from 'mobx-persist-store';

class MyData {
    // 解决数据变化时，视图不变化的问题
    constructor(){
        makeObservable(this),
        makePersistable(this,{name:'UserData',properties:['collapsed'],storage:window.sessionStorage})
    }
    @observable num = 2000
    @observable collapsed=false

    @action changeNum = (payload:number) => {
        this.num += payload
    }
    @action setCollapsed=(payload:boolean)=>{
        this.collapsed = !this.collapsed
    }
}

export default new MyData()