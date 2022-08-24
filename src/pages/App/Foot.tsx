

import React, { FC } from 'react'
import { Layout } from 'antd';
const { Footer } = Layout;  

const Foot:FC = () => {
    return (
        <Footer style={{padding:15,display:'flex',justifyContent:'center',background:"#ccc"}}>
            <p style={{margin:0}}>千锋教育集团 &copy; 版权所有 .LTI </p>
        </Footer>
    )
}

export default Foot