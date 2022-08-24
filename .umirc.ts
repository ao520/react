import { routes } from './src/router/router';
import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    metas:[
        {
            httpEquiv:'Content-Security-Policy',
            content:'upgrade-insecure-requests'
        }
    ],    
    // 标题
    title: '后台管理系统',
    // 图标
    links: [{ rel: 'icon', href: '/img/favicon.ico' }],
    // 路由
    routes: routes,
    // 代码修改，页面更新
    fastRefresh: {},
    // 别名
    alias: {
        '@': '/src'
    },
    // 端口配置
    devServer: {
        host: '0.0.0.0',
        port: 8989,
    },
    // 代理
    proxy: {},
    //自动打开浏览器
    chainWebpack(memo, { env, webpack, createCSSRule }) {
        env === 'development'? 
        memo.plugin('open-browser-webpack-plugin').use('open-browser-webpack-plugin', [{ url: 'http://localhost:8989' }])
        : ''; // 此处url与项目启动的url保持一致
    },
});

