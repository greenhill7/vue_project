//登录与注册模块
import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo || {}
    },
    //清除本地数据
    CLEAR(state) {
        //把仓库中用户信息清空
        state.token=''
        state.userInfo={}
        //本地存储数据清空
        removeToken()
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录{token}
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        //服务器下发token，用户唯一标识
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            //持久化
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    //退出登录
   async userLogout({commit}) {
        //向服务器发送一次请求，清楚token
        let result = await reqLogout()
        if(result.code==200){
            commit('CLEAR')
        }
    }
}
const getters = {
}
export default {
    state,
    mutations,
    actions,
    getters
}