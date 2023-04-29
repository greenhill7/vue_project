//该文件用于创建Vuex中最为核心的store
import Vue from "vue";
import Vuex from "vuex"
//使用插件
Vue.use(Vuex)
//引入小仓库
import home from "./home";
import search from "./search";
import detail  from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";
//创建并暴露store
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
    
})