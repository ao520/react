import { AppRoute } from "../pages/App/rotue";
import { ErrorRoute } from "../pages/ErrorPage/route";
import { LoginRoute } from "../pages/Logins/route";

export const routes:any  = [
    {
        path:"/",
        component:"@/pages/index",
        routes:[  // 子路由   路由出口  
            {
                path:"/",
                redirect:"/login"
            },
            {
                path:"/demo",
                component:"@/pages/Demo/Demo"
            },
            {
                path:"/guide",
                component:"@/pages/Guide/Guide"
            },
            ...ErrorRoute,
            ...LoginRoute,
            ...AppRoute,
            {
                path:"*",
                redirect:"/404"
            }
        ]
    },
    {
        path:"*",
        redirect:"/404"
    }
]