import { changeCount } from '@/redux/actions'
import React,{FC} from 'react'
import {connect} from 'react-redux'
import {inject,observer} from 'mobx-react'

const Guide:FC<{
    count:number,
    id:number|string,
    dispatch:any,
    MyData:any
}> = ({
    count,
    dispatch,
    MyData
}) => {
    const {num,changeNum}=MyData
    return (
        <div>
            <h2>Guide</h2>
            <h2>count={count}</h2>
            <h2 onClick={()=>changeNum(90)}>num - {num}</h2>
            <button onClick={()=>dispatch(changeCount(88))}>修改count</button>
        </div>
    )
}

export default inject('MyData')(connect((state:any)=>{
    return {
        count:state.getIn(['data','count'])
    }
})(observer(Guide)))