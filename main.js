import Vue from 'vue'
import App from './App.vue'
//引入路由器
import router from '@/router/index'
//引入仓库
import store from '@/store/index'
//三级联动组件
import TypeNav from '@/components/TypoNav/NavIndex.vue'
import PagIndex from '@/components/MyPagination/PagIndex.vue'
import {Button,MessageBox} from 'element-ui';
Vue.config.productionTip = false
// //测试
// import {reqCategoryList} from '@/api/index'
// reqCategoryList()
//使用组件 第一个参数：全局组件的名字，第二个参数：是哪一个组件
Vue.component(TypeNav.name, TypeNav )
Vue.component(PagIndex.name,PagIndex)
//注册全局组件
Vue.component(Button.name,Button)
//挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入mockServe.js -----mock数据
import '@/mock/mockServe.js'
//引入swiper样式
import 'swiper/css/swiper.css'
//统一接口api文件夹中全部请求函数
import * as API from '@/api'
console.log(API);
new Vue({
  render: h => h(App), 
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由：KV写法一致省略V{router小写}
  //路由信息：写router时，组件身上都拥有$router、$route属性
  router,
  //注册仓库，组件实例身上会多一个$store属性
  store
}).$mount('#app')
