import { v4 as uuidv4 } from 'uuid';
//要生成一个随机的字符串，且每次执行不会发生变化，游客信息持久储存
export const getUUID = () => {
    //先看看本地存储是否有uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}