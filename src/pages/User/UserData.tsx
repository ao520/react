import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import { useStore } from '@/mobx/context';
import { Ajax } from '@/api';

const UserData = () => {
  const {MyInfo:{roleList}}=useStore()
  const [data,getData]=useState<any>([])
  // 把多余的第一组数据给删除
  const rolearr=JSON.parse(JSON.stringify(roleList))
  rolearr.shift()
  const getuserlist=async ()=>{
    let arr:any=[]
    let res:any=await Ajax.getuserlist({})
    rolearr.forEach((item:any)=>{
      arr.push({
        type:item.text,
        value:res.result.filter((i:any)=>i.role==item.value).length
      })
    })
    getData(arr)
  }
  
  useEffect(()=>{
    getuserlist()
    
  },[])

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default UserData