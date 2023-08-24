import axios from "axios";
import errorCode from "@/utils/errorCode";

//设置默认请求头
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

const BaseURL = 'api'

const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  //   baseURL: process.env.VUE_APP_NODE_ENV == 'production' ? `/${BaseURL}` : `192.168.1.162:83/${BaseURL}`, // 请求地址的基准路径
  // baseURL: `http://192.168.1.162:83/${BaseURL}`, // 请求地址的基准路径
  baseURL: import.meta.env.VITE_APP_DEV_URL + `${BaseURL}`, // 请求地址的基准路径
  // 超时
  timeout: 6000, //请求超时时间（5秒后还未接收到数据，就需要再次发送请求）
  retry: 1, //设置全局重试请求次数（最多重试几次请求）
  retryDelay: 100, //设置全局请求间隔

});

// 响应拦截器
service.interceptors.response.use(
  response => {
    let resConfig = response.config

    // 如果响应中没有状态码，则默认为200
    const code = response.data.code || 200;
    // 获取错误信息 
    const msg = errorCode[code] || response.data.msg || errorCode["default"];

    // 当返回不对劲错误信息  直接发送错误提示
    if (response.status == 200 && response.data?.data?.scanCode == -1) {
      return Promise.reject("error");
    }

    if (response.status === 500) {
      return Promise.reject(new Error(msg));
    } else if (response.status !== 200) {
      return Promise.reject("error");
    }
    else if (response.status == 200 && response.data?.code == -1) {
      if (!resConfig || !resConfig.retry) return response.data
      // __retryCount用来记录当前是第几次发送请求
      resConfig.__retryCount = resConfig.__retryCount || 0;

      // 如果当前发送的请求大于等于设置好的请求次数时，不再发送请求，返回最终的错误信息
      if (resConfig.__retryCount >= resConfig.retry) {
        return response.data;
      }

      // 记录请求次数+1
      resConfig.__retryCount += 1;

      // 设置请求间隔 在发送下一次请求之前停留一段时间，时间为上方设置好的请求间隔时间
      var backone = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, resConfig.retryDelay || 1);
      });

      // 再次发送请求
      return backone.then(function () {
        return service(resConfig);
      });

    }

    else {
      return response.data;
    }
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
