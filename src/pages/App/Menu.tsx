import React, { FC } from 'react'
import { Layout,Menu,MenuProps } from 'antd';
import { observer } from 'mobx-react';
import { useStore } from '@/mobx/context';
import Logo from '@/assets/qidian.jpg'
import {routerList} from '@/utils/routerList'
import {history,useLocation} from 'umi'

type MenuItem = Required<MenuProps>['items'][number];
const { Sider } = Layout;

const SideMenu: FC<any> = () => {
    const { MyData:{collapsed},MyInfo:{userInfo} } = useStore();
    const location = useLocation();
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }
    // 获取导航
    const getMenuItem=(list:any,result?:MenuItem[])=>{
        result=result?result:[];
        if(userInfo){
            list.forEach((item:any)=>{
                if(item.routes){
                    if(userInfo.role>=item.role){
                        var arr:any=getMenuItem(item.routes)
                        result?.push(getItem(item.text,item.path,item.icon,arr,))
                    }
                }else{
                    if(userInfo.role>=item.role){
                        result?.push(getItem(item.text,item.path,item.icon))
                    }
                }
            })
        }else{
            return result
        }
        return result
    }
    return (
        <Sider
            style={{ width: '100%', overflow: "auto", height: '100%' }}
            collapsed={collapsed}
        >
            <div className="logo-box" style={{ padding: 15, margin: "15px 0 " }}>
                <img src={Logo} style={collapsed ? { height: 50, width: 50, borderRadius: '50%' } : { width: '100%', height: 160, borderRadius: '50%' }} alt="" className="logo" />
            </div>
            <Menu
                //根据地址显示高亮 
                defaultSelectedKeys={[location.pathname]}
                // 打开子菜单
                defaultOpenKeys={[location.pathname.split("/").slice(0,3).join("/")]}
                selectedKeys={[location.pathname]}
                mode="inline"
                theme="dark"
                // 获取导航
                items={getMenuItem(routerList)}
                // 点击导航跳转
                onClick={(value)=>{history.push(value.key)}}
            />
        </Sider>
    )
}

export default observer(SideMenu)