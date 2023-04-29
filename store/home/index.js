import { reqCategoryList, reqGetFloorList, reqGetBannerList } from '@/api/index'
//state:仓库储存数据的地方
const state = {
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //FLOOR数据
    floorList:[]
}
//mutations:修改state的唯一方法
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        // console.log('修改仓库中的数据');
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        // console.log('修改仓库中的数据');
        state.floorList = floorList
    },
}
//actions:处理actions，可以书写自己的逻辑，也可以处理异步
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            commit('CATEGORYLIST', result.data.slice(0, 16))
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        // console.log('获取服务器数据');
        let result = await reqGetBannerList()
        if (result.code == 200); {
            commit('GETBANNERLIST', result.data)
        }
    },
    //获取首页Floor的数据
    async getFloorList({ commit }) {
        // console.log('获取服务器数据');
        let result = await reqGetFloorList()
        if (result.code == 200); {
            commit('GETFLOORLIST', result.data)
        }
    },

}
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库中的数据更加方便
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
}