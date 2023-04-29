//存储tokrn
export const setToken = (token) => {
    localStorage.setItem('TOKEN',token)
}
//获取token
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}
//清空本地存储的token
export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}