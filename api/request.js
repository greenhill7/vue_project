//对axios进行二次封装
import axios from "axios";
//引入进度条
import nProgress from 'nprogress';
import store from "@/store";
//start：进度条开始， done：进度条结束
//引入进度条样式
import 'nprogress/nprogress.css'
//1,利用axios对象中的create方法，创建一个axios实例
//2,reuqests就是稍微配置过的axios
const requests = axios.create({
    //配置对象
    baseURL: '/api', //基础路径，发送请求时。路径中会出现api
    //代表请求超时的事件
    timeout: 5000 //5秒
})
//请求拦截器 在请求发出去之前 请求拦截器可以检测到，也可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config：一个配置对象，对象里面有一个 headers请求头 属性很重要
    //进度条开始
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //携带token给服务器
    if(store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    nProgress.start();
    return config;
})
//响应拦截器
requests.interceptors.response.use((resolve) => {
    //成功的回调函数：服务器相应的数据回来以后，相应拦截器可以检测到，做一些事情
    //进度条开始
    nProgress.done();
    return resolve.data;
}, (error) => {
    //相应失败的回调函数 
    // return Promise.reject(new Error('error')) //停止promise的运行链
    return error.message
})
//暴露requests
export default requests