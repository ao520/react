
import { message } from "antd";

export function ShowLoading(msg='加载中'){
    message.destroy()
    message.loading(msg)
}

export function showError (msg:any='请求失败'){
    message.destroy()
    message.error(msg)
}

export function showSuccess (msg:any='请求成功'){
    message.destroy()
    message.success(msg)
}



