import { reqCartList, reqDeleteCartById, reqUpdataCheckedById } from "@/api"
import { getUUID } from '@/utils/uuid_token/uuidIndex';
import { Promise } from "core-js";
const state = {
    uuid_token: getUUID(),
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表信息
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车某一个产品的选中状态
    async updataCheckedById({ commit, state, dispatch }, { skuId, isChecked }) {
        let result = await reqUpdataCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject();
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        //获取购物车中的全部产品数据（数组）
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            //将每一次返回的Promise添加到数据中
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    },
    //修改全部产品状态
    updataAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updataCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}