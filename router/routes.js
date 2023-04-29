//引入组件
import HomeIndex from '@/pages/MyHome/HomeIndex'
import LoginIndex from '@/pages/MyLogin/LoginIndex'
import RegisterIndex from '@/pages/MyRegister/RegisterIndex'
import SearchIndex from '@/pages/MySearch/SearchIndex'
import DetailIndex from '@/pages/MyDetail/DetailIndex'
import AddIndex from '@/pages/AddCartSuccess/AddIndex'
import CartIndex from '@/pages/ShopCart/CartIndex'
import TradeIndex from '@/pages/MyTrade/TradeIndex'
import PayIndex from '@/pages/MyPay/PayIndex'
import SuccessIndex from  '@/pages/PaySuccess/SuccessIndex'
import CenterIndex from '@/pages/MyCenter/CenterIndex'
//
 export default [
    {
        path:'/pay',
        component:PayIndex,
        meta:{show:true}
    },
    {
        path:'/paysuccess',
        component:SuccessIndex,
        meta:{show:true}
    },
    {
        path:'/center',
        component:CenterIndex,
        meta:{show:true}
    },
    {
        path:'/trade',
        component:TradeIndex,
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        component:AddIndex,
        name:'addcartsuccess',
        meta:{show:true}
    },
    {
        path:'/shopcart',
        component:CartIndex,
        name:'ShopCart',
        meta:{show:true}
    },
    {
        path:'/detail/:skuId?',
        component:DetailIndex,
        meta:{show:true}
    },
    {
        path:'/home',
        component:HomeIndex,
        meta:{show:true}
    },
    {
        path:'/login',
        component:LoginIndex,
        meta:{show:false}
    },
    {
        path:'/register',
        component:RegisterIndex,
        meta:{show:false}
    },
    {
        path:'/search/:keyword?',
        component:SearchIndex,
        meta:{show:true},
        name:'search'
    },
    //重定向，在项目跑起来的时候，访问/，立马让他定位到首页
    {
        path:'*',
        redirect:'/home'
    }
]