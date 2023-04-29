//当前模块对API同一管理
import requests from "./request";
import mockRequests from './mockAjax'
//三级联动的接口
//GET请求， 地址:/api/product/getBaseCategoryList 无参数
//暴露
export const reqCategoryList = () => {
    //发请求
    return requests({
        method: 'GET',
        url: '/product/getBaseCategoryList',
    })
}
//获取banner（Home首页轮播图）
export const reqGetBannerList = () => {
    return mockRequests({
        method: 'GET',
        url: '/banner',
    })
}
//获取Floor数据
export const reqGetFloorList = () => {
    return mockRequests({
        method: 'GET',
        url: '/floor',
    })
}
//#region 
//获取搜索模块数据，地址：/api/list  请求方式：post
/*{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
// export const reqGetSearchInfo = (params)=>{
//     //发请求
//     return requests({
//         method:'POST',
//         url:'/list',
//         data(){
//             params
//         }
//     })

// }
//当前这个函数需不需要接受外部传递参数
//当前这个接口，（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
//#endregion
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })
//获取产品信息的接口，URL：/api/item/{ skuId }  请求方式：GET
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
//将产品添加到购物车当中（获取/更新某一个产品的个数）
//接口信息：/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
//获取购物车列表数据的接口
//接口信息：/api/cart/cartList  
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' });
//删除购物车产品的接口
//接口信息 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
//修改商品选中状态
//接口信息：/api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdataCheckedById = (skuID, isChecked) => requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'get' })
//获取验证码
//接口信息：/api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
//注册接口
//接口信息:/api/user/passport/register
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })
//登录接口
//接口信息 /api/user/passport/login
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })
//请求用户信息（需要带着token向服务器要用户信息）
//接口地址:/api/user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({ url: `/user/passport/auth/getUserInfo`, method: 'get' });
//退出登录
//接口信息：/api/user/passport/logout
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })
//用户地址信息
//接口信息:api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => requests({ url: `/user/userAddress/auth/findUserAddressList`, method: 'get' });
//获取商品清单
//接口信息:/api/order/auth/trade
export const reqOrderInfo = () => requests({ url: `/order/auth/trade`, method: 'get' });
//提交订单的接口
//接口信息:/api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data) => requests({ url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method: 'post' });
//支付接口
//接口信息:/api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});