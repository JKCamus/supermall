import axios from 'axios'
export function request(config) {
  // 1创建实例
  const instance = axios.create({
//接入接口
    timeout: 5000
  })
  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    return config
  }, err => {
    // console.log(err);
  })
  // 2.2响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })
//   3.发送真正的请求
  return instance(config)
}
