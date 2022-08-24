
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    SmileOutlined
  } from '@ant-design/icons';

export const routerList = [
    {
        path:"/app/home",
        component:"@/pages/Home/Home",
        text:"首页",
        icon:<AppstoreOutlined/>,
        role:1,
    },
    {
        path:"/app/role",
        component:"@/pages/Role/Role",
        text:"权限",
        icon:<ContainerOutlined/>,
        role:6,
        routes:[
            {
                path:"/app/role/list",
                component:"@/pages/Role/List",
                text:"权限列表",
                icon:<ContainerOutlined/>,
                role:6,
            },
            {
                path:"/app/role/action",
                component:"@/pages/Role/Action",
                text:"权限新增",
                icon:<ContainerOutlined/>,
                role:6,
            }
        ]
    },
    {
        path:"/app/user",
        component:"@/pages/User/user",
        text:"用户",
        icon:<PieChartOutlined/>,
        role:3,
        routes:[
            {
                path:"/app/user/add",
                component:"@/pages/User/UserAdd",
                text:"添加用户",
                icon:<PieChartOutlined/>,
                role:3,
            },
            {
                path:"/app/user/list",
                component:"@/pages/User/UserList",
                text:"用户列表",
                icon:<PieChartOutlined/>,
                role:3,
            },
            {
                path:"/app/user/data",
                component:"@/pages/User/UserData",
                text:"用户分析",
                icon:<PieChartOutlined/>,
                role:3,
            }
        ]
    },
    {
        path:"/app/good",
        component:"@/pages/Goods/user",
        text:"商品",
        icon:<SmileOutlined/>,
        role:3,
        routes:[
            {
                path:"/app/good/add",
                component:"@/pages/Goods/GoodAdd",
                text:"添加商品",
                icon:<SmileOutlined/>,
                role:3,
            },
            {
                path:"/app/good/index",
                component:"@/pages/Goods/GoodIndex",
                text:"商品列表",
                icon:<SmileOutlined/>,
                role:3,
            }
        ]
    },
    {
        path:"/app/anno",
        component:"@/pages/anno/anno",
        text:"公告",
        icon:<MenuFoldOutlined/>,
        role:1,
        routes:[
            {
                path:"/app/anno/add",
                component:"@/pages/Anno/AnnoAdd",
                text:"公告新增",
                icon:<MenuFoldOutlined/>,
                role:2,
            },
            {
                path:"/app/anno/list",
                component:"@/pages/Anno/AnnoList",
                text:"公告列表",
                icon:<MenuFoldOutlined/>,
                role:1,
                // routes:[
                //     {
                //         path:"/app/anno/two",
                //         component:"@/pages/Anno/AnnoAdd",
                //         text:"今日公告",
                //         icon:<MenuFoldOutlined/>,
                //         role:2,
                //     },
                //     {
                //         path:"/app/anno/noe",
                //         component:"@/pages/Anno/AnnoAdd",
                //         text:"往日公告",
                //         icon:<MenuFoldOutlined/>,
                //         role:2,
                //     },
                // ]
            }
        ]
    },
    
    {
        path:"/app/mine",
        component:"@/pages/Mine/Mine",
        text:"个人中心",
        icon:<DesktopOutlined/>,
        role:1,
    },
]