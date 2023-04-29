//配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter)
import routes from './routes'
//引入store
import store from "@/store";
//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}
//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    scrollBehavior() {
        // 始终滚动到顶部
        return { y: 0 }
    },
})
//全局守卫 前置守卫
router.beforeEach(async (to, from, next) => {
    //to  可以获取到你想要跳转的路由信息
    //from  可以获取到你从那个路由来的信息
    //next  放行函数  next()/next(path)=>放行到指定路由
    // next()
    //如果用户登录了，才会有token，如果没有登录一定不会有token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    //用户已登录
    if (token) {
        if (to.path == '/login') {
            next('/home')
            console.log(111);
        } else if (name) {
            next()
        } else {
            try {
                //获取用用户信息成功
                await store.dispatch('getUserInfo')
                next()
            } catch (error) {
                //token失效了获取不到用户信息
                //清除token
                await store.dispatch('userLogout')
            }
        }
    } else {
        //
        next()
    }
})
export default router