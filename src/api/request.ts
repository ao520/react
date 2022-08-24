import {history} from 'umi'
import axios from 'axios'
import {showError,ShowLoading,showSuccess} from '../utils/message'

export const baseURL = '//120.48.35.240:7001'
// export const baseURL = 'http://localhost:3001'
// axios 的配置  request=axios 
export const request = axios.create({
    timeout:60000,  // 超时 
    baseURL,  // 项目的基本路径 
    headers:{}
})

// Interceptors 拦截器   全局统一 
// 请求的拦截器   (请求发送之前做的事情)
request.interceptors.request.use(function (config:any) {
    // 自动登录
    if(config.headers.token){
    }else{
        const token = sessionStorage.getItem("token") || ''  // 获取token 
        config.headers.token = token;  // 把token 返回给服务器端  请求头 headers 
    }
    ShowLoading()
    return config;
}, function (error) {
// 请求失败做的事情 
showError('网络异常')
return Promise.reject(error);
});

// 响应的拦截器 
request.interceptors.response.use(function (response) {
    // 响应成功的拦截器 
    // ShowSuccess() 手机端APP不需要成功的提示 
    if(response.data.code==200){
        showSuccess(response.data.msg)
    }else{
        showError(response.data.msg)
        if(response.data.code==3100){
            // token 异常 需要重新登录 
            history.push('/login')
        }
    }
    return response;
  }, function (error) {
    // 响应失败 
    showError('服务器异常')
    return Promise.reject(error);
  });


// axios 增删改查
// get post delete patch 

export function get(url?:any,params?:any,headers?:any){
    return new Promise((resolve,reject)=>{
        return request({
            url,
            method:"GET",
            params,
            headers,
        }).then(res=>{
            resolve(res.data)  // 不需要再 点data 
        }).catch(err=>{
            reject(err)
        })
    })
}

export function post(url?:any,data?:any,params?:any,headers?:any){
    return new Promise((resolve,reject)=>{
        return request({
            url,
            method:"POST",
            data,
            params,
            headers,
        }).then(res=>{
            resolve(res.data )
        }).catch(err=>{
            reject(err)
        })
    })
}
