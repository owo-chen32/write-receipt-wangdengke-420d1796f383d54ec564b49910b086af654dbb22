// import {ref} from 'vue'
import AxiosDetail from './AxiosDetail.vue'
import { createApp } from 'vue'
// 传参错了  但是现在就需要个空的  如果需要Detail的改变传值方式再调
function confirm(msg = '未传入字段,接口错误', scanCode = 0) {
  return new Promise((resolve, reject) => {
    // 实例化组件，createApp第二个参数是props
    const confirmInstance = createApp(AxiosDetail, {
      // err:err|| {code:1,data:{scanCode:0,msg:'网络连接错误请刷新重试'}},
      msg: msg,
      scanCode: scanCode,
      onConfirm: () => {
        unmount()
        resolve()
      },
      onCancel: () => {
        unmount()
        reject(new Error())
      }
    })
    // 卸载组件
    const unmount = () => {
      confirmInstance.unmount()
      document.body.removeChild(parentNode)
    }
    // 创建一个挂载容器
    const parentNode = document.createElement('div')
    document.body.appendChild(parentNode)
    // 挂载组件
    confirmInstance.mount(parentNode)
  })
}

export default confirm
