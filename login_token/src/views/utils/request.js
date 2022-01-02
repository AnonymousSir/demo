import axios from 'axios'
import router from '../../router'
const { host } = require('../../../web.config.json')
const { Message } = require('element-ui')

axios.defaults.baseURL = host

let request = axios.create({
    // 设置host地址,调用request方法的时候就可以自己写路由了 如:/login
    baseURL: host,
    // 超时时间
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        // 设置header
        config.headers.Authorization = token
        // config.headers = { 'Authorization': token }
        return config
    }, 
    (err) => {
        return Promise.reject(err)
    }
)

// 响应拦截器
request.interceptors.response.use(
    (res) => {
        // 后台通过设置ctx.body来传递状态就在这设置，http状态码还是200，不过返回的code是后端定义的参数
        // 可以在这里对后端传来的状态码统一进行处理，对应的code返回对应的message
        // switch ... case
        const code = res.data.code
        switch(code) {
            case 400:
                res.data.message = '请求错误'
                break
            case 401:
                res.data.message = '请登录'
                localStorage.removeItem('token')
                Message('请先登录再访问此页')
                if (router.app._route.path !== '/login') {
                    router.push('/login')
                }
                break
            case 403:
                res.data.message = '权限不足'
                Message('权限不足')
                break
            case 404:
                res.data.message = '请求的资源不存在'
                break
            default:
                break
            }
        return res
    },
    (err) => {
        // 若后台是通过修改http状态码来返回状态的话就在错误里设置
        return Promise.reject(err)
    }
)

// 导出request
export default request