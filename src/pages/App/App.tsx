
import React,{useEffect} from 'react'
import { Layout , Breadcrumb } from 'antd';
import Foot from './Foot';
import Head from './Head';
import { inject, observer } from 'mobx-react';
import SideMenu from './Menu';
const { Header, Footer, Sider, Content } = Layout;  

const App = (props:any) => {
    return (
        <div style={{width:'100%',height:'100%'}}>
            <Layout style={{width:'100%',height:'100%'}}>
                <SideMenu></SideMenu>
                <Layout style={{width:'100%',height:'100%'}}>
                    <Head/>
                    
                    <Content style={{width:'100%',height:'100%',padding:20,overflow:"auto"}}>
                        {/* 面包屑 */}
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb> */}
                        {props.children}
                    </Content>
                   
                    <Foot/>
                </Layout>
            </Layout>
        </div>
    )
}

export default inject('MyInfo')(observer(App))