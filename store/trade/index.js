import { reqAddressInfo, reqOrderInfo } from "@/api";
const state = {
    address: [],
    orderInfo: {},
    payId:''
};
const mutations = {
    GETADDRESS(state, address) {
        state.address = address;
    },
    GETSHOPINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    },
    SUBMITINFO(state,payId){
        state.payId = payId;
    }
};
const actions = {
    //获取用户信息地址
    async getUserAddress({ commit, state, dispatch }) {
        let result = await reqAddressInfo();
        console.log(result);
        if (result.code == 200) {
            commit('GETADDRESS', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //获取商品清单
    async getOrderInfo({ commit, state, dispatch }) {
        let result = await reqOrderInfo();
        console.log(result);
        if (result.code == 200) {
            commit('GETSHOPINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    //提交订单:tradeNO 交易编码   data:付款人信息
    // async submitInfo({ commit, state, dispatch }, { tradeNo, data }) {
    //     //提交订单的时候：返回一个很重要数据->订单ID【这笔交易唯一标识符:付款人、收款人】
    //     let result = await reqSubmitOrder(tradeNo, data);
    //     if (result.code == 200) {
    //         commit('SUBMITINFO', result.data);
    //         return 'ok';
    //     } else {
    //         return Promise.reject(new Error(result.message));
    //     }
    // }

};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}