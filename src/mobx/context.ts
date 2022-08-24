import MyData from "./MyData";
import MyInfo from "./MyInfo";

import {useContext,createContext} from 'react'

const store = createContext({
    MyData,
    MyInfo
})

// 自定义HOOKS 
export const useStore = ()=>{
    return useContext(store)
}