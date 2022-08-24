import { GoodRoute } from "../Goods/route";
import { UserRoute } from "../User/route";

export const AppRoute = [
    {
        path:"/app",
        component:"@/pages/App/App",
        routes:[   // 子路由
            {path:"/app",redirect:"/app/home"},
            {path:"/app/home",component:"@/pages/Home/Home"},
            {path:"/app/mine",component:"@/pages/Mine/Mine"},
            {path:"/app/role",component:"@/pages/Role/Role",routes:[
                {path:"/app/role/list",component:"@/pages/Role/List"},
                {path:"/app/role/action", component:"@/pages/Role/Action",}
            ]},
            {path:"/app/anno/add",component:"@/pages/Anno/AnnoAdd"},
            {path:"/app/anno/list",component:"@/pages/Anno/AnnoList"},
            ...UserRoute,
            ...GoodRoute,
            {path:"*",redirect:"/404"},
        ]
    }
]