import { reqGetSearchInfo } from "@/api"
//state:仓库储存数据的地方
const state = {
    //仓库初始化状态
    searchInfo:{

    }
}
//mutations:修改state的唯一方法
const mutations = {
    GETSEARCHINFO(state,searchInfo){
        state.searchInfo = searchInfo
    }
}
//actions:处理actions，可以书写自己的逻辑，也可以处理异步
const actions = {
    async getSearchInfo ({commit},params){
        let result = await reqGetSearchInfo(params)
        commit('GETSEARCHINFO',result.data)
    }
}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库中的数据更加方便
const getters = {
    goodsList(state){
        return state.searchInfo.goodsList || []
    },
    attrsList(state){
        return state.searchInfo.attrsList || []
    },
    trademarkList(state){
        return state.searchInfo.trademarkList || []
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
}