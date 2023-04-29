import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from '@/utils/uuid_token/uuidIndex'
const state = {
    goodsInfo: {},
    //临时游客身份
    uuid_token: getUUID()
}
const mutations = {
    GETDOOGSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const actions = {
    //获取产品信息
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETDOOGSINFO', result.data)
        }
    },
    //将产品信息添加到购物车当中
    async addOrUpdateShopCart({commit},{ skuId, skuNum }) {
        //购物车的解构
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code==200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    categoryView(state) {
        //比如state.goodsInfo初始状态为空对象，空对象的categoryView为undefined
        //当前计算出的categoryView属性值至少是一个空对象，假的报错就不会有了
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}